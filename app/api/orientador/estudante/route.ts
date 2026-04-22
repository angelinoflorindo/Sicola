import { NextRequest, NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { UserDisciplina } from "@/models/UserDisciplina";
import { Disciplina } from "@/models/Disciplina";
import { Orientacao } from "@/models/Orientacao";
import { sequelize } from "@/lib/sequelize";
import { Sessao } from "@/models/Sessao";
export const dynamic = "force-dynamic";

// buscar Estudantes aprovados
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

    const { rows, count } = await Orientacao.findAndCountAll({
      raw: false,
      include: [
        {
          model: UserDisciplina,
          as: "UserDisciplina",

          include: [
            {
              model: Disciplina,
              as: "Disciplina",
            },
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

//  Operações sobre o programa de orientação
export async function PATCH(
  req: NextRequest 
) { 
  const data = await req.json();
  const id = data.inputId
  try {
    await initDB();


    if (data.estado === "terminar") {
      await Orientacao.update(
        { estado: false },
        { where: { id: data.inputId, estado: true, situacao: "aprovado" } },
      );

      return NextResponse.json("successfull toggle", { status: 200 });
    }

    if (data.estado === "eliminar") {
      const result = await sequelize.transaction(async (t) => {
        const resp = await Orientacao.destroy({
          where: { id},
          transaction: t,
        });
        const resp2 = await Sessao.destroy({
          where: { orientacao_id: id },
          transaction: t,
        });
        return [resp, resp2];
      });

      return NextResponse.json(result, { status: 200 });
    }

    if (data.estado === "restaurar") {
      await Orientacao.update(
        { estado: true },
        { where: { id: data.inputId, estado: false, situacao: "aprovado" } },
      );

      return NextResponse.json("successfull toggle", { status: 200 });
    }
  } catch (error) {
    return NextResponse.json(error);
  }
}
