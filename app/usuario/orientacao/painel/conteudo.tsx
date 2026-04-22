"use client";

import LoadingPage from "@/components/LoadingPage";
import { infoOrientacao } from "@/services/userService";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [disponibilidade, setDisponibilidade] = useState<any[]>([]);
  const [orientacoes, setOrientacoes] = useState<infoOrientacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");

  // ================================
  // 📌 DISPONIBILIDADE - AÇÕES
  // ================================
  const handleDisponibilidade = async (acao: string, id: number) => {
    setLoading(true);
    if (acao === "delete") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/disponibilidade/${id}`,
        { method: "DELETE" },
      );
    }

    if (acao === "toggle") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/disponibilidade/${id}`,
        {
          method: "PATCH",
        },
      );
    }

    fetchDisponibilidade();
  };

  // ================================
  // 📌 ORIENTAÇÃO - AÇÕES
  // ================================
  const handleOrientacao = async (acao: string, id: number) => {
    await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/estudante`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ estado: acao, inputId: id }),
      },
    );

    fetchOrientacoes();
  };

  // ================================
  // 📌 FETCH DISPONIBILIDADE
  // ================================
  const fetchDisponibilidade = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/disponibilidade`,
    );

    const data = await res.json();
    setDisponibilidade(data);
    setLoading(false);
  };

  // ================================
  // 📌 FETCH ORIENTAÇÕES
  // ================================

  const fetchOrientacoes = async () => {
    setLoading(false);
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("estado", estado.toString());
    params.append("situacao", "aprovado");

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientacao?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    const data = await res.json();

    setOrientacoes(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchDisponibilidade();
    fetchOrientacoes();
  }, []);

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto space-y-6 ">
        {/* ============================= */}
        {/* HEADER */}
        {/* ============================= */}

        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-3xl font-bold text-gray-800">
            Painel de Orientação
          </h1>
          <div>
            <Link
              href="/usuario/orientacao/painel/materiais"
              className="bg-gray-500 text-white p-4 mx-2   rounded-xl hover:bg-gray-800"
            >
              Gerir Materiais
            </Link>
            <Link
              href="/usuario/orientacao/painel/trabalhos"
              className="bg-gray-500   text-white  p-4  mx-2 rounded-xl hover:bg-gray-800"
            >
              Gerir Trabalhos
            </Link>
          </div>
        </div>

        {/* ============================= */}
        {/* 👨‍🎓 ORIENTAÇÕES */}
        {/* ============================= */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="text-xl font-bold">Lista de Estudantes</h2>
            <p className="text-sm text-gray-500">
              Cada dia corresponde a 1 sessão. As sessões são distribuídas por
              semanas.
            </p>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Formato</th>
                <th className="p-4 text-left">Total de Sessões</th>
                <th className="p-4 text-left">Datas de Sessões</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>

            <tbody>
              {orientacoes.map((o) => {
                const totalSessoes = o.Sessoes.length;

                return (
                  <tr key={o.id} className="border-t hover:bg-gray-50">
                    {/* NOME */}
                    <td className="p-4 font-medium">
                      {o.Estudante.primeiro_nome} {o.Estudante.segundo_nome}
                    </td>

                    {/* FORMATO */}
                    <td className="p-4 capitalize">{o.formato}</td>

                    {/* SESSÕES */}
                    <td className="p-4">{totalSessoes}</td>

                    {/* DATAS (NOVO MODELO) */}
                    <td className="p-4">
                      <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-2">
                        {o.Sessoes?.map((d: any, i: number) => {
                          const data = new Date(d.sessao);

                          const diaSemana = data.toLocaleDateString("pt-PT", {
                            weekday: "long",
                          });

                          const dataFormatada = data.toLocaleDateString(
                            "pt-PT",
                            {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            },
                          );

                          return (
                            <div
                              key={i}
                              className="flex items-center justify-between bg-gray-50 border rounded-lg px-3 py-2 hover:shadow-sm transition"
                            >
                              {/* DATA */}
                              <div>
                                <p className="text-sm font-medium text-gray-800 capitalize">
                                  {diaSemana}
                                </p>

                                <p className="text-xs text-gray-500">
                                  {dataFormatada}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </td>

                    {/* VALOR */}
                    <td className="p-4 font-medium">{o.valor},00kz</td>

                    {/* ESTADO */}
                    <td className="p-4">
                      <span
                        className={`block text-center p-2  text-sm ${
                          o.estado
                            ? "bg-green-100  text-green-700"
                            : "bg-red-100  text-red-700"
                        }`}
                      >
                        {o.estado ? "Dando Orientação" : "Orientação Terminada"}
                      </span>
                    </td>

                    {/* AÇÃO */}
                    <td className="p-4">
                      <select
                        onChange={(e) => handleOrientacao(e.target.value, o.id)}
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option>---</option>

                        <option value="restaurar">Restaurar orientação</option>
                        <option value="terminar">Terminar orientação</option>
                        {/*<option value="eliminar">Apagar orientação</option> */}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="p-4 flex justify-between items-center mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Anterior
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>

        {/* ============================= */}
        {/* 📅 DISPONIBILIDADE DO ORIENTADOR */}
        {/* ============================= */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-xl font-bold">Minha Disponibilidade</h2>

            <Link
              href="/usuario/orientacao/painel/disponibilidade"
              className="bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700"
            >
              Adicionar
            </Link>
          </div>

          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-left">Formato</th>
                <th className="p-4 text-left">Duração</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>

            <tbody>
              {disponibilidade.map((d) => {
                const data = new Date(d.data_sessao);

                const diaSemana = data.toLocaleDateString("pt-PT", {
                  weekday: "long",
                });

                const dataFormatada = data.toLocaleDateString("pt-PT", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <tr key={d.id} className="border-t hover:bg-gray-50">
                    {/* DATA */}
                    <td className="p-4">
                      <div>
                        <p className="font-medium capitalize">{diaSemana}</p>
                        <p className="text-xs text-gray-500">{dataFormatada}</p>
                      </div>
                    </td>

                    {/* FORMATO */}
                    <td className="p-4 capitalize">{d.formato}</td>

                    {/* DURAÇÃO */}
                    <td className="p-4">
                      <span className="text-sm">
                        {d.formato === "Online" ? "1h30" : "2h30"}
                      </span>
                    </td>

                    {/* ESTADO */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          d.estado
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        {d.estado ? "Activo" : "Inactivo"}
                      </span>
                    </td>

                    {/* OPERAÇÃO */}
                    <td className="p-4">
                      <select
                        onChange={(e) =>
                          handleDisponibilidade(e.target.value, d.id)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        <option>---</option>
                        <option value="toggle">Activar/Desactivar</option>
                        <option value="delete">Eliminar</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="border-t">
          <p className="text-sm text-gray-500 wrap border-b">
            No âmbito da prestação e contas, serão retidos 30% dos serviços
            realizados, exceptuando os materias de orientação feitos até a
            sua completude, em conformidade com os parâmetros.
          </p>
        </div>
      </div>
    </div>
  );
}
