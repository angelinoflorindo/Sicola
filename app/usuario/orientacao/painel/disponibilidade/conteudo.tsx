"use client";

import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";
import { useState } from "react";

const diasSemana = [
  "Domingo",
  "Segunda",
  "Terca",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sabado",
];

// Converter semana ISO + dia → DATA REAL
function getDateFromWeek(weekStr: string, diaIndex: number) {
  const [ano, semana] = weekStr.split("-W").map(Number);

  const firstDayOfYear = new Date(ano, 0, 1);
  const daysOffset = (semana - 1) * 7;

  // ISO week começa na segunda (ajuste)
  const firstWeekDay = firstDayOfYear.getDay() || 7;
  const startOfWeek = new Date(firstDayOfYear);
  startOfWeek.setDate(firstDayOfYear.getDate() + daysOffset - firstWeekDay); // retirar +1

  const result = new Date(startOfWeek);
  result.setDate(startOfWeek.getDate() + diaIndex);

  return result;
}

export default function Conteudo() {
  const [dias, setDias] = useState<string[]>([]);
  const [formato, setFormato] = useState("Online");

  // MULTI-SEMANAS
  const [semanas, setSemanas] = useState<string[]>([]);
  const [semanaInput, setSemanaInput] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // ============================
  // 📌 Selecionar dias
  // ============================
  const toggleDia = (dia: string) => {
    if (dias.includes(dia)) {
      setDias(dias.filter((d) => d !== dia));
    } else {
      setDias([...dias, dia]);
    }
  };

  // ============================
  // 📌 Adicionar semana
  // ============================
  const addSemana = () => {
    if (!semanaInput) return;

    if (!semanas.includes(semanaInput)) {
      setSemanas([...semanas, semanaInput]);
    }

    setSemanaInput("");
  };

  // ============================
  //  Converter tudo para datas reais
  // ============================
  const gerarDatas = () => {
    let datas: Date[] = [];

    semanas.forEach((semana) => {
      dias.forEach((dia) => {
        const index = diasSemana.indexOf(dia);
        const data = getDateFromWeek(semana, index);
        datas.push(data);
      });
    });

    return datas;
  };

  // ============================
  // Salvar
  // ============================
  const salvar = async () => {
    if (dias.length === 0) {
      alert("Escolha dias");
      return;
    }

    if (semanas.length === 0) {
      alert("Adicione pelo menos uma semana");
      return;
    }

    const datas = gerarDatas();

    setLoading(true);

    try {
      
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/disponibilidade`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            formato,
            datas: datas.map((d) => d.toISOString()),
          }),
        },
      );
      router.push("/usuario/orientacao/painel");
    } catch {
      alert("Houve um erro. Tente novamente");
      router.push("/usuario/orientacao/painel/disponibilidade");
    }
  };

  if (loading) return <LoadingPage />;

  const datasPreview = gerarDatas();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow p-6 space-y-6">
        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Definir Disponibilidade
          </h1>
          <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg text-sm text-blue-700">
            ✔ 1 dia = 1 sessão ✔ Escolhe as sessões e semanas
          </div>
        </div>

        {/* SEMANA */}
        <div>
          <label className="text-sm font-semibold">Semana</label>

          <div className="flex gap-2 mt-1">
            <input
              type="week"
              value={semanaInput}
              onChange={(e) => setSemanaInput(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-2"
            />

            <button
              onClick={addSemana}
              className="bg-blue-600 text-white px-4 rounded-lg"
            >
              +
            </button>
          </div>

          {/* LISTA DE SEMANAS */}
          <div className="flex flex-wrap gap-2 mt-2">
            {semanas.map((s) => (
              <span
                key={s}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* DIAS */}
        <div>
          <h2 className="text-sm font-semibold mb-2">Dias</h2>

          <div className="flex flex-wrap gap-2">
            {diasSemana.map((dia) => (
              <button
                key={dia}
                onClick={() => toggleDia(dia)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  dias.includes(dia) ? "bg-green-600 text-white" : "bg-gray-200"
                }`}
              >
                {dia}
              </button>
            ))}
          </div>
        </div>

        {/* FORMATO */}
        <div className="flex gap-2">
          {["Online", "Presencial", "Ambas"].map((tipo) => (
            <button
              key={tipo}
              onClick={() => setFormato(tipo)}
              className={`px-4 py-2 rounded-lg ${
                formato === tipo ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {tipo}
            </button>
          ))}
        </div>

        {/* ========================= */}
        {/* 📅 PREVIEW DAS DATAS */}
        {/* ========================= */}
        <div className="bg-gray-50 border rounded-xl p-4">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            Datas disponíveis
          </p>

          {/* LISTA */}
          <div className="max-h-60 overflow-y-auto space-y-2 pr-2">
            {datasPreview.length === 0 ? (
              <p className="text-sm text-gray-400">Nenhuma data gerada ainda</p>
            ) : (
              datasPreview.map((d, i) => {
                const data = new Date(d);

                const diaSemana = data.toLocaleDateString("pt-PT", {
                  weekday: "long",
                });

                const dataFormatada = data.toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white border rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition"
                  >
                    {/* DIA + DATA */}
                    <div>
                      <p className="text-sm font-medium text-gray-800 capitalize">
                        {diaSemana}
                      </p>
                      <p className="text-xs text-gray-500">{dataFormatada}</p>
                    </div>

                    {/* BADGE */}
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      sessão
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* BOTÃO */}
        <button
          onClick={salvar}
          className="w-full bg-blue-600 text-white py-3 rounded-xl"
        >
          Salvar Disponibilidade
        </button>
      </div>
    </div>
  );
}
