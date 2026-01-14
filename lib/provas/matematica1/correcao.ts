// lib/matematicaI.correcao.ts
export function corrigir(resposta: string, esperadas: string[], cotacao: number) {
  let pontos = 0;

  esperadas.forEach(palavra => {
    if (resposta.toLowerCase().includes(palavra)) {
      pontos += cotacao / esperadas.length;
    }
  });

  return Math.min(pontos, cotacao);
}
