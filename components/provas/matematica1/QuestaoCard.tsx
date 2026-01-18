"use client";

import LoadingPage from "@/components/LoadingPage";
import { Formula } from "@/components/math/Formula";
import { useEffect, useState } from "react";

export function QuestaoCard({ questao, onChange }: any) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <LoadingPage />;

  return (
    <div className="bg-white border rounded-xl p-6 shadow space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Questão {questao.id}</h2>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {questao.cotacao} valores
        </span>
      </div>

      <p>{questao.enunciado}</p>

      {questao.subitens && (
        <ul className="list-disc pl-6">
          {questao.subitens.map((s: string, i: number) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}

      {questao.formula && <Formula latex={questao.formula} />}
      
      <textarea
        className="w-full border rounded-md p-3 min-h-[120px]"
        placeholder="Digite a sua resposta..."
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
