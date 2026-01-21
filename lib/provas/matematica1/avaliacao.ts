
import { corrigir } from "./correcao";

export function avaliar(respostas: string[], questoes: any[]) {
  let total = 0;
  const detalhes:any = [];

  questoes.forEach((q, i) => {
    const nota = corrigir(respostas[i], q.respostaEsperada, q.cotacao);
    total += nota;
    detalhes.push({ questaoId: q.id, nota });
  });

  return { total, detalhes };
}
