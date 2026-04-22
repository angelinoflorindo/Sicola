"use client";
import LoadingPage from "@/components/LoadingPage";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Conteudo() {
  const [ebooks, setEbooks] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [estado, setEstado] = useState(true);
  const [order, setOrder] = useState("");
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);


  const isAdmin = (email:string | undefined)=>{
  const userEmail = '240029@isaf.co.ao'

    if(email === userEmail){
      return true
    }

    return false

  }
  const handleAcao = async (acao: string, id: number) => {
    setLoading(true);
    if (acao === "eliminar") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/trabalhos/${id}`,
        {
          method: "DELETE",
        },
      );

      fetchData();
      setPage(1);
      return;
    } else if (acao === "realizar") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/trabalhos/${id}`,
        { method: "PUT" },
      );

      fetchData();
      setPage(1);
      return;
    } else if (acao === "cancelar") {
      await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/trabalhos/${id}`,
        { method: "PATCH" },
      );

      fetchData();
      setPage(1);
      return;
    } else if (acao === "baixar") {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/trabalhos/${id}`,
      );

      const blob = await resp.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `recibo_${id}`;
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
          Trabalhos Científicos | TCC
        </h1>

         <div className="border-t">
          <p className="text-sm text-gray-500 wrap border-b">
            No âmbito da realização dos trabalhos, recomendamos entrar em contacto com o cliente para obter maiores informações 
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100 text-gray-600 text-sm">
              <tr>
                <th className="p-4 text-left">Nome Completo</th>
                <th className="p-4 text-left">telemovel</th>
                <th className="p-4 text-left">Grau Acadêmico</th>
                <th className="p-4 text-left">Tema de Pesquisa</th>
                <th className="p-4 text-left">Descrição</th>
                <th className="p-4 text-left">Situação</th>
                <th className="p-4 text-left">Operação</th>
              </tr>
            </thead>
            <tbody>
              {ebooks.map((dep, index) => (
                <tr
                  key={dep.id}
                  className="border-t hover:bg-gray-50 transition"
                >
                  <td className="p-4 font-medium">
                    {dep.Usuario.primeiro_nome} {dep.Usuario.segundo_nome}
                  </td>
                  <td className="p-4 font-medium">{dep.Usuario.telemovel}</td>
                  <td className="p-4 font-medium">{dep.grau}</td>
                  <td className="p-4 font-medium">{dep.tema}</td>
                  <td className="p-4 font-medium">{dep.descricao}</td>
                  <td className="p-4 font-medium">
                    <span
                      className={`px-3 py-1 text-black text-sm ${dep.estado ? "bg-green-200 " : "bg-red-200"} `}
                    >
                      {dep.estado ? "Processando/Relizado" : "Pendente"}
                    </span>
                  </td>

                  <td className="py-2 px-4 border-b">
                    <select
                      onChange={(e) => handleAcao(e.target.value, dep.id)}
                      className="border rounded px-2 py-1 bg-white text-sm"
                    >
                      <option value="analisar"> - - - - </option>
                      {dep.estado ? (
                        ""
                      ) : (
                        <option value="realizar"> Realizar o trabalho</option>
                      )}

                      <option value="baixar"> baixar recibo</option>
                      {isAdmin(session?.user.email) ? (
                        <>
                          <option value="cancelar"> Cancelar o trabalho</option>
                          <option value="eliminar"> Eliminar o trabalho</option>
                        </>
                      ) : (
                        ""
                      )}
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
