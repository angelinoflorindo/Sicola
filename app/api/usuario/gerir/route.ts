// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { converterBoolean } from "../../actions/server";

export const dynamic = "force-dynamic";

// 🔎 BUSCAR USUÁRIO
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 5);
    const offset = (page - 1) * limit;

    const estadoParam = searchParams.get("estado") || false;
    const status = searchParams.get("situacao") || false;
    const orderBy = searchParams.get("order") || "created_at";

    const where: any = {};

    await initDB();
    if (!estadoParam && !status) {
      console.log('sem informacções a buscar...')
    } else {
      where.situacao =  await converterBoolean(status);
      where.estado = await converterBoolean(estadoParam);
    }

    const { rows, count } = await User.findAndCountAll({
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
