// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { converterBoolean } from "../../actions/server";
import { Disciplina } from "@/models/Disciplina";

export const dynamic = "force-dynamic";

// BUSCAR TODOS OS REGISTROS
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado") || false;
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    await initDB();
    if (!estadoParam && !status) {
      console.log('sem informacções a buscar...')
    } else {
      where.estado = await converterBoolean(estadoParam);
    }

    const { rows, count } = await Disciplina.findAndCountAll({
      raw: false,
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
    console.error("ERRO BUSCAR USARIOS:", error);

    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
