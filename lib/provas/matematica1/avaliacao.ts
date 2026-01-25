import { corrigir } from "./correcao";

export function avaliar(respostas: any[], questoes: any[]) {
  let total = 0;
  const detalhes: any[] = [];

  questoes.forEach((q, i) => {
    const resultado = corrigir(respostas[i], q);
    total += resultado.nota;

    detalhes.push({
      questaoId: q.id,
      nota: resultado.nota,
      detalhes: resultado.detalhes,
    });
  });

  return { total, detalhes };
}
