export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import fs from "fs";
import path from "path";

// Buscar capas dinamicamente
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ capa: string }> },
) {
  try {
    await initDB();

    const { capa } = await context.params;
    
    const filepath = path.join(process.cwd(), "storage/capas", capa);

    const fileBuffer = fs.readFileSync(filepath);
    // 📌 Detectar tipo automaticament

    const contentType = detectarArquivo(capa);

    return new Response(fileBuffer, {
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
