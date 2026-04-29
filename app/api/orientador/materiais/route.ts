import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { getUserIdFromToken } from "@/app/api/actions/server";
import { Material } from "@/models/Material";
import { SubItem } from "@/models/SubItem";
export const dynamic = "force-dynamic";

// Upload de Materiais academicos
export async function POST(req: NextRequest) {
  try {
    initDB();

    const userId = await getUserIdFromToken(req);

    // ✅ RECEBER FORMDATA
    const formData = await req.formData();
    const codigo = formData.get("codigo") as string;
    const titulo = formData.get("titulo") as string;
    const valor = formData.get("valor") as string;
    const subItens = JSON.parse(formData.get("subItens") as string) as String[];

    const file = formData.get("file") as File | null;
    const imagem = formData.get("foto") as File | null;

    // ✅ TRATAR ARQUIVO
    let filename = null;

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      filename = `${Date.now()}-${codigo}-${file.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "storage/ebooks");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, filename);

      fs.writeFileSync(filePath, buffer);
    }

    // ✅ TRATAR IMAGEM
    let fileImage = null;

    if (imagem) {
      const bytes = await imagem.arrayBuffer();
      const buffer = Buffer.from(bytes);

      fileImage = `${Date.now()}-${codigo}-${imagem.name}`;

      const fs = require("fs");
      const path = require("path");

      const uploadDir = path.join(process.cwd(), "public/capas");

      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileImage);

      fs.writeFileSync(filePath, buffer);
    }

    // ✅ TRANSAÇÃO
    const result = await sequelize.transaction(async (t) => {
      const resp = await Material.create({
        user_id: userId,
        valor,
        titulo,
        codigo,
        imagem: fileImage,
        filename: filename,
      });
      for (const item of subItens) {
        await SubItem.create(
          {
            material_id: resp.id,
            item: item,
          },
          { transaction: t },
        );
      }

      return [resp];
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// buscar todos os materias
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

    const { rows, count } = await Material.findAndCountAll({
      raw: false,
      include: [
        {
          model: SubItem,
          as: "SubItens",
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
