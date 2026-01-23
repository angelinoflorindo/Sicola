
// eliminei o sequelize.authenticate e sync

export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { buscarPersonalUsuario } from "../../actions/server";



export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      { message: "Email é obrigatório" },
      { status: 400 }
    );
  }

  const user = await buscarPersonalUsuario(email);

  if (!user) {
    return NextResponse.json(
      { message: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  return NextResponse.json(user);
}
