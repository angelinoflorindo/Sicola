"use client";
import LoadingPage from "@/components/LoadingPage";
import { UserPerfonal } from "@/services/userService";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [userIncome, setUserIncome] = useState<UserPerfonal[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState("");
  const [situacao, setSituacao] = useState("");
  const [order, setOrder] = useState("");

  const [loading, setLoading] = useState(true);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "aprovar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/gerir/${id}`,
        );
        setLoading(true);
        fetchData();
        break;
      case "rejeitar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/gerir/${id}`,
          {
            method: "PUT",
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
    params.append("estado", estado);
    params.append("situacao", situacao);

    if (order) params.append("order", order);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/gerir?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    const data = await res.json();

    setUserIncome(data.data);
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
          Gestão de Orientadores
        </h1>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Nome Completo</th> 
                <th className="p-4 text-left">telemovel</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Situação</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {userIncome.map((dep, index) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {dep.primeiro_nome} {dep.segundo_nome}
                  </td> 
                  <td className="p-4 font-medium">{dep.telemovel}</td>
                  <td className="p-4 font-medium">{dep.email}</td>

                  <td className="p-4">
                    {dep.perfil === "CANDIDATO" ? (
                      <div className="px-3 py-1 rounded bg-red-500 text-sm text-white">
                        Pendente{" "}
                      </div>
                    ) : dep.perfil == "ORIENTADOR" ? (
                      <div className="px-3 py-1 rounded bg-green-500 text-sm text-white">
                        Aprovado
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded bg-gray-100 text-sm text-black">
                        Normal
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      <option value="aprovar"> Aprovar</option>
                      <option value="rejeitar">Rejeitar</option>
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
