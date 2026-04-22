import fs from "fs";
export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { Material } from "@/models/Material";
import { SubItem } from "@/models/SubItem";
import path from "path";
import { PDFDocument } from "pdf-lib";

// Baixar o material

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const m = await Material.findByPk(id);

    if (!m || !m.filename) {
      return NextResponse.json("Ficheiro não encontrado", { status: 404 });
    }

    // 📂 Caminho do PDF original
    const filePath = path.join(process.cwd(), `storage/ebooks/${m?.filename}`);

    const existingPdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);

    const pdfBytes = await pdfDoc.save();

    return new Response(Buffer.from(pdfBytes), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${m?.filename}"`,
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

    const resp = sequelize.transaction(async (t) => {
      const m = await Material.destroy({ where: { id }, transaction: t });
      const s = await SubItem.destroy({
        where: { material_id: id },
        transaction: t,
      });
      return [m, s];
    });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}

//  ACTIVAR/DESACTIVAR
export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  try {
    await initDB();

    const m = await Material.findByPk(id);

    if (m?.estado) {
      await Material.update({ estado: false }, { where: { id } });
      return NextResponse.json("successfull toggle", { status: 200 });
    }
    await Material.update({ estado: true }, { where: { id } });
    return NextResponse.json("successfull toggle", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
