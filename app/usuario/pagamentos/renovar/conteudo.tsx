"use client";
import React, { useState } from "react";

type PlanoType = "BASICO" | "PREMIUM" | "";

export default function Renovacao() {
  const [plano, setPlano] = useState<PlanoType>("");
  const [valor, setValor] = useState("0,00 kz");
  const [validade, setValidade] = useState("--");

  const mudarPlano = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPlano = event.target.value as PlanoType;
    setPlano(selectedPlano);

    if (selectedPlano === "BASICO") {
      setValor("1.000,00 kz");
      setValidade("1 dia");
    } else if (selectedPlano === "PREMIUM") {
      setValor("5.000,00 kz");
      setValidade("7 dias");
    } else {
      setValor("0,00 kz");
      setValidade("--");
    }
  };

  async function submitPagamento(e: React.FormEvent) {
    e.preventDefault();

    if (!plano) return;

    console.log({
      plano,
      valor,
      validade,
    });
  }

  return (
    <div className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Saiba como ter acesso
        </h1>

        <form onSubmit={submitPagamento} className="grid md:grid-cols-3 gap-6">
          {/* Plano */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-600 mb-2">Escolher o plano</p>

            <div className="relative">
              <select
                value={plano}
                onChange={mudarPlano}
                className="w-full appearance-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 pr-10 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              >
                <option value="">Selecione um plano</option>
                <option value="BASICO">Plano Básico (Diário)</option>
                <option value="PREMIUM">Plano Premium (Semanal)</option>
              </select>

              {/* Ícone seta */}
              <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-400">
                ▼
              </span>
            </div>
          </div>

          {/* Valor */}
          <div className="text-center bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-600">Valor a pagar</p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {valor}
            </p>
          </div>

          {/* Validade */}
          <div className="text-center bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-600">Validade</p>
            <p className="text-2xl font-semibold text-gray-800 mt-2">
              {validade}
            </p>
          </div>
          
        {/* Dados pagamento */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-600 leading-relaxed">
            Coordenadas para o pagamento <br />
            <b>Gestor</b>: Angelino Francisco <br />
            <b>IBAN</b>: 0040 0000 9926 0129 1013 0 <br />
            <b>Express</b>: +244 930 754 775
          </p>
        </div>

          {/* Botão */}
          <button
            type="submit"
            disabled={!plano}
            className="md:col-span-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition text-white px-6 py-3 rounded-xl font-medium"
          >
            Confirmar pagamento
          </button>
        </form>


        {/* Envio comprovativo */}
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <p className="text-gray-600 leading-relaxed">
            Faça o envio do comprovativo <br />
            <b>Email</b>: angelinodeveloper@gmail.com <br />
            <b>WhatsApp</b>: +244 930 754 775
          </p>
        </div>
      </div>
    </div>
  );
}
