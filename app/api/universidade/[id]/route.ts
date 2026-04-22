import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Universidade } from "@/models/Universidade";

// Editar disciplina
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();
    const result = await Universidade.findByPk(uuid);
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
