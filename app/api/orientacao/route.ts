import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Sugestao } from "@/models/Sugestao";
import { UserDisciplina } from "@/models/UserDisciplina";
import { Disciplina } from "@/models/Disciplina";
import { converterString, getUserIdFromToken } from "@/app/api/actions/server";
import { Orientacao } from "@/models/Orientacao";
import { Sessao } from "@/models/Sessao";
export const dynamic = "force-dynamic";

// Candidaturas ao programa de orientacao
export async function POST(req: NextRequest) {
  try {
    await initDB();

    const userId = await getUserIdFromToken(req);

    const formData = await req.formData();
    const valor = formData.get("valor");
    const formato = formData.get("formato");
    const sessoes = JSON.parse(formData.get("sessoes") as string);
    const file = formData.get("file") as File | null;

    // ============================
    // 📂 Upload comprovativo
    // ============================
    let filename = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const fs = require("fs");
      const path = require("path");

      filename = `${Date.now()}-${file.name}`;
      const uploadDir = path.join(process.cwd(), "storage/recibos");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      fs.writeFileSync(path.join(uploadDir, filename), buffer);
    }

    // ============================
    // 💾 TRANSAÇÃO
    // ============================
    const result = await sequelize.transaction(async (t) => {
      // 1. Criar candidatura (INACTIVA)
      const orientacao = await Orientacao.create(
        {
          estudante_id: userId,
          valor,
          filename,
          formato,
        },
        { transaction: t },
      );

      // 2. Criar sessões
      for (const s of sessoes) {
        await Sessao.create(
          {
            orientacao_id: orientacao.id,
            sessao: new Date(s),
          },
          { transaction: t },
        );
      }

      return orientacao;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
// buscar Estudantes candidatados
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado") || false;

    const situacao = searchParams.get("situacao");
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    if (situacao) {
      where.situacao = situacao;
    }

    await initDB();

    const { rows, count } = await Orientacao.findAndCountAll({
      raw: false,
      include: [{ model: User, as: "Estudante" }, {model:Sessao, as:"Sessoes"}],
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

//
