"use client";

import React from "react";
import { Formula } from "@/components/math/Formula";
import TabelaCard from "../provas/contabilidade2/TabelaCard";

interface Opcao {
  texto: any;
  correta: boolean;
}

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
  tipo: string;
  enunciado: string;
  formula?: string;
  subitens?: string[];
  opcoes: Opcao[];
  tabela?: TabelaQuestao
}

interface ResultadoProvaProps {
  notaFinal: number;
  detalhes: ItemDetalhes[];
  questoes: Questao[];
}

const ResultadoProva: React.FC<ResultadoProvaProps> = ({
  notaFinal,
  detalhes,
  questoes,
}) => {
  const status =
    notaFinal >= 14
      ? { texto: "Aprovado", cor: "text-green-600" }
      : { texto: "Exame", cor: "text-red-600" };

  return (
    <div id="container" className="max-w-5xl mx-auto p-6 bg-gray-50 min-h-screen space-y-6">
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

      {/* Questões */}
      {detalhes.map((item) => {
        const questao = questoes.find((q) => q.id === item.questaoId);
        if (!questao) return null;

        const opcoes = Array.isArray(questao.opcoes) ? questao.opcoes : [];
        const detalhesSafe = Array.isArray(item.detalhes) ? item.detalhes : [];

        // Normalização segura dos detalhes
        const detalhesNormalizados =
          detalhesSafe.length === opcoes.length
            ? detalhesSafe
            : opcoes.length === 1
              ? [detalhesSafe[0]]
              : detalhesSafe;

        return (
          <section
            key={item.questaoId}
            className="bg-white shadow rounded p-6 space-y-4"
          >
            {/* Cabeçalho da questão */}
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="font-semibold text-lg">
                Questão {item.questaoId}
              </h2>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                Nota: {item.nota}
              </span>
            </div>

            {/* Enunciado */}
            <p className="text-gray-800">{questao.enunciado}</p>

            {questao.tabela && <TabelaCard tabela={questao.tabela} />}

            {questao.formula && <Formula latex={questao.formula} />}

            {/* Alternativas */}
            <ul className="space-y-2">
              {opcoes.map((alt, index) => {
                const det =
                  opcoes.length === 1
                    ? detalhesNormalizados[0] // QUESTÃO ÚNICA
                    : detalhesNormalizados[index]; // QUESTÃO MÚLTIPLA

                const detFinal = det ?? {
                  marcada: true,
                  correta: alt.correta,
                };

                const acertou = detFinal.marcada && detFinal.correta;

                let bgClass = "bg-gray-50 border-gray-200";
                let badge: string | null = null;

                if (detFinal?.marcada && acertou) {
                  bgClass = "bg-green-100 border-green-400";
                  badge = "✓ Correta";
                } else if (detFinal?.marcada && !acertou) {
                  bgClass = "bg-red-100 border-red-400";
                  badge = "✗ Errada";
                } else if (!detFinal?.marcada && detFinal?.correta) {
                  bgClass = "bg-yellow-100 border-yellow-400";
                  badge = "Resposta correta";
                }

                return (
                  <li
                    key={index}
                    className={`p-3 rounded border flex justify-between items-center ${bgClass}`}
                  >
                    <Formula latex={alt.texto} />
                    {badge && (
                      <span className="text-xs font-semibold text-gray-700">
                        {badge}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
};

export default ResultadoProva;
