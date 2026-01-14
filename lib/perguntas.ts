export type Pergunta = {
id: number
disciplina: string
tipo: 'VF'
texto: string
resposta: boolean
cotacao: number // valor da questão
}


export const PERGUNTAS: Pergunta[] = [
// Matemática I
{ id: 1, disciplina: 'Matemática I', tipo: 'VF', texto: '2 + 2 = 4', resposta: true, cotacao: 1 },
{ id: 2, disciplina: 'Matemática I', tipo: 'VF', texto: '5 é número par', resposta: false, cotacao: 1 },
{ id: 3, disciplina: 'Matemática I', tipo: 'VF', texto: '10 / 2 = 6', resposta: false, cotacao: 1 },
{ id: 4, disciplina: 'Matemática I', tipo: 'VF', texto: 'A raiz quadrada de 9 é 3', resposta: true, cotacao: 1 },
{ id: 5, disciplina: 'Matemática I', tipo: 'VF', texto: '0 é um número natural', resposta: true, cotacao: 1 },


// Estatística
{ id: 6, disciplina: 'Estatística', tipo: 'VF', texto: 'A média é uma medida de tendência central', resposta: true, cotacao: 1 },
{ id: 7, disciplina: 'Estatística', tipo: 'VF', texto: 'A moda é sempre única', resposta: false, cotacao: 1 },
{ id: 8, disciplina: 'Estatística', tipo: 'VF', texto: 'O desvio padrão mede dispersão', resposta: true, cotacao: 1 },
{ id: 9, disciplina: 'Estatística', tipo: 'VF', texto: 'Probabilidade varia entre 0 e 2', resposta: false, cotacao: 1 },
{ id: 10, disciplina: 'Estatística', tipo: 'VF', texto: 'Uma amostra representa a população', resposta: true, cotacao: 1 },


// Finanças Empresariais
{ id: 11, disciplina: 'Finanças Empresariais', tipo: 'VF', texto: 'Liquidez mede capacidade de pagar obrigações', resposta: true, cotacao: 1 },
{ id: 12, disciplina: 'Finanças Empresariais', tipo: 'VF', texto: 'Ativo é maior que passivo por definição', resposta: false, cotacao: 1 },
{ id: 13, disciplina: 'Finanças Empresariais', tipo: 'VF', texto: 'Capital próprio pertence aos sócios', resposta: true, cotacao: 1 },
{ id: 14, disciplina: 'Finanças Empresariais', tipo: 'VF', texto: 'Rentabilidade é igual à liquidez', resposta: false, cotacao: 1 },
{ id: 15, disciplina: 'Finanças Empresariais', tipo: 'VF', texto: 'Fluxo de caixa analisa entradas e saídas', resposta: true, cotacao: 1 },
]