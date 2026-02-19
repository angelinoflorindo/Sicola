import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Pagamento } from "@/models/Pagamento";
import { Ebook } from "@/models/Ebook";

// Validar se está ou não pago pelo código

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ codigo: string }> }, // Agora é uma Promise
) {
  const { codigo } = await context.params;
  
  try {
    await initDB();

    const result = await Ebook.findOne(
      { where: { codigo: codigo , status:'PAGO'} },
    );

    return NextResponse.json(result );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

