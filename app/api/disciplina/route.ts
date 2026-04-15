// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { hashPassword, logInUser, logOutUser } from "../actions/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Disciplina } from "@/models/Disciplina";

export const dynamic = "force-dynamic";

//Buscar todas as disciplinas
export async function GET(req: Request) {
  try {
    const dps = await Disciplina.findAll();

    return NextResponse.json(dps, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//  REGISTAR DISCIPLINA
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();

    initDB();

    const result = await sequelize.transaction(async (t) => {
      const user = await Disciplina.create(
        {
          nome: data.nome,
          codigo: data.codigo,
        },
        { transaction: t },
      );

      // Inserir também no relacionamento com a universidade
      /*
      const respAcesso = await Acesso.create(
        {
          user_id: user.id,
          plano: "TRIAL",
          inicio: agora,
          fim: addDays(agora, 7),
        },
        { transaction: t },
      );

     
     */
      return [user]; // respAcesso
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}

// Editar Disciplina
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    initDB();

    const resp = await Disciplina.update(
      {
        nome: data.nome,
        codigo: data.codigo,
      },
      { where: { id: data.id } },
    );

    // incluir transation caso opte por permitir alteração de universidade

    return NextResponse.json({ resp }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
