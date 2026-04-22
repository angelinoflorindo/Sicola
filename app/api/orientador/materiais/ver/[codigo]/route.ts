export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server"; 
import { initDB } from "@/lib/db"; 
import { Material } from "@/models/Material";
import { SubItem } from "@/models/SubItem"; 

// VER MATERIAL POR CÓDIGO
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ codigo: string }> }, // Agora é uma Promise
) {
  const { codigo } = await context.params;

  try {
    await initDB();

    const resp = await Material.findOne({
      where: { codigo },
      include: [{ model: SubItem, as: "SubItens" }],
    });

    return NextResponse.json(resp, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 },
    );
  }
}
