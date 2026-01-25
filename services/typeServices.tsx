

// --- Types ---
export interface Opcao {
  texto: string;       // Texto da alternativa em LaTeX
  correta: boolean;
}

export interface Questao {
  id: number;
  tipo: "UNICA" | "MULTIPLA";
  cotacao: number;
  enunciado: string;
  formula?: string;       // Fórmula da questão
  subitens?: string[];
  opcoes: Opcao[];
}

export interface Detalhe {
  marcada: boolean;   // O aluno marcou a alternativa?
  correta: boolean;   // Esta alternativa é correta?
  acertou: boolean;   // O aluno acertou nesta alternativa?
}

export interface ItemDetalhes {
  questaoId: number;
  nota: number;
  detalhes?: Detalhe[];
}

export interface ResultadoProvaProps {
  notaFinal: number;
  detalhes: ItemDetalhes[];
  questoes: Questao[];
}
