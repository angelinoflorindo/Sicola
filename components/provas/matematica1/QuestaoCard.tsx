// components/Prova/QuestaoCard.tsx
'use client';

import { MathJax } from 'better-react-mathjax';

export function QuestaoCard({ questao, onChange }: any) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">
          Questão {questao.id}
        </h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {questao.cotacao} valores
        </span>
      </div>

      <p className="text-gray-800">{questao.enunciado}</p>

      {questao.subitens && (
        <ul className="list-disc pl-6 text-sm text-gray-700">
          {questao.subitens.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

      {/* ⚠️ USAR DISPLAY MODE PARA FÓRMULAS */}
      {questao.formula && (
        <MathJax dynamic>
          {`$$
          ${questao.formula}
          $$`}
        </MathJax>
      )}

      <textarea
        className="w-full border rounded-md p-3 min-h-[120px]"
        placeholder="Digite a sua resposta..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
