import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Ebook } from "@/models/Ebook";
import path from "path";

// Aprovar compra

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await initDB();

    const e = await Ebook.findByPk(uuid);

    if (e?.status === "PENDENTE") {
      const result = await Ebook.update(
        { status: "PAGO" },
        { where: { id: uuid } },
      );

      return NextResponse.json(result, { status: 200 });
    } else if (e?.status === "PAGO") {
      const result = await Ebook.update(
        { status: "PENDENTE" },
        { where: { id: uuid } },
      );

      return NextResponse.json(result, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}


// Baixar o recibo de compra

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await initDB();

    const data = await Ebook.findByPk(id);

    if (!data || !data.filename) {
      return NextResponse.json("Ficheiro não encontrado", { status: 404 });
    }

    const filePath = path.join(
      process.cwd(),
      `storage/recibos/${data.filename}`,
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json("Ficheiro não existe", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    // 📌 Detectar tipo automaticament

    const contentType = detectarArquivo(data.filename);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${data!.filename}"`,
      },
    });
  } catch (error) {
    return new Response("Erro ao buscar ficheiro", { status: 500 });
  }
}

// Eliminar ebooks aprovados
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();

    const result = await Ebook.destroy({ where: { id: uuid } });
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

function detectarArquivo(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase();

  const mimeTypes: Record<string, string> = {
    // 📄 Documentos
    pdf: "application/pdf",

    // 🖼️ Imagens
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",

    // 📄 Outros úteis
    txt: "text/plain",
    csv: "text/csv",

    // 📊 Office (extra útil)
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  };

  return mimeTypes[ext || ""] || "application/octet-stream";
}
