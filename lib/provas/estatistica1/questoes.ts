export const questoesEstatisticaI = [
  {
    id: 1,
    tipo: "MULTIPLA",
    cotacao: 4,
    enunciado:
      "Os mais importantes fornecedores de ovos de um supermercado F₁ e F₂ fornecem, respectivamente, 50% e 40% do total dos ovos adquiridos pelo supermercado. Alguns dos ovos vêm estragados, tendo-se apurado que, dos ovos estragados, 6% são fornecidos por F₁  e 3% por F₂. Sabe-se também que a percentagem de ovos estragados de outros fornecedores é de 5%.",
    subitens: [
      "Qual a percentagem total de ovos estragados recebidos pelo supermercado?",
      "Escolhidos ao acaso alguns ovos verificou-se que estavam estragados, qual a probabilidade de estes terem sido fornecidos por outros fornecedores?",
      "Se forem retirados 2 ovos sucessivamente e com reposição, dos ovos fornecidos por todos os fornecedores, qual é a probabilidade de um ovo estar estragado e o outro não?",
    ],
    formula: "",
    opcoes: [
      { texto: "4.7\\%", correta: false },
      { texto: "0.55\\%", correta: true },

      { texto: "0.1064", correta: false },
      { texto: "0.0895", correta: false },

      { texto: "0.91", correta: true },
      { texto: "0.0109", correta: true },
    ],
  },
  {
    id: 2,
    tipo: "MULTIPLA",
    cotacao: 1.5,
    enunciado:
      "A tabela a seguir apresenta a distribuição de alunos diplomados em 2002, segundo o nível de ensino e o tipo de instituição, no município X. Um aluno é selecionado ao acaso:",
    tabela: {
      cabecalho: ["Nível", "Pública", "Privada", "Total"],
      dados: [
        ["Fundamental", 145548, 42299, 187847],
        ["Médio", 118945, 39422, 158367],
        ["Superior", 5659, 67124, 72783],
        ["Total", 270152, 148845, 418997],
      ],
    },
    subitens: [
      "Probabilidade de o aluno ter se formado no ensino superior e numa instituição pública",
      "Probabilidade de o aluno ter se formado no ensino médio ou numa instituição pública",
      "Probabilidade de o aluno ter se formado no ensino médio sabendo que é de instituição pública",
    ],
    opcoes: [
      { texto: "0,0135", correta: true },
      { texto: "0,739", correta: true },
      { texto: "0,44", correta: true },

      { texto: "0,135", correta: false },
      { texto: "0,261", correta: false },
      { texto: "0,56", correta: false },
    ],
  },
  {
    id: 3,
    tipo: "MULTIPLA",
    cotacao: 4,
    enunciado:
      "Na análise de uma amostra de 100 empresas portuguesas de importação-exportação, verificou-se que 40 exportam para Angola, 50 exportam para Moçambique e 25 exportam para ambos os países. Seleciona-se ao acaso uma destas empresas:",
    subitens: [
      "Probabilidade de a empresa exportar pelo menos para um dos países",
      "Probabilidade de a empresa não exportar para nenhum dos países",
      "Probabilidade de a empresa exportar para Angola, mas não para Moçambique",
      "Probabilidade de a empresa exportar para Angola, sabendo que não exporta para Moçambique",
    ],
    opcoes: [
      { texto: "0,65", correta: true },
      { texto: "0,45", correta: false },
      { texto: "0,75", correta: false },

      { texto: "0,35", correta: true },
      { texto: "0,25", correta: false },

      { texto: "0,65", correta: false },

      { texto: "0,15", correta: true },
      { texto: "0,30", correta: true },
    ],
  },

  {
    id: 4,
    tipo: "MULTIPLA",
    cotacao: 3,
    enunciado:
      "Numa linha de produção, uma peça é produzida por três máquinas M₁, M₂ e M₃, responsáveis por 30%, 35% e 35% da produção, respetivamente. As proporções de peças defeituosas são 5%, 2,5% e 2%. Seleciona-se ao acaso uma peça produzida na fábrica:",
    subitens: [
      "Proporção total de peças defeituosas produzidas na fábrica",
      "Probabilidade de a peça defeituosa ter sido produzida na máquina M₁",
      "Probabilidade de a peça defeituosa ter sido produzida na máquina M₂",
      "Probabilidade de a peça defeituosa ter sido produzida na máquina M₃",
    ],
    opcoes: [
      { texto: "0,03075", correta: true },
      { texto: "0,3075", correta: false },

      { texto: "0,175", correta: false },
      { texto: "0,312", correta: false },

      { texto: "0,285", correta: true },
      { texto: "0,228", correta: true },

      { texto: "0,025", correta: false },
      { texto: "0,488", correta: true },
    ],
  },
  {
    id: 5,
    tipo: "MULTIPLA",
    cotacao: 3,
    enunciado:
      "Uma fábrica de lâmpadas possui três linhas de montagem L₁, L₂ e L₃, responsáveis por 25%, 40% e 35% da produção total, respetivamente. As percentagens de lâmpadas defeituosas em cada linha são 4%, 1,5% e 3%. Seleciona-se ao acaso uma lâmpada produzida nesta fábrica:",
    subitens: [
      "Proporção total de lâmpadas defeituosas produzidas na fábrica",
      "Probabilidade de a lâmpada defeituosa ter sido produzida na linha L₁",
      "Probabilidade de a lâmpada defeituosa ter sido produzida na linha L₂",
      "Probabilidade de a lâmpada defeituosa ter sido produzida na linha L₃",
    ],
    opcoes: [
      { texto: "0,2575", correta: false },
      { texto: "0,015", correta: false },

      { texto: "0,0265", correta: true },
      { texto: "0,378", correta: true },

      { texto: "0,226", correta: true },
      { texto: "0,612", correta: false },

      { texto: "0,396", correta: true },
      { texto: "0,035", correta: false },
    ],
  },
  {
    id: 6,
    tipo: "MULTIPLA",
    cotacao: 4.5,
    enunciado:
      "Uma linha de montagem produz smartphones em duas unidades: Unidade A (65% da produção) e Unidade B (35% da produção). Sabe-se que 2% dos aparelhos da Unidade A apresentam defeitos na tela, enquanto na Unidade B essa taxa é de 4%. Seleciona-se ao acaso um smartphone produzido nesta linha:",
    subitens: [
      "Probabilidade de o smartphone ser defeituoso",
      "Probabilidade de o aparelho ter sido produzido na Unidade A, sabendo que é defeituoso",
      "Probabilidade de o aparelho não ter defeito e ter sido produzido na Unidade B",
    ],
    opcoes: [
      // Subitem 1
      { texto: "0,027", correta: true },
      { texto: "0,336", correta: true },

      // Subitem 2
      { texto: "0,482", correta: true },
      { texto: "0,650", correta: false },

      // Subitem 3
      { texto: "0,350", correta: false },
      { texto: "0,030", correta: false },
    ],
  },
];
