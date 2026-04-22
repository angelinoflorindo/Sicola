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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="max-w-[80%]  w-full bg-white rounded-2xl shadow p-6 space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 border-b">
            TCC | Trabalhos Científicos
          </h1>

          <div className=" grid grid-cols-1 items-center justify-center ">
            {/* Add código */}

            <div className="grid grid-cols-1 m-4">
              <h2 className="font-semibold"> Tema do Trabalho </h2>
              <small> Informe abaixo o tema principal </small>

              <input
                type="text"
                onChange={(e) => {
                  setTema(e.target.value);
                }}
                className=" text-black p-2   border  "
                placeholder="tema de pesquisa"
              />
            </div>

            <div className="grid grid-cols-1 m-4">
              <h2 className="font-semibold">Grau Académico</h2>
              <small>Escolhe o grau académico respeitante ao trabalho</small>

              <select
                onChange={(e) => setGrau(e.target.value)}
                className="border  rounded p-4   bg-white font-semibold"
              >
                <option value="analisar"> - - - - </option>
                <option value="Medio">Ensino Médio</option>
                <option value="Licenciatura">Licenciatura</option>
                <option value="Especialidade">Especialidade </option>
                <option value="Catedratico">Mestrado/Doutoramento</option>
              </select>
            </div>

            <div className="grid grid-cols-1 m-4 ">
              <h2 className="font-semibold"> Área de graduação </h2>
              <small> Informe a sua área/curso </small>
              <input
                type="text"
                onChange={(e) => {
                  setArea(e.target.value);
                }}
                className=" text-black p-2   border capitalize "
                placeholder="Escreve ..."
              />
            </div>

            <div className="grid grid-cols-1 m-4">
              <h2 className="font-semibold"> Informações adicionais</h2>
              <small> Descreva abaixo todas as informações necessárias </small>

              <textarea
                className="text-black p-2 capitalize  border "
                placeholder="Informe aqui o nome do seu Docente, nome da sua Instituição/universidade, unidade curricular(disciplina); intervenientes do trabalho, prazo do trabalho... "
                onChange={(e) => {
                  setDescricao(e.target.value);
                }}
              ></textarea>
            </div>

            <div className="  bg-white rounded-2xl shadow-sm p-6">
              <p className="text-sm text-gray-500">Valor de Pagamento</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
                  {valorTotal},00kz
                </div>

                <div className="text-xs sm:text-sm text-gray-600">
                  <b>Gestor:</b> Angelino Francisco <br />
                  <b>IBAN:</b> 0040 0000 9926 0129 1013 0 <br />
                  <b>Express / BAI Directo:</b> +244 930 754 775
                </div>
              </div>
            </div>

            <div className="m-4">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Anexar Comprovativo
              </h3>

              <div>
                <input
                  type="file"
                  name="fotoPerfil"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 m-4">
              <button
                onClick={() => handleSubmit()}
                className=" w-[50%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
              >
                confirmar
              </button>
            </div>
          </div>

          <div className="border-b">
            <h2 className="text-xl font-bold">TCC | Trabalhos realizados</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Data </th>
                  <th className="p-4 text-left">Grau Acadêmico</th>
                  <th className="p-4 text-left">Área / curso</th>
                  <th className="p-4 text-left">Universidade</th>
                  <th className="p-4 text-left">Estado</th>
                </tr>
              </thead>
              <tbody>
                {ebooks.map((dep, index) => (
                  <tr
                    key={dep.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-4">{dep.createdAt.split("T")[0]}</td>
                    <td className="p-4 font-medium">{dep.grau}</td>
                    <td className="p-4 font-medium">{dep.area}</td>
                    <td className="p-4 font-medium">
                      {dep.Usuario.perfil === "ADMIN"
                        ? `Universidade José Eduardo dos Santos`
                        : dep.Usuario.Universidade.nome}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-black text-sm ${dep.estado ? "bg-green-200 " : "bg-red-200"} `}
                      >
                        {dep.estado ? "Concluído" : "Pendente"}
                      </span>
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
                onClick={() =>
                  setPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={page === totalPages}
                className="bg-gray-200 px-3 py-1 rounded disabled:opacity-50"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
