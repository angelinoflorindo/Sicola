"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";

export default function Conteudo() {
  const [ebooks, setEbooks] = useState<any[]>([]);

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [page, setPage] = useState(1);

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
      }/api/orientador/materiais?${params.toString()}`,
    );

    if (!res.ok) {
      router.replace("/dashboard");
    }

    setLoading(false);
    const data = await res.json();

    setEbooks(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Cabeçalho */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Materiais Acadêmicos
        </h1>
        <p className="text-gray-500 mt-2">
          Guias práticos e ebooks preparados para apoiar o seu desempenho
          académico.
        </p>
      </div>

      {/* ❌ SEM MATERIAS */}
      {!loading && ebooks.length === 0 && (
        <div className="col-span-full text-center py-10">
          <p className="text-gray-500 text-lg">
            Ainda não existem materiais disponíveis.
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Sujira uma disciplina par ter material!
          </p>
        </div>
      )}

      {/* Grid de ebooks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ebooks.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            {/* Capa */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={`/capas/${ebook.imagem}`}
                alt='capa do material'
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {ebook.titulo}
                </h2>
              </div>

              <Link
                href={`/usuario/materias/${ebook.codigo}`}
                className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>

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
  );
}
