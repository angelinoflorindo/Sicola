import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { getUserIdFromToken } from "@/app/api/actions/server";
import { Trabalho } from "@/models/Trabalho";
import { Universidade } from "@/models/Universidade";
export const dynamic = "force-dynamic";

// Upload de Materiais academicos
export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromToken(req);

    initDB();

    // ✅ RECEBER FORMDATA
    const formData = await req.formData();

    const tema = formData.get("tema") as string;
    const descricao = formData.get("descricao") as string;
    const grau = formData.get("grau") as string;
    const valor = formData.get("valor") as string;
    const area = formData.get("area") as string;
    const file = formData.get("file") as File | null;
    // ✅ TRATAR ARQUIVO
    let filename = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      filename = `${Date.now()}-${file.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "storage/recibos");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
    }

    const resp = await Trabalho.create({
      user_id: userId,
      valor,
      descricao,
      grau,
      area,
      tema,
      filename: filename,
      estado:false
    });

    return NextResponse.json({ resp }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// buscar todos os trabalhos
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado");
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    if (estadoParam) {
      where.estado = true;
    }

    await initDB();

    const { rows, count } = await Trabalho.findAndCountAll({
      raw: false,
      include: [
        {
          model: User,
          as: "Usuario",
          attributes: { exclude: ["password"] },
          include: [{ model: Universidade, as: "Universidade" }],
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
