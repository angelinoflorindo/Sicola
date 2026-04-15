export const dynamic = "force-dynamic";
import { hashPassword } from "@/app/api/actions/server";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Prova } from "@/models/Prova";
import { initDB } from "@/lib/db";

// Usar para gestao de cada usuario
// Aprovar para Orientador
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await User.update({ perfil: 'ORIENTADOR' }, { where: { id: id } });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}

// PUT - REJEITAR O CANDIDATO
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
      { perfil:'ESTUDANTE' },
      { where: { id: uuid } },
    );

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}