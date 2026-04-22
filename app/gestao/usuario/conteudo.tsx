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
      case "eliminar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/gerir/${id}`,
          {
            method: "DELETE",
          },
        );
        setLoading(true);
        fetchData();
        break;
      case "normalizar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/gerir/${id}`,
        );
        setLoading(true);
        fetchData();
        break;
      case "suspender":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/gerir/${id}`,
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

  const filtrarUser = (acao: string) => {
    switch (acao) {
      case "online":
        setEstado("true");
        setSituacao("true");
        setLoading(true);
        break;
      case "offline":
        setEstado("false");
        setSituacao("true");
        setLoading(true);
        break;
      case "irregular":
        setSituacao("false");
        setEstado("true");
        setLoading(true);
        break;
      case "suspenso":
        setSituacao("false");
        setEstado("false");
        setLoading(true);

      default:
        break;
    }
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
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/gerir?${params.toString()}`,
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
  }, [page, estado, situacao]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Gestão de Usuários</h1>

        <div>
          <b>Filtrar usuários:</b>
          <select
            onChange={(e) => filtrarUser(e.target.value)}
            className="border rounded px-2 py-1 bg-white text-sm"
          >
            <option value="analisar"> - - - - </option>
            <option value="online"> Online e Normal</option>
            <option value="offline">Offline e Normal</option>
            <option value="suspenso">Suspenso e Offline</option>
            <option value="irregular">Suspenso e Online </option>
          </select>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Nome Completo</th> 
                <th className="p-4 text-left">telemovel</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Estado</th>
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
                    {dep.estado ? (
                      <div className="px-3 py-1 rounded bg-green-500 text-sm text-white">
                        Online{" "}
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded bg-black text-sm text-white">
                        Offline
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    {dep.situacao ? (
                      <div className="px-3 py-1 rounded bg-blue-500 text-sm text-white">
                        Normal{" "}
                      </div>
                    ) : (
                      <div className="px-3 py-1 rounded bg-red-500 text-sm text-white">
                        Suspenso
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      <option value="normalizar"> Normalizar</option>
                      <option value="suspender">Suspender</option>
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
