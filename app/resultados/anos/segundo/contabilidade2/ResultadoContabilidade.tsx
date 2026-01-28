"use client";

import React from "react";
import { Formula } from "@/components/math/Formula";
import TabelaCard from "@/components/provas/contabilidade2/TabelaCard";
import PrimeiroResultado from "./PrimeiroResultado";
import SegundoResultado from "./SegundoResultado";

interface Detalhe {
  marcada: boolean;
  correta: boolean;
}

interface ItemDetalhes {
  questaoId: number;
  nota: number;
  respostaAluno: string | boolean[];
  detalhes: Detalhe[];
}

interface TabelaQuestao {
  cabecalho: string[];
  subcabecalho?: string[];
  dados: (string | number)[][];
}
interface Questao {
  id: number;
  tipo?: string;
  enunciado: string;
  subitens?: string[];
  opcoes?: any[];
  tabela?: TabelaQuestao;
}

interface ResultadoContabilidadeProps {
  notaFinal: number;
  detalhes: ItemDetalhes[];
  primeiraQuestoes: any[];
  segundaQuestoes: any[];
}

const ResultadoContabilidade: React.FC<ResultadoContabilidadeProps> = ({
  notaFinal,
  detalhes,
  primeiraQuestoes,
  segundaQuestoes,
}) => {
  const status =
    notaFinal >= 14
      ? { texto: "Aprovado", cor: "text-green-600" }
      : { texto: "Exame", cor: "text-red-600" };

  return (
    <div className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen space-y-6">
      {/* Cabeçalho */}
      <header className="bg-white shadow rounded p-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Resultado da Prova</h1>
        <div className="text-right">
          <p className="text-lg">
            Nota Final:{" "}
            <span className="font-bold text-blue-600">{notaFinal}</span> / 20
          </p>
          <p className={`font-semibold ${status.cor}`}>{status.texto}</p>
        </div>
      </header>

      {/* Questões 1 */}

      {primeiraQuestoes.map((questao) => (
        <PrimeiroResultado
          key={questao.id}
          questao={questao}
          detalhes={detalhes}
        />
      ))}

      {/* Questões 2 */}
      {segundaQuestoes.map((questao) => (
        <SegundoResultado
          key={questao.id}
          questao={questao}
          detalhes={detalhes}
        />
      ))}
    </div>
  );
};

export default ResultadoContabilidade;
