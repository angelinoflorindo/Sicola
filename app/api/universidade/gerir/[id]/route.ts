import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db"; 
import { Universidade } from "@/models/Universidade";


/*
// Editar Universidade
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();

    const result = await Universidade.update(
      { status: "PENDENTE" },
      { where: { id: uuid, estado: true, status: "PAGO" }},
    );

    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}

*/

// Eliminar Universidades
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }, // Agora é uma Promise
) {
  const { id } = await context.params;
  const uuid = Number(id);

  try {
    await initDB();

    const result = await Universidade.destroy({where:{id:uuid}})
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
