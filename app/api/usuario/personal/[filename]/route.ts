import { initDB } from "@/lib/db";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

// Buscar fotos de perfils dinamicamente
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> },
) {
  try {
    await initDB();

    const { filename } = await context.params;
    
    const filepath = path.join(process.cwd(), "storage/candidatos", filename);

    const fileBuffer = fs.readFileSync(filepath);
    // 📌 Detectar tipo automaticament

    const contentType = detectarArquivo(filename);

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return new Response("Erro ao buscar ficheiro", { status: 500 });
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
