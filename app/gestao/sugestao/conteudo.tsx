"use client";
import LoadingPage from "@/components/LoadingPage";
import { SugestaoInfo } from "@/services/userService";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [sugestoes, setSugestoes] = useState<SugestaoInfo[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");

  const [loading, setLoading] = useState(true);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "eliminar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sugestao/${id}`,
          {
            method: "DELETE",
          },
        );
        setLoading(true);
        fetchData();

      default:
        break;
    }

    // Atualiza lista após ação
    setPage(1);
  };

  const fetchData = async () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("estado", estado.toString());

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/sugestao?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    const data = await res.json();

    setSugestoes(data.data);
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
          Sugestões & Reclamações
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-left">Nome Completo</th>
                <th className="p-4 text-left">Perfil</th>
                <th className="p-4 text-left">Descrição</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {sugestoes.map((dep, index) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{dep.createdAt.split("T")[0]}</td>
                  <td className="p-4 font-medium">
                    {dep.Usuario.primeiro_nome} {dep.Usuario.segundo_nome}
                  </td>
                  <td className="p-4 font-medium">{dep.Usuario.perfil}</td>
                  <td className="p-4 font-medium">{dep.descricao}</td>

                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      <option value="eliminar">Eliminar</option>
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
