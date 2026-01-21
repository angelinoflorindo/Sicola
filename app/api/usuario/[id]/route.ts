export const dynamic = "force-dynamic";
import { hashPassword } from "@/app/api/actions/server";
import { NextRequest, NextResponse } from "next/server";
import { sequelize } from "@/lib/sequelize";
import { User } from "@/models/User";
import { Prova } from "@/models/Prova";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  const query = id;

  // Verifica se é email ou telemóvel
  const isEmail = query.includes("@");
  let user = null;

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    if (isEmail) {
      user = await User.findOne({
        where: { email: query },
        attributes: [
          "id",
          "primeiro_nome",
          "segundo_nome",
          "telemovel",
          "email",
        ],
        include: [
          {
            model: Prova,
            as: "Prova",
            attributes: ["id"],
          },
        ],
      });
    } else {
      user = await User.findOne({
        where: { telemovel: query },
        attributes: [
          "id",
          "primeiro_nome",
          "segundo_nome",
          "telemovel",
          "email",
        ],
        include: {
          model: Prova,
          as: "Prova",
          attributes: ["id"],
        },
      });
    }

    if (!user) {
      return NextResponse.json(
        { error: "Usuário não encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json(
      { error: "Erro ao buscar dados" },
      { status: 404 }
    );
  }
}

// PUT - Atualizar usuário por ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = Number(id);
  let body = await req.json();

  let userInfo = {
    primeiro_nome: body.primeiro_nome,
    segundo_nome: body.segundo_nome,
    email: body.email,
    telemovel: body.telemovel,
    curso: body.curso,
  };

  let bodyInfo = {
    primeiro_nome: body.primeiro_nome,
    segundo_nome: body.segundo_nome,
    email: body.email,
    telemovel: body.telemovel,
    curso: body.curso,
    password: body.password,
  };

  try {
    await sequelize.authenticate();
    await sequelize.sync();

    if (body.password) {
      const hashPass = await hashPassword(body.password);
      bodyInfo.password = hashPass;

      const userResponse = await User.update(bodyInfo, { where: { id: uuid } });

      if (!userResponse) {
        return NextResponse.json(
          { message: "Operação mal sucedida" },
          { status: 404 }
        );
      }
      return NextResponse.json(userResponse, { status: 200 });
    }

    const userResponse = await User.update(userInfo, { where: { id: uuid } });

    if (!userResponse) {
      return NextResponse.json(
        { message: "Operação mal sucedida" },
        { status: 404 }
      );
    }

    return NextResponse.json(userResponse, { status: 200 });
  } catch (error) {
    return NextResponse.json(error);
  }
}

// DELETE - Remover usuário por ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = await context.params;
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    await User.destroy({ where: { where: { id: id } } });

    return NextResponse.json("Dados eliminado");
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 404 });
  }
}
