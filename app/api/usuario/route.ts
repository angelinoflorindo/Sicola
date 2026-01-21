export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Pagamento } from "@/models/Pagamento";
import { Suporte } from "@/models/Suporte";
import { Prova } from "@/models/Prova";
import { Disciplina } from "@/models/Disciplina";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    const userInfo = await User.findOne({
      where: { email: email },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Pagamento,
          as: "Pagamento",
        },
        {
          model: Suporte,
          as: "Suporte",
        },
        {
          model: Prova,
          as: "Prova",
          include: [{ model: Disciplina, as: "Disciplina" }],
        },
      ],
    });
    return NextResponse.json(userInfo, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar usuário", error },
      { status: 500 }
    );
  }
}

// registar usuários

export async function POST(req: NextRequest) {
  const data = await req.json();
  const isEmail = data.email.includes("@isaf");

  try {
    await sequelize.authenticate();
    await sequelize.sync();
    if (isEmail) {
      const user = await createUser({
        primeiro_nome: data.primeiro_nome,
        password: data.password,
        curso: data.curso,
        email: data.email,
        segundo_nome: data.segundo_nome,
        telemovel: data.telemovel,
      });


      return NextResponse.json({ email: user.email, id: user.id });
    }
    return null
  } catch (error) {
    return NextResponse.json(
      { isSqlError: true, message: "Erro ao criar usuário", error },
      { status: 500 }
    );
  }
}

async function createUser(data: any) {
  const user = await User.create({
      primeiro_nome: data.primeiro_nome,
      password: data.password,
      curso: data.curso,
      email: data.email,
      segundo_nome: data.segundo_nome,
      telemovel: data.telemovel,
    });
  return user;
}
