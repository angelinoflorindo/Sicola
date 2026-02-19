import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Pagamento } from "@/models/Pagamento";
import { Ebook } from "@/models/Ebook";

// Aprovar compra

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);
  try {
    await initDB();

    const result = await Ebook.update(
      { status: "PAGO" },
      { where: { id: uuid } },
    );

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

// Reverter pagamentos aprovados, mas indevidamente validados
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();

    const result = await Ebook.update(
      { status: "PENDENTE" },
      { where: { id: uuid, estado: true, status: "PAGO" }},
    );

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
