"use client";
import LoadingPage from "@/components/LoadingPage";
import { DisciplinaProsps } from "@/services/typeServices";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [Disciplinas, setDisciplinas] = useState<DisciplinaProsps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [order, setOrder] = useState("");
  const router = useRouter()

  const [loading, setLoading] = useState(true);

  const handleAcao = async (acao: string, id: number) => {
    switch (acao) {
      case "eliminar":
        await fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/disciplina/gerir/${id}`,
          {
            method: "DELETE",
          },
        );
        setLoading(true);
        fetchData();
        break;
        case "editar":
          router.push(`/gestao/disciplina/${id}`)
          setLoading(true)
        break;
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

    if (order) params.append("order", order);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_URL
      }/api/disciplina/gerir?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    const data = await res.json();

    setDisciplinas(data.data);
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
          Gestão de Disciplinas
        </h1>

        <Link
          href={`/gestao/disciplina/registar`}
          className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
        >
          registar
        </Link>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Data</th>
                <th className="p-4 text-left">Nome</th>
                <th className="p-4 text-left">Código</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Universidade</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {Disciplinas.map((dep, index) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{dep.createdAt.split("T")[0]}</td>
                  <td className="p-4 font-medium">{dep.nome}</td>
                  <td className="p-4 font-medium">{dep.codigo}</td>

                  <td className="p-4">
                    <span className="px-3 py-1 rounded-full text-sm bg-yellow-100 text-yellow-700">
                      {dep.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="p-4 font-medium">---</td>

                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>

                      <option value="editar"> Editar</option>

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
