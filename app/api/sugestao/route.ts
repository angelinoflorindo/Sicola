// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { Sugestao } from "@/models/Sugestao";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

// Buscar todas as reclamações
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

    const { rows, count } = await Sugestao.findAndCountAll({
      raw: false,
      include: [
        {
          model: User,
          as: "Usuario",
          attributes: [
            "id",
            "primeiro_nome",
            "segundo_nome",
            "email",
            "telemovel",
            "perfil"
          ],
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

//  REGISTAR RECLAMAÇÃO
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    initDB();
    const contributo = await Sugestao.create({
      user_id: data.id,
      descricao: data.descricao,
    });
    return NextResponse.json({ contributo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
