export const dynamic = 'force-dynamic';
import { converterString } from "@/app/actions/auth";
import { sequelize } from "@/lib/sequelize";
import {Papel} from "@/models/Papel";
import { NextRequest, NextResponse } from "next/server";



export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  //const { searchParams } = new URL(req.url);
  const { id } = await context.params;
  const uuid = await converterString(id);
  try {

    await sequelize.authenticate()
    await sequelize.sync()

    const result = await Papel.findOne({
      where: { user_id: uuid },
    });

    //console.log('testando o resultado', result)
    if (!result) {
      return NextResponse.json(
        { message: "Dados não encontrados" },
        { status: 404 }
      );
    }

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Erro ao buscar os dados", error },
      { status: 500 }
    );
  }
}
