export const questoesMatematicaI = [
  {
    id: 1,
    tipo: "MULTIPLA",
    cotacao: 2,
    enunciado: "Dada a função quadrática, determine:",
    subitens: [
      "Zeros da função e ordenada na origem",
      "Coordenadas do vértice",
      "Sentido da concavidade",
    ],
    formula: "y = 3x^2 - 6x - 9",
    opcoes: [
      { texto: "x = -3 \\; \\text{ou} \\; x = 1", correta: false },
      { texto: "x = 3 \\; \\text{ou} \\; x = -1", correta: true },
      { texto: "x_v = 1 \\; \\text{e} \\; y_v = -12", correta: true },
      { texto: "x_v = 1 \\; \\text{e} \\; y_v = 12", correta: false },
      { texto: "\\text{Concavidade voltada para baixo}", correta: false },
      { texto: "\\text{Concavidade voltada para cima}", correta: true },
    ],
  },

  {
    id: 2,
    tipo: "MULTIPLA",
    cotacao: 3,
    enunciado: "Determine o domínio das seguintes funções:",
    formula: `
    y = \\log_{x-2}\\big(x^2-1\\big), \\quad
    y = \\frac{x}{\\sqrt{x^2 - 9}}
    `,
    opcoes: [
    {
      texto: "]2,3[  \\cup ]3,+\\infty[",
      correta: true,
    },
    {
      texto: "[2,3]  \\cup ]3,+\\infty[",
      correta: false,
    },
      {
        texto: "-3 < x < 0 \\; \\text{ou} \\; x > 3",
        correta: false,
      },
      {
        texto: "-3 < x \\le 0 \\; \\text{ou} \\; x > 3",
        correta: true,
      },
    ],
  },

  {
    id: 3,
    tipo: "UNICA",
    cotacao: 2,
    enunciado: "Determine o valor de A para continuidade em x = -1:",
    formula: `
    f(x) =
    \\begin{cases}
      \\dfrac{x^2 - 2x - 3}{x + 1}, & x < -1 \\\\
      Ax - 2, & x \\ge -1
    \\end{cases}
    `,
    opcoes: [
      { texto: "A = -2", correta: false },
      { texto: "A = -1", correta: false },
      { texto: "A = 2", correta: true },
    ],
  },

  {
    id: 4,
    tipo: "MULTIPLA",
    cotacao: 4.5,
    enunciado: "Calcule os seguintes limites:",
    formula: `
    \\lim_{x \\to -\\infty} \\left(\\frac{2x-3}{2x+3}\\right)^x, \\quad
    \\lim_{x \\to 81} \\frac{\\sqrt{x}-9}{\\sqrt[4]{x}-3}, \\quad
    \\lim_{x \\to \\frac{1}{3}} \\frac{3x-1}{9x^2-1}
    `,
    opcoes: [
      { texto: "9", correta: false },
      { texto: "6", correta: true },
      { texto: "\\dfrac{1}{2}", correta: true },
      { texto: "\\dfrac{2}{3}", correta: false },
      { texto: "e^{-3}", correta: true },
      { texto: "e^{3}", correta: false },
    ],
  },

  {
    id: 5,
    tipo: "MULTIPLA",
    cotacao: 6,
    enunciado: "Calcule a derivada das seguintes funções:",
    formula: `
    y = (\\ln x)^{\\sin x}, \\quad
    y = \\sqrt[5]{x^2 - 2x + 6}, \\quad
    y e^x = x y^3 + x^4 y - 7x^6 - 3y^8
    `,
    opcoes: [
      {
        texto:
          "y' = \\dfrac{y^3 + 4yx^3 - 42x^5 - y e^x}{e^x - 3xy^2 - x^4 + 24y^7}",
        correta: true,
      },
      {
        texto:
          "y' = \\dfrac{y^3 + 4yx^3 - 42x^5 - y e^x}{e^x - 3xy^2 - x^3 + 24y^6}",
        correta: false,
      },
      {
        texto: "y' = \\dfrac{1}{5\\left(x^2 - 2x + 6\\right)^{4/5}}",
        correta: false,
      },
      {
        texto: "y' = \\dfrac{2(x - 1)}{5\\left(x^2 - 2x + 6\\right)^{4/5}}",
        correta: true,
      },
      {
        texto:
          "y' = (\\ln x)^{\\sin x}\\left(\\cos x\\,\\ln(\\ln x) + \\dfrac{\\sin x}{x\\ln x}\\right)",
        correta: true,
      },
      {
        texto:
          "y' = (\\ln x)^{\\sin x}\\left(\\cos x\\,\\ln(\\ln x) + \\dfrac{\\sin x}{\\ln x}\\right)",
        correta: false,
      },
      {
        texto: "y' = (\\ln x)^{\\sin x}\\,\\cos x\\,\\ln(\\ln x)",
        correta: false,
      },
    ],
  },
  {
  id: 6,
  tipo: "UNICA",
  cotacao: 2.5,
  enunciado: "Determine a equação da reta tangente à curva:",
  formula: "y = x^3 - 2x \\quad (x = 5)",
  opcoes: [
    { texto: "y - 105 = 73(x - 5)", correta: false },
    { texto: "y = 73x - 250", correta: true },
    { texto: "y = 73x - 260", correta: false },
  ],
}
];
