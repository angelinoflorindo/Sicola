import { NextResponse } from "next/server";
import { initDB } from "@/lib/db";
import { buscarAcesso, converterString, getUserIdFromToken, validarAcesso } from "@/app/api/actions/server";


// validação automática do acesso
export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId)

    if (!id) {
      return NextResponse.json(
        { message: "Sessão inválida" },
        { status: 401 }
      );
    }

    await initDB();
    const acesso = await validarAcesso(id);

    if (!acesso) {
      return NextResponse.json(
        { message: "Acesso expirado" },
        { status: 403 }
      );
    }

    // continua a lógica da prova
    return NextResponse.json({ ok: true});

  } catch (error) {
    return NextResponse.json(
      { message: "Erro interno" },
      { status: 500 }
    );
  }
}


// verificação do prazo do acesso
export async function GET(req:Request) {

  const userId = await getUserIdFromToken(req);
  const uuid = await converterString(userId)

  if (!uuid) {
    return NextResponse.json(
      { message: "Usuario não autenticado" },
      { status: 400 }
    );
  }

  await initDB()
  const acesso = await buscarAcesso(uuid);

  return NextResponse.json(acesso);
}

