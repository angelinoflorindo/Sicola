"use client";
import LoadingPage from "@/components/LoadingPage";
import { PagamentoInfo, UserPerfonal } from "@/services/userService";
import { useState, useEffect } from "react";

type infoOrientacao = {
  id: any;
  valor: any;
  filename: string;
  formato: string;
  situacao: any;
  Estudante: UserPerfonal;
  createdAt: any;
  updatedAt: any;
};

export default function Conteudo() {
  const [orientacoes, setOrientacoes] = useState<infoOrientacao[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");

  const [loading, setLoading] = useState(true);

  const handleChange = async (acao: string, id: number) => {
    setLoading(true);
    if (acao === "delete") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientacao/${id}`,
        { method: "DELETE" },
      );
    }

    if (acao === "baixar") {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientacao/${id}`,
      );

      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `recibo_${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    }

    if (acao === "toggle") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientacao/${id}`,
        {
          method: "PATCH",
        },
      );
    }

    fetchData();
  };

  const fetchData = async () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("estado", estado.toString());

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_URL
      }/api/orientacao?${params.toString()}`,
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
    fetchData();
  }, [page]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Gestão de Orientações
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-left">Nome Completo</th>
                <th className="p-4 text-left">Modalidade</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Situação</th>
                <th className="p-4 text-left">Baixar Recibo</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {orientacoes.map((o, index) => (
                <tr key={o.id} className="border-t hover:bg-gray-50 transition">
                  <td className="p-4">{o.createdAt.split("T")[0]}</td>
                  <td className="p-4 font-medium">
                    {o.Estudante.primeiro_nome} {o.Estudante.segundo_nome}
                  </td>
                  <td className="p-4 font-medium">{o.formato}</td>
                  <td className="p-4 font-medium">{o.valor},00Kz</td>
                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      {o.situacao}
                    </span>
                  </td>
                  <td
                    onClick={() => handleChange("baixar", o.id)}
                    className=" cursor text-sm"
                  >
                    <span className="bg-green-600 p-2 rounded  text-white cursor  ">
                      Baixar{" "}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleChange(e.target.value, o.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      <option value="toggle"> Aprovar/Rejeitar</option>
                      <option value="delete">Eliminar</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between items-center mt-4">
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
      </div>
    </div>
  );
}
