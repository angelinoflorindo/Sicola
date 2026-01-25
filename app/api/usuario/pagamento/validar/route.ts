import { getUserIdFromToken, converterString, buscarPagamento } from "@/app/api/actions/server";
import { initDB } from "@/lib/db";
import { NextResponse } from "next/server";




// verificação do pagamento do result
export async function GET(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const uuid = await converterString(userId);

    if (!uuid) {
      return NextResponse.json(
        { message: "Usuario não autenticado" },
        { status: 400 }
      );
    }

    await initDB();
    const result = await buscarPagamento(uuid);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
