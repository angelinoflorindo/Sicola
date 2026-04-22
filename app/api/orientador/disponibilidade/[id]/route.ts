export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/models/User";
import { initDB } from "@/lib/db";
import { Disponibilidade } from "@/models/Disponibilidade";

// BUSCAR DISPONIBILIDADE POR USER ID

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;

  try {
    await initDB();

    const resp = await Disponibilidade.findAll({ where: { user_id: id, estado:true } });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
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

    const resp = await Disponibilidade.destroy({ where: { id } });

    return NextResponse.json(resp, { status: 200 });
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

    const result = await Disponibilidade.update(
      { estado: false },
      { where: { id, estado: true } },
    );

    if (!result[0]) {
      await Disponibilidade.update(
        { estado: true },
        { where: { id, estado: false } },
      );
    }

    return NextResponse.json("successfull toggle", { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}
