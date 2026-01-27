export const questoesCalculoFinanceiro = [
  {
    id: 1,
    tipo: "MULTIPLA",
    cotacao: 3.5,
    enunciado: "Determinar as seguintes equivalências entre taxas efectivas:",
    subitens: [
      "Taxa efectiva quinzenal equivalente a 26,9735% a.a.",
      "Taxa efectiva de dois anos equivalente a 4,30% ao trimestre",
      "Taxa efectiva de 25 dias equivalente a 124% em 120 dias",
    ],
    opcoes: [
      { texto: "1,00%", correta: true },

      { texto: "1,12%", correta: false },
      { texto: "34,40%", correta: false },
      { texto: "18,50%", correta: true },
      { texto: "25,83%", correta: false },
      { texto: "39,63%", correta: true },
    ],
  },
  {
    id: 2,
    tipo: "MULTIPLA",
    cotacao: 4.5,
    enunciado: "Encontre a taxa equivalente em cada um dos casos:",
    subitens: [
      "Ao trimestre com capitalização trimestral de 66,20% ao ano",
      "Ao trimestre com capitalização trimestral de 42% ao quadrimestre",
      "Ao mês com capitalização mensal de 30% ao ano",
      "Ao semestre com capitalização mensal de 75% ao ano",
      "Ao semestre com capitalização semestral de 30% ao ano",
      "Ao ano com capitalização trimestral de 7,5% ao quadrimestre",
      "Aos 75 dias com capitalização aos 75 dias de 70% aos 33 dias",
    ],
    opcoes: [
      { texto: "15,37%", correta: true },
      { texto: "36,40%", correta: true },
      { texto: "234%", correta: true },

      { texto: "16,55%", correta: false },
      { texto: "33,10%", correta: true },
      { texto: "2,50%", correta: true },
      { texto: "30%", correta: false },
      { texto: "18,75%", correta: false },
      { texto: "15,56%", correta: true },
      { texto: "22,2952%", correta: true },
    ],
  },
  {
    id: 3,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: `
  A empresa NOVA ERA descontou uma nota promissória
  de Kz 1.000.000,00, 89 dias antes do vencimento,
  à taxa de desconto comercial de 3% a.m.
  `,
    opcoes: [
      {
        texto:
          "Desconto = 75.000 ; Valor líquido = 925.000 ; Taxa efetiva = 3%",
        correta: false,
      },
      {
        texto:
          "Desconto = 89.000 ; Valor líquido = 903.500 ; Taxa efetiva = 3,49 %",
        correta: true,
      },
      {
        texto:
          "Desconto = 100.000 ; Valor líquido = 900.000 ; Taxa efetiva = 4%",
        correta: false,
      },
    ],
  },
  {
    id: 4,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: `
  Uma duplicata de Kz 180.000,00 é descontada
  quatro meses antes do vencimento à taxa simples
  de 60% ao semestre.
  `,
    opcoes: [
      {
        texto: "Desconto = 48.000 ; Valor liberado = 132.000",
        correta: false,
      },
      {
        texto: "Desconto = 60.030 ; Valor liberado = 150.000",
        correta: false,
      },
      {
        texto: "Desconto = 51.428,57 ; Valor liberado = 128.571,43",
        correta: true,
      },
    ],
  },
  {
    id: 5,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: `
  Um título de 2.000 foi descontado comercialmente,
  com taxa exponencial de 3% a.m. e antecipação de 2 meses.
  `,
    opcoes: [
      {
        texto: "d = 2,8702% a.m. ; D = 114,81",
        correta: true,
      },
      {
        texto: "d = 3% a.m. ; D = 120,00",
        correta: false,
      },
      {
        texto: "d = 2,50% a.m. ; D = 100,00",
        correta: false,
      },
    ],
  },
  {
    id: 6,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Calcule o número de prestações mensais de R$ 15.000,00,
  capazes de liquidar um financiamento de R$ 49.882,65,
  à taxa de 20% ao semestre.
  `,
    opcoes: [
      {
        texto: "3 prestações",
        correta: false, // erro por usar taxa mensal = 20%
      },
      {
        texto: "5 prestações",
        correta: false, // erro por usar capitalização simples
      },
      {
        texto: "4 prestações",
        correta: true,
      },
    ],
  },
  {
    id: 7,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Quanto uma pessoa deverá aplicar mensalmente durante 5 anos
  para resgatar R$ 200.000,00 ao final de 60 meses,
  sabendo-se que o rendimento é de 2% ao mês?
  `,
    opcoes: [
      {
        texto: "R$ 2.500,00",
        correta: false, // erro por ignorar juros
      },
      {
        texto: "R$ 2.430,00",
        correta: false, // erro por usar taxa anual
      },
      {
        texto: "R$  1.753,60",
        correta: true,
      },
    ],
  },
  {
    id: 8,
    tipo: "UNICA",
    cotacao: 1.5,
    enunciado: `
  Determine o montante ao final do 5º mês,
  resultante da aplicação de 5 prestações mensais
  de R$ 100,00 à taxa de 4% ao mês,
  sabendo-se que a primeira aplicação ocorre na data do contrato.
  `,
    opcoes: [
      {
        texto: "R$ 563,30",
        correta: true,
      },
      {
        texto: "R$ 541,63",
        correta: false, // erro por tratar como renda postecipada
      },
      {
        texto: "R$ 580,00",
        correta: false, // erro por capitalização simples
      },
    ],
  },
  {
    id: 9,
    tipo: "UNICA",
    cotacao: 1,
    enunciado: `
  Uma empresa obtém um empréstimo de R$ 100.000,00
  para ser quitado em 5 prestações mensais iguais.
  A primeira prestação vence 90 dias após o contrato.
  A taxa de juros é de 6% ao mês.
  `,
    opcoes: [
      {
        texto: "R$ 22.375,00",
        correta: false, // erro por ignorar carência
      },
      {
        texto: "R$ 26.673,65",
        correta: true,
      },
      {
        texto: "R$ 26.000,00",
        correta: false, // erro por capitalização simples
      },
    ],
  },
  {
    id: 10,
    tipo: "UNICA",
    cotacao: 1.5,
    enunciado: `
  Uma dívida de R$ 20.000,00 deve ser amortizada
  com 6 pagamentos bimestrais consecutivos,
  à taxa de 4% ao bimestre.
  A primeira prestação ocorre 4 meses após o empréstimo.
  `,
    opcoes: [
      {
        texto: "R$ 3.967,39",
        correta: true,
      },
      {
        texto: "R$ 3.600,00",
        correta: false, // erro por ignorar diferimento
      },
      {
        texto: "R$ 4.200,00",
        correta: false, // erro por arredondamento grosseiro
      },
    ],
  },
];
