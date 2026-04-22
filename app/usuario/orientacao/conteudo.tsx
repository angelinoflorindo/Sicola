"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import { OrientadorInfo } from "@/services/userService";

export default function Conteudo() {
  const [orientadores, setOrientadores] = useState<OrientadorInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");

  const fetchData = async () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("estado", estado.toString());

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false); 
    const data = await res.json();

    setOrientadores(data.data);
    setTotalPages(data.totalPages);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if(loading) return <LoadingPage/>
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* ===== PERFIL / CARD PRINCIPAL ===== */}
      <section>
        <div className="px-4 py-8=4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* ❌ SEM ORIENTADORES */}
          {!loading && orientadores.length === 0 && (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">
                Ainda não existem orientadores disponíveis.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                Seja o primeiro a candidatar-se
              </p>
            </div>
          )}

          {/* ✅ COM ORIENTADORES → mantém teu layout */}
          {!loading &&
            orientadores.length > 0 &&
            orientadores.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition p-6 flex flex-col items-center text-center"
              >
                <Image
                  src={
                    item.filename === "N/D"
                      ? "/candidatos/candidate.png"
                      : `/candidatos/${item.filename}`
                  }
                  alt="perfil indisponível"
                  width={120}
                  height={120}
                  className="rounded-full object-cover mb-4"
                />

                <h3 className="font-semibold text-lg text-gray-800">
                  {item.primeiro_nome} {item.segundo_nome}
                </h3>
                <p className="text-xs text-gray-800 mb-2">
                   {"Universidade"} -  {item.Universidade.codigo}
                </p>

                <p className=" text-gray-500 mb-2">
                  ------------- Disciplinas -------------
                </p>
                {item.UserDisciplina.map((disp, i) => (
                  <p key={disp.id} className="text-xs text-gray-500 mb-2">
                    {disp.Disciplina.nome}
                  </p>
                ))}

                <Link
                  href={`/usuario/orientacao/${item.id}`}
                  className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition font-medium"
                >
                  Consultar
                </Link>
              </div>
            ))}
        </div>

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
      </section>

      {/* ===== CTA ORIENTADOR ===== */}
      <section className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 md:p-10 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Imagem */}
          <div className="flex justify-center">
            <Image
              src="/images/aderirOrientacao.gif"
              alt="orientação"
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          {/* Texto */}
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Torne-se orientador
            </h2>

            <p className="text-gray-600">
              Partilhe o seu conhecimento e ajude outros estudantes a evoluir
              academicamente enquanto constrói a sua reputação.
            </p>

            <ul className="text-sm text-gray-700 space-y-1">
              <li>✔ Escolha a disciplina que domina</li>
              <li>✔ Adicione uma foto profissional</li>
              <li>✔ Explique como pode ajudar</li>
            </ul>

            <Link
              href={`/usuario/orientacao/aderir`}
              className="inline-block bg-blue-600 text-white py-2 px-6 rounded-xl hover:bg-blue-700 transition font-medium"
            >
              Começar agora
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
