// app/api/prova/matematica-i/submit/route.ts
import { converterString, getUserIdFromToken } from "@/app/api/actions/server";
import { initDB } from "@/lib/db";
import { avaliar } from "@/lib/provas/matematica1/avaliacao";
import { questoesMatematicaI } from "@/lib/provas/matematica1/questoes";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const userId = await getUserIdFromToken(req);
    const id = await converterString(userId);
    const { respostas } = await req.json();

    if (!id) {
      return NextResponse.json({ message: "Sessão inválida" }, { status: 401 });
    }
    const { total, detalhes } = avaliar(respostas, questoesMatematicaI);

   

    await initDB();

    // Área rezervada para registar as respostas na BD

  

    return NextResponse.json({
      notaFinal: total,
      detalhes,
      questoesMatematicaI,
    });

    
  } catch (error) {
    return NextResponse.json({ message: "Erro interno" }, { status: 500 });
  }
}
