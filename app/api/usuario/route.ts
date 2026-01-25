// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { buscarUsuarioPorEmail, hashPassword } from "../actions/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { Acesso } from "@/models/Acesso";
import { addHours } from "date-fns";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

// 🔎 BUSCAR USUÁRIO
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email é obrigatório" },
      { status: 400 },
    );
  }

  const user = await buscarUsuarioPorEmail(email);

  if (!user) {
    return NextResponse.json(
      { message: "Usuário não encontrado" },
      { status: 404 },
    );
  }

  return NextResponse.json(user);
}

//  REGISTAR USUÁRIO
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const agora = new Date();

    if (!data.email?.includes("@isaf")) {
      return NextResponse.json(
        { message: "Email institucional inválido" },
        { status: 400 },
      );
    }
    const hashedPassword = await hashPassword(data.password);

    initDB();

    const result = await sequelize.transaction(async (t) => {
      const user = await User.create(
        {
          primeiro_nome: data.primeiro_nome,
          segundo_nome: data.segundo_nome,
          email: data.email,
          password: hashedPassword,
          curso: data.curso,
          telemovel: data.telemovel,
        },
        { transaction: t },
      );

      const respAcesso = await Acesso.create(
        {
          user_id: user.id,
          plano: "TRIAL",
          inicio: agora,
          fim: addHours(agora, 12),
        },
        { transaction: t },
      );

      return [user, respAcesso];
    });

    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
