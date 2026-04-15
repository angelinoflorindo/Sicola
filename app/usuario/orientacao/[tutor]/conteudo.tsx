"use client";

import { useState } from "react";

const diasSemana = ["segunda", "terca", "quarta", "quinta", "sexta"];

const MATERIAL_PRECO = 3000;

function calcularPreco(formato: string, sessoes: number) {
  if (formato === "online") {
    if (sessoes <= 9) return sessoes * 2000;
    return sessoes * 1500;
  }

  if (formato === "presencial") {
    return sessoes * 5000;
  }

  return 0;
}

export default function Conteudo() {
  const [formato, setFormato] = useState("online");
  const [sessoes, setSessoes] = useState(1);
  const [dias, setDias] = useState<string[]>([]);
  const [nome, setNome] = useState("");
  const [loading, setLoading] = useState(false);

  const toggleDia = (dia: string) => {
    if (dias.includes(dia)) {
      setDias(dias.filter((d) => d !== dia));
    } else {
      setDias([...dias, dia]);
    }
  };

  const diasSelecionados = dias.length;
  const semanas = Math.ceil(sessoes / (diasSelecionados || 1));

  const valorBase = calcularPreco(formato, sessoes);
  const total = valorBase + MATERIAL_PRECO;

  const erro = diasSelecionados > sessoes;

  const handleSubmit = async () => {
    if (!nome) {
      alert("Informe o seu nome");
      return;
    }

    if (diasSelecionados === 0) {
      alert("Escolha pelo menos um dia");
      return;
    }

    if (erro) {
      alert("Número de sessões insuficiente para os dias escolhidos");
      return;
    }

    setLoading(true);

    await fetch("/api/orientacao", {
      method: "POST",
      body: JSON.stringify({
        estudanteNome: nome,
        formato,
        sessoes,
        dias,
      }),
    });

    setLoading(false);
    alert("Orientação marcada com sucesso!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow space-y-6">

        {/* TÍTULO */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Marcar Orientação
          </h1>
          <p className="text-sm text-gray-500">
            Cada dia corresponde a 1 sessão. As sessões são distribuídas por semanas.
          </p>
        </div>

        {/* NOME */}
        <div>
          <label className="text-sm font-medium">Nome completo</label>
          <input
            placeholder="Digite o seu nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* FORMATO */}
        <div>
          <label className="text-sm font-medium">Formato</label>
          <select
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            className="w-full border p-2 rounded mt-1"
          >
            <option value="online">Online (1h30)</option>
            <option value="presencial">Presencial (2h30)</option>
          </select>
        </div>

        {/* SESSÕES */}
        <div>
          <label className="text-sm font-medium">Número de sessões</label>
          <input
            type="number"
            min={1}
            value={sessoes}
            onChange={(e) => setSessoes(Number(e.target.value))}
            className="w-full border p-2 rounded mt-1"
          />
        </div>

        {/* DIAS */}
        <div>
          <label className="text-sm font-medium">
            Escolha os dias da semana
          </label>

          <div className="flex gap-2 flex-wrap mt-2">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`px-4 py-2 rounded-lg text-sm transition ${
                  dias.includes(dia)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        {/* RESUMO */}
        <div className="bg-gray-100 p-4 rounded-xl space-y-1">
          <p><strong>Dias por semana:</strong> {diasSelecionados}</p>
          <p><strong>Duração:</strong> {semanas} semanas</p>

          {erro && (
            <p className="text-red-500 text-sm">
              ⚠ Sessões insuficientes para os dias escolhidos
            </p>
          )}

          <hr className="my-2" />

          <p>Valor base: {valorBase} Kz</p>
          <p>Material: {MATERIAL_PRECO} Kz</p>
          <p className="font-bold text-lg">Total: {total} Kz</p>
        </div>

        {/* BOTÃO */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {loading ? "Processando..." : "Confirmar Orientação"}
        </button>
      </div>
    </div>
  );
}