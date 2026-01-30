import LoadingPage from "@/components/LoadingPage";
import { Formula } from "@/components/math/Formula";
import { useEffect, useState } from "react";

export function QuestaoCard({ questao, changeInput, changeSelect }: any) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!ready) return <LoadingPage />;
  return (
    <div id="container" className="bg-white rounded-xl shadow p-6 space-y-4">
      <div className="flex justify-between">
        <h2 className="font-bold">Questão {questao.id}</h2>
        <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
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

      {/* QUESTÃO ÚNICA */}
      {(questao.tipo === "UNICA") && (
        <div className="space-y-2">
          {questao.opcoes.map((o: any, i: number) => (
            <label key={i} className="flex gap-2 items-center">
              <input
                type="radio"
                name={`q-${questao.id}`}
                onChange={() => changeInput(o.texto)}
              />
              {o.texto && <Formula latex={o.texto}/> }
            </label>
          ))}
        </div>
      )}

      {/* QUESTÃO MULTIPLA */}
      {questao.tipo === "MULTIPLA" && (
        <div className="space-y-3">
          {questao.opcoes.map((s: any, i: number) => (
            <div key={i} className="flex justify-between">
              {s.texto && <Formula latex={s.texto}/> }
              <select onChange={(e) => changeSelect(i, e.target.value === "true")}>
                <option value="">---</option>
                <option value="true">Certa</option>
                <option value="false">Errada</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
