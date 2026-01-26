// app/api/prova/matematica-i/submit/route.ts
import { avaliar } from "@/lib/provas/matematica1/avaliacao";
import { questoesMatematicaI } from "@/lib/provas/matematica1/questoes";

export async function POST(req: Request) {
  const { estudante, respostas } = await req.json();
  const { total, detalhes } = avaliar(respostas, questoesMatematicaI);

  
  return Response.json({
    notaFinal: total,
    detalhes,
    questoesMatematicaI
  });
}
