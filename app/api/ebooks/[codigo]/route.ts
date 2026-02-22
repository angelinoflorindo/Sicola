import { PDFDocument, rgb, degrees, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";
import { converterString, getUserFromToken } from "@/app/api/actions/server";
import { NextResponse } from "next/server";
import { Ebook } from "@/models/Ebook";

export async function GET(
  req: Request,
  context: { params: Promise<{ codigo: string }> },
) {
  const user = await getUserFromToken(req);
  const id = await converterString(user?.id);
  const { codigo } = await context.params;

  if (!id || !user) {
    console.log("erro de autenticação");
    return NextResponse.json(
      { message: "Usuario não autenticado" },
      { status: 400 },
    );
  }

  const comprado = await Ebook.findOne({
    where: { codigo: codigo, status: "PAGO", user_id:id},
  });

  if (!comprado) {
    console.log("erro de compra");
    return NextResponse.json(
      { message: "Livro não foi comprado" },
      { status: 403 },
    );
  }

  // 📂 Caminho do PDF original
  const filePath = path.join(process.cwd(), `storage/ebooks/${codigo}.pdf`);

  const existingPdfBytes = fs.readFileSync(filePath);

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  const pages = pdfDoc.getPages();

  pages.forEach((page) => {
    const { width, height } = page.getSize();

    page.drawText(`${user.name}`, {
      x: width / 4,
      y: height / 2,
      size: 40,
      font,
      color: rgb(0.75, 0.75, 0.75),
      rotate: degrees(-45),
      opacity: 0.3,
    });
  });

  const pdfBytes = await pdfDoc.save();

  return new Response(Buffer.from(pdfBytes), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${codigo}.pdf"`,
    },
  });
}
