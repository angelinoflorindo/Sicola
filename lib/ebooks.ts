type Ebooks = {
  id: number;
  codigo: string;
  titulo: string;
  subItens: string[];
  valor: string;
  imagem: string;
};

export const ebooks: Ebooks[] = [
  {
    id: 1,
    codigo: "guiaCalculo",
    titulo: "Guia Completo de Cálculo Financeiro",
    subItens: [
      "Regime de juros simples",
      "Taxas bruta, Taxas líquidas, juros bruto e líquido",
      "Taxas proporcionais e Regra de três simples",
      "Desconto racional (por dentro) e Desconto Comercial (por fora) simples",
      "Equivalência de Capitais e Vencimento Comum",
      "Títulos públicos",
      "Regime de juros compostos",
      "Desconto racional composto (financeiro) e Desconto Comercial composto",
      "Taxas equivalentes e Taxas Nominais",
      "Equivalência de Capitais e Vencimento Comum",
      "Rendas ou séries uniformes",
      "Rendas diferidas de amortização",
      "Rendas diferidas de acumulação",
      "Rendas ou séries imediatas antecipadas",
    ],
    valor: "3000",
    imagem: "/images/guiaCalculoFinanceiro.png",
  },
];
