
export function corrigir(resposta: string, esperadas: string[], cotacao: number) {
  let pontos = 0;

  esperadas.forEach(palavra => {
    let word = palavra.toLowerCase()
    if (resposta.toLowerCase().includes(word)) {
      pontos += cotacao / esperadas.length;
    }
  });

  return Math.min(pontos, cotacao);
}
