import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { converterString, getUserIdFromToken } from "@/app/api/actions/server";
import { User } from "@/models/User"; 
import { Ebook } from "@/models/Ebook";
import { Material } from "@/models/Material";

// Registar pagamento
export async function POST(req: NextRequest) {
  try {
    await initDB();
const userId = await getUserIdFromToken(req);
    const formData = await req.formData();
    const codigo = JSON.parse(formData.get("codigo") as string);


    const ebook = await Material.findOne({where:{codigo}})
    const file = formData.get("file") as File | null;

    if (!userId || !ebook) {
      return NextResponse.json(
        { message: "Sessão inválida ou Erro de informação" },
        { status: 401 },
      );
    }

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
    const resp = await Ebook.create({
      user_id: userId,
      codigo: ebook.codigo,
      valor: ebook.valor,
      filename: filename,
    });

    return NextResponse.json(resp, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// Rota para buscar todos os registos
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado");
    const status = searchParams.get("status");
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    // filtros seguros
    if (estadoParam !== null) {
      where.estado = estadoParam === "true";
    }

    if (status) {
      where.status = status;
    }

    await initDB();

    const { rows, count } = await Ebook.findAndCountAll({
      raw: false,
      where,
      include: [
        {
          model: User,
          as: "Usuario",
          attributes: [
            "id",
            "primeiro_nome",
            "segundo_nome",
            "email",
            "telemovel",
          ],
        },
      ],
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
    console.error("ERRO PAGAMENTOS:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
