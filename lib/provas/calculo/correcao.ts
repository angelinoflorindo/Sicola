export function corrigir(resposta: any, questao: any) {
  let nota = 0;
  const detalhes: any[] = [];

  /* =========================
     QUESTÃO UNICA
     ========================= */
  if (questao.tipo === "UNICA") {
    const correta = questao.opcoes.find((o: any) => o.correta === true);

    const acertou =
      typeof resposta === "string" &&
      normalize(resposta) === normalize(correta?.texto);

    if (acertou) {
      nota = questao.cotacao;
    }

    detalhes.push({
      respostaAluno: resposta ?? null,
      correta: correta?.texto ?? null,
      acertou,
      indice:questao.id
    });
  }

  /* =========================
     QUESTÃO MULTIPLA (C/E)
     ========================= */
  if (questao.tipo === "MULTIPLA") {
    // conta apenas opções corretas
    const totalCorretas = questao.opcoes.filter(
      (o: any) => o.correta === true
    ).length;

    const valorPorItem = questao.cotacao / totalCorretas;

    questao.opcoes.forEach((item: any, i: number) => {
      const respondeu = resposta?.[i];

      // só pontua se marcou TRUE numa correta
      const acertou = respondeu === true && item.correta === true;

      if (acertou) {
        nota += valorPorItem;
      }

      detalhes.push({
        respostaAluno: respondeu ?? null,
        correta: item.correta,
        acertou,
        indice:i
      });
    });
  }

  return {
    nota: Math.round(nota * 100) / 100,
    detalhes,
  };
}

function normalize(str: string) {
  return str.replace(/\s/g, "").trim(); // remove espaços e tabs
}