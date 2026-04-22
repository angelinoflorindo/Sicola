import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db"; 
import { Material } from "@/models/Material";
import { SubItem } from "@/models/SubItem";
export const dynamic = "force-dynamic";




/*Essa parte do codigo é inutil */

 
// buscar todos os materias
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado");
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    if(estadoParam){
      where.estado = true
    }
    
    await initDB();

    const { rows, count } = await Material.findAndCountAll({
      raw: false,
      include: [
        {
          model: SubItem,
          as: "SubItens"
        },
      ],
      where,
      limit,
      offset,
      order: [[`${orderBy}`, "DESC"]],
    });

    return NextResponse.json(
      {
        data: rows,
        total: count,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("ERRO BUSCAR:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
/*Essa parte do codigo é inutil */
