export const dynamic = "force-dynamic";
import { hashPassword } from "@/app/api/actions/server";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Prova } from "@/models/Prova";
import { initDB } from "@/lib/db";

// Usar para gestao de cada usuario
// Normalizar
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await User.update({ situacao: true }, { where: { id: id } });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}

// PUT - Suspender
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();

    const resp = await User.update(
      { situacao: false },
      { where: { id: uuid } },
    );

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  try {
    await initDB();
    await User.destroy({  where: { id: id } });

    return NextResponse.json("Dados eliminado");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
