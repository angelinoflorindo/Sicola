// lib/matematicaI.questoes.ts
export const questoesMatematicaI = [
  {
    id: 1,
    cotacao: 2,
    enunciado: "Dada a função quadrática, determine:",
    subitens: [
      "Zeros da função e ordenada na origem",
      "Coordenadas do vértice",
      "Sentido da concavidade",
      "Esboço do gráfico",
    ],
    formula: "y = 3x^2 - 6x - 9",
    respostaEsperada: ["x=3", "x=-1", "vértice", "concavidade"],
  },
  {
    id: 2,
    cotacao: 3,
    enunciado: "Determine o domínio das seguintes funções:",
    formula: `\\ y = \\log((x-2)(x^2-1)) \\,
      \\ y = \\frac{x}{\\sqrt{x^2 - 9}} \\`,
    respostaEsperada: [
      "x>2",
      "x<-1", // alínea a
      "x>3",
      "x<-3", // alínea b
    ],
  },
  {
    id: 3,
    cotacao: 2,
    enunciado: "Determine o valor de A para continuidade em x = -1:",
    formula: `
      f(x)=
      \\begin{cases}
      \\frac{x^2 - 2x - 3}{x + 1}, & x < -1 \\\\
      Ax - 2, & x \\ge -1
      \\end{cases}
    `,
    respostaEsperada: ["a = -1"],
  },
  {
    id: 4,
    cotacao: 4.5,
    enunciado: "Calcule os seguintes limites:",
    formula: `
      \\lim_{x \\to -\\infty}(\\frac{2x-3}{2x+3})^x,
      \\lim_{x \\to 81}\\frac{\\sqrt{x}-9}{\\sqrt[4]{x}-3},
      \\lim_{x \\to 1/3}\\frac{3x-1}{9x^2-1}
    `,
    respostaEsperada: ["e^{-3}", "6", "1/6"],
  },
  {
    id: 5,
    cotacao: 6,
    enunciado: "Calcule a derivada das seguintes funções:",
    formula: `
      \\ y = (\\ln x)^{\\sin x} ,
      \\ y = \\sqrt[5]{x^2 - 2x + 6} ,
      \\ ye^x = xy^3 + x^4y - 7x^6 - 3y^8 \\,
    `,
    // Removi o campo 'formula' genérico e usei subitens para organização
    respostaEsperada: [
      "Derivação logarítmica",
      "Regra da cadeia",
      "Derivação implícita",
    ],
  },

  {
    id: 6,
    cotacao: 2.5,
    enunciado: "Determine a equação da reta tangente à curva:",
    formula: "y = x^3 - 2x, \\quad x=5",
    respostaEsperada: ["y - y0 = m(x - x0)"],
  },
];
