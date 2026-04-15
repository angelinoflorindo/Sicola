"use client";
import LoadingPage from "@/components/LoadingPage";
import { DisciplinaProsps } from "@/services/typeServices";
import { useState, useEffect } from "react";
import OperacaoSucesso from "@/components/ui/operacaoSucesso";
import { useRouter } from "next/navigation";

export default function Conteudo() {
  const [Disciplinas, setDisciplinas] = useState<DisciplinaProsps[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [order, setOrder] = useState("");
  const [loading, setLoading] = useState(false);
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);

  // ✅ NOVOS STATES
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [foto, setFoto] = useState<File | null>(null);
  const [descricao, setDescricao] = useState("");
  const router = useRouter()

  const fetchData = async () => {
    const params = new URLSearchParams();
    params.append("page", page.toString());
    params.append("limit", "5");
    params.append("estado", estado.toString());

    if (order) params.append("order", order);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/disciplina/gerir?${params.toString()}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    const data = await res.json();
    setDisciplinas(data.data);
    setTotalPages(data.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  // ✅ SELECIONAR DISCIPLINAS
  function handleSelect(id: number) {
    setSelecionadas((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  // ✅ SUBMISSÃO
  async function handleSubmit() {
    try {
      const formData = new FormData();
      setLoading(true)

      formData.append("descricao", descricao);
      formData.append("disciplinas", JSON.stringify(selecionadas));

      if (foto) {
        formData.append("foto", foto);
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Erro ao submeter");
      
      setLoading(false)
      setOperacaoSucesso(true)
      router.push('/dashboard')
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar candidatura");
      router.push('/usuario/orientacao/aderir')
    }
  }

  if (loading) return <LoadingPage />;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      
      {operacaoSucesso && <OperacaoSucesso />}
      <div className="max-w-5xl mx-auto space-y-8">

        {/* Título */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800">
            Torne-se um orientador
          </h2>
          <p className="text-gray-500 mt-1">
            Escolha as disciplinas que domina e partilhe o seu conhecimento
          </p>
        </div>

        {/* Card principal */}
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">

          {/* Tabela */}
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm uppercase tracking-wide">
              <tr>
                <th className="p-4 text-left">Selecionar</th>
                <th className="p-4 text-left">Disciplina</th>
              </tr>
            </thead>

            <tbody>
              {Disciplinas.map((dep) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={selecionadas.includes(dep.id)}
                      onChange={() => handleSelect(dep.id)}
                      className="w-4 h-4 accent-blue-600 cursor-pointer"
                    />
                  </td>

                  <td className="p-4 font-medium text-gray-700">
                    {dep.nome}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Paginação */}
          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm text-gray-600">
              Página <strong>{page}</strong> de <strong>{totalPages}</strong>
            </span>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>

        {/* Upload + Descrição */}
        <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">

          {/* Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fotografia profissional
            </label>

            <input
              type="file"
              name="fotoPerfil"
              onChange={(e) => setFoto(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>

          {/* Descrição */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Como pretende contribuir?
            </label>

            <textarea
              name="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              rows={4}
              placeholder="Explique qual é a sua principal motivação..."
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Botão */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition shadow-sm"
            >
              Submeter candidatura
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}