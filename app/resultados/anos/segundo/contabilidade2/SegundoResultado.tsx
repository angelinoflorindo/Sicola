"use client";

import React from "react";
import TabelaCard from "@/components/provas/contabilidade2/TabelaCard";


interface SegundoResultadoProps {
   questao: any;
   detalhes:any[]
}

const SegundoResultado: React.FC<SegundoResultadoProps> = ({
  questao,
  detalhes,
}) => {
  const detalhe =
    detalhes.find((d) => d.questaoId === questao.id) ?? {
      questaoId: questao.id,
      nota: 0,
      respostaAluno: null,
      detalhes: [],
    };

  const opcoes = Array.isArray(questao.opcoes)
    ? questao.opcoes
    : [];

  const detalhesSafe = Array.isArray(detalhe.detalhes)
    ? detalhe.detalhes
    : [];

  const detalhesNormalizados =
    detalhesSafe.length === opcoes.length
      ? detalhesSafe
      : opcoes.length === 1
        ? [detalhesSafe[0]]
        : detalhesSafe;

  return (
    <section className="bg-white shadow rounded p-6 space-y-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center border-b pb-2">
        <h2 className="font-semibold text-lg">
          Questão {questao.id}
        </h2>
        <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
          Nota: {detalhe.nota}
        </span>
      </div>

      {/* Enunciado */}
      <p>{questao.enunciado}</p>

      {questao.tabela && <TabelaCard tabela={questao.tabela} />}

      {/* Opções / Correção */}
      <ul className="space-y-2">
        {opcoes.map((alt:any, index:any) => {
          const det =
            opcoes.length === 1
              ? detalhesNormalizados[0]
              : detalhesNormalizados[index];

          const marcada = det?.marcada ?? false;
          const correta = alt.correta;

          let bg = "bg-gray-50 border-gray-200";
          let badge = null;

          if (marcada && correta) {
            bg = "bg-green-100 border-green-400";
            badge = "✓ Correta";
          } else if (marcada && !correta) {
            bg = "bg-red-100 border-red-400";
            badge = "✗ Errada";
          } else if (!marcada && correta) {
            bg = "bg-yellow-100 border-yellow-400";
            badge = "Resposta correta";
          }

          return (
            <li
              key={index}
              className={`p-3 rounded border flex justify-between ${bg}`}
            >
               {alt.tabela && <TabelaCard tabela={alt.tabela} />}
              {badge && (
                <span className="text-xs font-semibold">{badge}</span>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
};


export default SegundoResultado