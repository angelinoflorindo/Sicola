"use client";

import { useState } from "react";

const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta"];

export default function Conteudo() {
  const [dias, setDias] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleDia = (dia: string) => {
    if (dias.includes(dia)) {
      setDias(dias.filter((d) => d !== dia));
    } else {
      setDias([...dias, dia]);
    }
  };

  const salvar = async () => {
    if (dias.length === 0) {
      alert("Escolha pelo menos um dia");
      return;
    }

    setLoading(true);

    await fetch("/api/disponibilidade", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dias,
        regra: "1_dia_1_sessao",
      }),
    });

    setLoading(false);
    alert("Disponibilidade salva com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-lg w-full bg-white rounded-2xl shadow p-6 space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Definir Disponibilidade
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Cada dia selecionado corresponde a 1 sessão de orientação.
            O sistema distribui automaticamente por semanas.
          </p>
        </div>

        {/* INFO BOX */}
        <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
          ✔ 1 dia = 1 sessão  
          ✔ O estudante escolhe sessões e dias  
          ✔ O sistema organiza automaticamente
        </div>

        {/* SELEÇÃO DE DIAS */}
        <div>
          <h2 className="text-sm font-semibold mb-2 text-gray-700">
            Dias disponíveis
          </h2>

          <div className="flex flex-wrap gap-2">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  dias.includes(dia)
                    ? "bg-green-600 text-white shadow"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        {/* RESUMO */}
        <div className="bg-gray-100 p-3 rounded-lg text-sm">
          <p><strong>Dias selecionados:</strong> {dias.length}</p>
          <p><strong>Sessões disponíveis por semana:</strong> {dias.length}</p>
        </div>

        {/* BOTÃO */}
        <button
          onClick={salvar}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Salvando..." : "Salvar Disponibilidade"}
        </button>
      </div>
    </div>
  );
}