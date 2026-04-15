"use client";

import LoadingPage from "@/components/LoadingPage";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [disponibilidade, setDisponibilidade] = useState<any[]>([]);
  const [orientacoes, setOrientacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ================================
  // 📌 AÇÕES DISPONIBILIDADE
  // ================================
  const handleDisponibilidade = async (acao: string, id: number) => {
    if (acao === "delete") {
      await fetch(`/api/disponibilidade/${id}`, { method: "DELETE" });
    }

    if (acao === "toggle") {
      await fetch(`/api/disponibilidade/toggle/${id}`, {
        method: "PATCH",
      });
    }

    fetchDisponibilidade();
  };

  // ================================
  // 📌 AÇÕES ORIENTAÇÃO
  // ================================
  const handleOrientacao = async (acao: string, id: number) => {
    await fetch(`/api/orientacao/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ estado: acao }),
    });

    fetchOrientacoes();
  };

  // ================================
  // 📌 FETCH
  // ================================
  const fetchDisponibilidade = async () => {
    const res = await fetch("/api/disponibilidade");
    const data = await res.json();
    setDisponibilidade(data);
  };

  const fetchOrientacoes = async () => {
    const res = await fetch("/api/orientacao");
    const data = await res.json();
    setOrientacoes(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDisponibilidade();
    fetchOrientacoes();
  }, []);

  

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Painel de Orientação
        </h1>

        {/* ============================= */}
        {/* 👨‍🎓 ORIENTAÇÕES */}
        {/* ============================= */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-3 border-b">
            <h2 className="text-xl font-bold">Lista de Estudantes</h2>
            <p className="text-sm text-gray-500">
              Cada dia corresponde a 1 sessão. As sessões são distribuídas por semanas.
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Formato</th>
                <th className="p-4 text-left">Sessões</th>
                <th className="p-4 text-left">Dias</th>
                <th className="p-4 text-left">/ Semana</th>
                <th className="p-4 text-left">Duração</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>

            <tbody>
              {orientacoes.map((o) => {
                const diasSemana = o.dias?.length || 0;
                const semanas = Math.ceil(o.sessoes / (diasSemana || 1));
                const erro = diasSemana > o.sessoes;

                return (
                  <tr key={o.id} className="border-t hover:bg-gray-50">
                    <td className="p-4">{o.estudanteNome}</td>

                    <td className="p-4 capitalize">{o.formato}</td>

                    <td className="p-4">
                      {o.sessoes} sessões
                    </td>

                    <td className="p-4">
                      {o.dias?.join(", ")}
                    </td>

                    <td className="p-4">
                      {diasSemana}x / semana
                    </td>

                    <td className="p-4 font-medium">
                      {semanas} semanas
                      {erro && (
                        <div className="text-red-500 text-xs">
                          ⚠ sessões insuficientes
                        </div>
                      )}
                    </td>

                    <td className="p-4 font-medium">
                      {o.valorTotal} kz
                    </td>

                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          o.estado === "pendente"
                            ? "bg-yellow-100 text-yellow-700"
                            : o.estado === "aprovar"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {o.estado}
                      </span>
                    </td>

                    <td className="p-4">
                      <select
                        onChange={(e) =>
                          handleOrientacao(e.target.value, o.id)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option>---</option>
                        <option value="aprovar">Aprovar</option>
                        <option value="rejeitar">Rejeitar</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ============================= */}
        {/* 📅 DISPONIBILIDADE */}
        {/* ============================= */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="text-xl font-bold">Disponibilidade</h2>

            <Link
              href={`/gestao/disponibilidade`}
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
            >
              adicionar
            </Link>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Dia</th>
                <th className="p-4 text-left">Formato</th>
                <th className="p-4 text-left">Duração</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>

            <tbody>
              {disponibilidade.map((d) => (
                <tr key={d.id} className="border-t hover:bg-gray-50">
                  <td className="p-4">{d.diaSemana}</td>

                  <td className="p-4 capitalize">{d.formato}</td>

                  <td className="p-4">
                    {d.formato === "online"
                      ? "1h30"
                      : "2h30"}
                  </td>

                  <td className="p-4">
                    {d.estado ? "Activo" : "Inactivo"}
                  </td>

                  <td className="p-4">
                    <select
                      onChange={(e) =>
                        handleDisponibilidade(
                          e.target.value,
                          d.id
                        )
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option>---</option>
                      <option value="toggle">
                        Activar/Desactivar
                      </option>
                      <option value="delete">Eliminar</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}