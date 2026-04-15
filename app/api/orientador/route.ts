import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { converterString, getUserIdFromToken } from "../actions/server";
import { Sugestao } from "@/models/Sugestao";
import { UserDisciplina } from "@/models/UserDisciplina";
import { Disciplina } from "@/models/Disciplina";
export const dynamic = "force-dynamic";

// Rota para candidaturas de orientadores
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId);

    initDB();

    // ✅ RECEBER FORMDATA
    const formData = await req.formData();
    const descricao = formData.get("descricao") as string;
    const disciplinas = JSON.parse(
      formData.get("disciplinas") as string,
    ) as number[];

    const foto = formData.get("foto") as File | null;

    // ✅ VALIDAR
    if (!descricao || !disciplinas.length) {
      return NextResponse.json({ message: "Dados inválidos" }, { status: 400 });
    }

    // ✅ TRATAR IMAGEM
    let filename = null;

    if (foto) {
      const bytes = await foto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      filename = `${Date.now()}-${foto.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "public/candidatos");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
    }

    // ✅ TRANSAÇÃO
    const result = await sequelize.transaction(async (t) => {
      const user = await User.update(
        { perfil: "CANDIDATO", filename: filename },
        { where: { id: id }, transaction: t },
      );
      const contributo = await Sugestao.create(
        {
          user_id: id,
          descricao: descricao,
        },
        { transaction: t },
      );

      for (const disciplinaId of disciplinas) {
        await UserDisciplina.create(
          {
            user_id: id,
            disciplina_id: disciplinaId,
          },
          { transaction: t },
        );
      }

      return [user, contributo];
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// buscar todos os orientadores
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado") || false;
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {
      perfil: "ORIENTADOR",
    };

    await initDB();

    const { rows, count } = await User.findAndCountAll({
      raw: false,
      include: [
        {
          model: UserDisciplina,
          as: "UserDisciplina",

          include: [
            {
              model: Disciplina,
              as: "Disciplina",
            },
          ],
        },
      ],
      where,
      limit,
      offset,
      order: [[`${orderBy}`, "DESC"]],
    });

    return NextResponse.json(
      {
        data: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("ERRO BUSCAR:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
