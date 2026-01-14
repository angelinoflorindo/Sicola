// lib/provas.ts
import { PERGUNTAS, Pergunta } from './perguntas'

function shuffle<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5)
}

export function gerarProva(disciplina: string) {
  const questoesDisciplina = PERGUNTAS.filter(
    q => q.disciplina === disciplina
  )

  if (questoesDisciplina.length < 15) {
    throw new Error('Banco de perguntas insuficiente')
  }

  const questoesSelecionadas: Pergunta[] =
    shuffle(questoesDisciplina).slice(0, 15)

  const cotacaoTotal = questoesSelecionadas.reduce(
    (total, q) => total + q.cotacao,
    0
  )

  return {
    id: crypto.randomUUID(),
    disciplina,
    inicioEm: Date.now(),
    fimEm: Date.now() + 2 * 60 * 60 * 1000,
    questoes: questoesSelecionadas,
    cotacaoTotal,
  }
}
