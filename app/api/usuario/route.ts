// eliminei o sequelize.authenticate e sync

import { NextRequest, NextResponse } from "next/server";
import { hashPassword, logInUser, logOutUser } from "../actions/server";
import { initDB } from "@/lib/db";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";

export const dynamic = "force-dynamic";

//Logout de usuário
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const email = searchParams.get("email");

    const user = await User.findOne({ where: { email: email } });

    if (user!.estado) {
      await logOutUser(email);
      return NextResponse.json({ status: 200 });
    } else {
      await logInUser(email);
      return NextResponse.json({ status: 200 });
    }
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

//  REGISTAR USUÁRIO
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const agora = new Date();
    /*
    if (!data.email?.includes("@isaf")) {
      return NextResponse.json(
        { message: "Email institucional inválido" },
        { status: 400 },
      );
    }*/
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

//Recuperação de senha por email

export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    const hashedPassword = await hashPassword(data.password);

    initDB();

    const oldUser = await User.findOne({ where: { email: data.email } });

    if (!oldUser) {
      return NextResponse.json({ message: "Ocorreu um Erro" }, { status: 401 });
    }

    const user = await User.update(
      {
        password: hashedPassword,
      },
      { where: { email: data.email } },
    );

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
