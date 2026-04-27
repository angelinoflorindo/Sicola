"use client";
import LoadingPage from "@/components/LoadingPage";
import OperacaoSucesso from "@/components/ui/operacaoSucesso";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [descricao, setDescricao] = useState("");
  const [grau, setGrau] = useState("");
  const [area, setArea] = useState("");
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);
  const [tema, setTema] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchData = async () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5");

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_URL
      }/api/orientador/trabalhos?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    const data = await res.json();

    setEbooks(data.data);
    setTotalPages(data.totalPages);
  };

  const valorTotal =
    grau === "Medio"
      ? 25000
      : grau === "Licenciatura"
      ? 50000
      : grau === "Especialidade"
      ? 100000
      : grau === "Catedratico"
      ? 150000
      : 0;

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (!file) {
        alert("Upload do comprovativo");
        return;
      }

      if (!tema || !descricao || !grau || !area) {
        alert("preencha os campos vazios!");
        return;
      }

      const formData = new FormData();

      formData.append("tema", tema);
      formData.append("descricao", descricao);
      formData.append("grau", grau);
      formData.append("valor", String(valorTotal));
      formData.append("area", area);
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/trabalhos`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Erro ao submeter");
      setOperacaoSucesso(true);

      setTimeout(() => {
        router.push("/dashboard");
      }, 3000);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro");
      router.push(`/usuario/trabalhos`);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <>
      {operacaoSucesso && <OperacaoSucesso />}

      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-3 sm:p-4">
        <div className="w-full max-w-5xl lg:max-w-6xl bg-white rounded-2xl shadow p-4 sm:p-6 space-y-6">

          {/* HEADER */}
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 border-b pb-2">
            TCC | Trabalhos Científicos
          </h1>

          <div className="grid grid-cols-1 gap-4 sm:gap-6">

            <div className="grid grid-cols-1 m-2 sm:m-4">
              <h2 className="font-semibold"> Tema do Trabalho </h2>
              <small> Informe abaixo o tema principal </small>

              <input
                type="text"
                onChange={(e) => setTema(e.target.value)}
                className="text-black p-2 border rounded-lg"
                placeholder="tema de pesquisa"
              />
            </div>

            <div className="grid grid-cols-1 m-2 sm:m-4">
              <h2 className="font-semibold">Grau Académico</h2>
              <small>Escolhe o grau académico respeitante ao trabalho</small>

              <select
                onChange={(e) => setGrau(e.target.value)}
                className="border rounded-lg p-3 bg-white font-semibold"
              >
                <option value="analisar"> - - - - </option>
                <option value="Medio">Ensino Médio</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Especialidade">Especialidade </option>
                <option value="Catedratico">Mestrado/Doutoramento</option>
              </select>
            </div>

            <div className="grid grid-cols-1 m-2 sm:m-4">
              <h2 className="font-semibold"> Área de graduação </h2>
              <small> Informe a sua área/curso </small>

              <input
                type="text"
                onChange={(e) => setArea(e.target.value)}
                className="text-black p-2 border rounded-lg capitalize"
                placeholder="Escreve ..."
              />
            </div>

            <div className="grid grid-cols-1 m-2 sm:m-4">
              <h2 className="font-semibold"> Informações adicionais</h2>
              <small> Descreva abaixo todas as informações necessárias </small>

              <textarea
                className="text-black p-2 border rounded-lg capitalize min-h-[120px]"
                placeholder="Informe aqui o nome do seu Docente, nome da sua Instituição/universidade, unidade curricular(disciplina); intervenientes do trabalho, prazo do trabalho... "
                onChange={(e) => setDescricao(e.target.value)}
              ></textarea>
            </div>

            {/* VALOR */}
            <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6">
              <p className="text-sm text-gray-500">Valor de Pagamento</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="text-2xl sm:text-4xl font-bold text-blue-600 mt-2">
                  {valorTotal},00kz
                </div>

                <div className="text-xs sm:text-sm text-gray-600">
                  <b>Gestor:</b> Angelino Francisco <br />
                  <b>IBAN:</b> 0040 0000 9926 0129 1013 0 <br />
                  <b>Express / BAI Directo:</b> +244 930 754 775
                </div>
              </div>
            </div>

            {/* FILE */}
            <div className="m-2 sm:m-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Anexar Comprovativo
              </h3>

              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              />
            </div>

            {/* BOTÃO */}
            <div className="grid grid-cols-1 m-2 sm:m-4">
              <button
                onClick={handleSubmit}
                className="w-full sm:w-1/2 mx-auto bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
              >
                confirmar
              </button>
            </div>
          </div>

          {/* TABELA */}
          <div className="border-b">
            <h2 className="text-lg sm:text-xl font-bold">
              TCC | Trabalhos realizados
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
            <table className="min-w-[600px] w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-3 sm:p-4 text-left">Grau Acadêmico</th>
                  <th className="p-3 sm:p-4 text-left">Área / curso</th>
                  <th className="p-3 sm:p-4 text-left">Universidade</th>
                </tr>
              </thead>

              <tbody>
                {ebooks.map((dep) => (
                  <tr key={dep.id} className="border-t hover:bg-gray-50">
                    <td className="p-3 sm:p-4">{dep.grau}</td>
                    <td className="p-3 sm:p-4">{dep.area}</td>
                    <td className="p-3 sm:p-4">
                      {dep.Usuario.perfil === "ADMIN"
                        ? `Universidade José Eduardo dos Santos`
                        : dep.Usuario.Universidade.nome}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINAÇÃO */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Anterior
            </button>

            <span className="text-sm sm:text-base">
              Página {page} de {totalPages}
            </span>

            <button
              onClick={() =>
                setPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={page === totalPages}
              className="w-full sm:w-auto bg-gray-200 px-4 py-2 rounded disabled:opacity-50"
            >
              Próxima
            </button>
          </div>
        </div>
      </div>
    </>
  );
}