"use client";
import LoadingPage from "@/components/LoadingPage";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [subItem, setSubItem] = useState("");
  const [titulo, setTitulo] = useState("");
  const [valor, setValor] = useState("");

  const [codigo, setCodigo] = useState("");
  const [descricao, setDescricao] = useState<string[]>([]);
  const [totalPages, setTotalPages] = useState(1); 
  const [status, setStatus] = useState("");
  const [order, setOrder] = useState("");
  const [file, setMaterial] = useState<File | null>(null);
  
  const [imagem, setCapa] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleAcao = async (acao: string, id: number) => {
    setLoading(true);
    if (acao === "eliminar") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais/${id}`,
        {
          method: "DELETE",
        },
      );

      fetchData();
      setPage(1);
      return;
    } else if (acao === "toggle") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais/${id}`,
        { method: "PATCH" },
      );

      fetchData();
      setPage(1);
      return;
    } else if (acao === "baixar") {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais/${id}`,
      );

      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `ebook_${id}`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);

      fetchData();
      setPage(1);
      return;
    }
  };

  const fetchData = async () => {
    const params = new URLSearchParams();

    params.append("page", page.toString());
    params.append("limit", "5"); 

    if (status) params.append("status", status);
    if (order) params.append("order", order);

    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_CLIENT_URL
      }/api/orientador/materiais?${params.toString()}`,
    );

    if (!res.ok) {
      const text = await res.text();
      console.error("Erro na API:", res.status, text);
      return;
    }

    setLoading(false);
    setDescricao([])
    const data = await res.json();

    setEbooks(data.data);
    setTotalPages(data.totalPages);
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      if (!file || !imagem) {
        alert("Upload do material ou capa");
        return;
      }

      if (!codigo || !titulo || !valor) {
        alert("preencha os campos vazios!");
        return;
      }

      const formData = new FormData();

      formData.append("subItens", JSON.stringify(descricao));
      formData.append("codigo", codigo);
      formData.append("titulo", titulo);
      formData.append("valor", valor);
      formData.append("foto", imagem);
      formData.append("file", file);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Erro ao submeter");
     
      fetchData();
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro");
      router.push(`/usuario/orientacao/painel/materiais`);
    }
  };

  const addDescricao = () => {
    if (!subItem) return;

    if (!descricao.includes(subItem)) {
      setDescricao([...descricao, subItem]);

      setSubItem("");
    }

    setSubItem("");
  };

  useEffect(() => {
    fetchData();
  }, [page]);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-[80%]  w-full bg-white rounded-2xl shadow p-6 space-y-6">

        <h1 className="text-3xl font-bold text-gray-800">
          Materiais Acadêmicos
        </h1>

        <div className="border-b flex flex-raw justify-between">
          <h2 className="text-xl font-bold">Upload de materiais</h2>

          <div>
            <input
              type="file"
              name="arquivo"
              onChange={(e) => setMaterial(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>
        <div className=" grid grid-cols-1 items-center justify-center ">
          {/* Add código */}

          <div className="grid grid-cols-1 m-4">
            <h2 className="font-semibold"> Código do Material </h2>
            <small> Combinação: único, sem espaços, nem acentos </small>

            <input
              type="text"
              onChange={(e) => {
                setCodigo(e.target.value);
              }}
              className=" text-black p-2   border  "
              placeholder="augustoFiscia1"
            />
          </div>

          <div className="grid grid-cols-1 m-4">
            <h2 className="font-semibold"> Título do Material </h2>
            <small> Informe abaixo o Título </small>

            <input
              type="text"
              onChange={(e) => {
                setTitulo(e.target.value);
              }}
              className="text-black p-2     border "
              placeholder="Informe o título "
            />
          </div>
          <div className="grid grid-cols-1 m-4">
            <h2 className="font-semibold"> Valor do Material</h2>
            <small>Escolhe o valor ideal</small>

            <select
              onChange={(e) => setValor(e.target.value)}
              className="border rounded p-4   bg-white font-semibold"
            >
              <option value="analisar"> - - - - </option>
              <option value="1500">1500,00kz</option>
              <option value="3000">3000,00kz </option>
              <option value="4500">4500,00kz</option>
              <option value="6000">6000,00kz</option>
              <option value="7500">7500,00kz</option>
              <option value="9000">9000,00kz</option>
            </select>
          </div>

         <div className="grid grid-cols-1 m-4">
              <h2 className="font-semibold"> Descrições adicionais </h2>
              <small>Principais conteúdos do material</small>

              <div>
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={subItem}
                    onChange={(e) => setSubItem(e.target.value)}
                    className="w-full  text-black p-2  border "
                  />

                  <button
                    onClick={addDescricao}
                    className="bg-blue-600 text-white px-4 rounded-lg"
                  >
                    +
                  </button>
                </div>

                {/* LISTA DOS ITENS */}
                <div className="grid grid-col-1 mt-1">
                  {descricao.map((s, i) => (
                    <span key={i} className=" text-black px-3 py-1   text-sm">
                      {i + 1} - {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 m-4">
            <h2 className="font-semibold"> Capa do Material </h2>
            <small> Anexa uma capa chamativa do material </small>

                 <input
              type="file"
              name="arquivo"
              onChange={(e) => setCapa(e.target.files?.[0] || null)}
              className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />

          </div>

          <button
            onClick={() => handleSubmit()}
            className=" w-[50%] bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-50 transition"
          >
            confirmar
          </button>
        </div>

        <div className="border-b">
          <h2 className="text-xl font-bold">Todos os materiais</h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Data </th>
                <th className="p-4 text-left">Código</th>
                <th className="p-4 text-left">Título</th>
                <th className="p-4 text-left">Valor</th>
                <th className="p-4 text-left">Estado</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((dep, index) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4">{dep.createdAt.split("T")[0]}</td>
                  <td className="p-4 font-medium">
                    {dep.codigo}  
                  </td>
                  <td className="p-4 font-medium">{dep.titulo}</td>
                  <td className="p-4 font-medium">{dep.valor},00Kz</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-white text-sm ${dep.estado ? 'bg-green-600 ' :'bg-red-600'} `  }>
                      {dep.estado ? ("Activo"):('Inactivo')}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      <option value="baixar"> 📂 Baixar ebook</option>
                      <option value="toggle"> Activar / Desactivar </option>
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
