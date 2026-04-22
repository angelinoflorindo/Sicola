import fs from "fs";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"; 
import { initDB } from "@/lib/db"; 
import { Material } from "@/models/Material";
import path from "path";
import { PDFDocument } from "pdf-lib";
import { Trabalho } from "@/models/Trabalho";

// Baixar o material

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await Trabalho.findByPk(id);

    if (!resp || !resp.filename) {
      return NextResponse.json("Ficheiro não encontrado", { status: 404 });
    }

    const filePath = path.join(
      process.cwd(),
      `storage/recibos/${resp.filename}`,
    );

    if (!fs.existsSync(filePath)) {
      return NextResponse.json("Ficheiro não existe", { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    // 📌 Detectar tipo automaticament

    const contentType = detectarArquivo(resp.filename);

    return new Response(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${resp!.filename}"`,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}

// ELIMINAR
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await Trabalho.destroy({ where: { id }});
    
    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}


//  REalizar
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  try {
    await initDB();

    const resp = await Trabalho.findByPk(id);

    if (!resp?.estado) {
      await Trabalho.update({ estado: true }, { where: { id} });
      return NextResponse.json("Começando a realizar o trabalho", { status: 200 });
    }
    return NextResponse.json("trabalho já realizado", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

//CANCELAR
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  try {
    await initDB();

    const resp = await Trabalho.findByPk(id);

    if (resp?.estado) {
      await Trabalho.update({ estado: false }, { where: { id } });
      return NextResponse.json("Trablhado cancelado", { status: 200 });
    }
    return NextResponse.json("successfull", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
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