import fs from "fs";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { initDB } from "@/lib/db";
import { Disponibilidade } from "@/models/Disponibilidade";
import { Orientacao } from "@/models/Orientacao";
import { sequelize } from "@/lib/sequelize";
import { Sessao } from "@/models/Sessao";
import path from "path";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;

  try {
    await initDB();

    const data = await Orientacao.findByPk(id);

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

// ELIMINAR DISPONIBILIDADE
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const result = await sequelize.transaction(async (t) => {
      const resp = await Orientacao.destroy({ where: { id }, transaction: t });
      const resp2 = await Sessao.destroy({
        where: { orientacao_id: id },
        transaction: t,
      });
      return [resp, resp2];
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}

// PUT - REVERTER A DISPONIBILIDADE ACTIVAR/DESACTIVAR
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  try {
    await initDB();

    const result = await Orientacao.findByPk(id);
    if (result?.situacao === "pendente" || result?.situacao === "rejeitado") {
      await Orientacao.update(
        { situacao: "aprovado" },
        { where: { id, estado: true } },
      );
      return NextResponse.json("successfull toggle", { status: 200 });
    }

    await Orientacao.update(
      { situacao: "rejeitado" },
      { where: { id, estado: true, situacao: "aprovado" } },
    );
    return NextResponse.json("successfull toggle", { status: 200 });
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
