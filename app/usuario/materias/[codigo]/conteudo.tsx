"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export default function Conteudo() {
  const { codigo } = useParams();
  const [ebook, setEbook] = useState<any>(null);
  const [jaComprou, setCompra] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [loading, setLoading] = useState(true);
  const [baixando, setBaixando] = useState(false);
  const router = useRouter();

  const fetchEbook = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais/ver/${codigo}`,
    );
    if (res.ok) {
      const data = await res.json();

      setLoading(false);
      setEbook(data);
      return;
    }

    router.push("/usuario/materias");
  };

  // 🔎 Verificar se o usuário já comprou
  const getEbook = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/ebooks/pagar/${codigo}`,
      );

      if (!res.ok) {
        setCompra(false);
        return;
      }

      const data = await res.json();

      if (data?.status === "PAGO") {
        setCompra(true);
      }
    } catch (err) {
      setCompra(false);
    } finally {
      setVerificando(false);
    }
  };

  useEffect(() => {
    if (codigo) {
      getEbook();
      fetchEbook();
    }
  }, [codigo]);

  // 📥 Download seguro
  const handleDownload = async () => {
    try {
      setBaixando(true);
      setLoading(true)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/ebooks/${codigo}`,
      );

      if (!response.ok) {
        const text = await response.text();
        console.log("ERRO BACKEND:", text);
        throw new Error("Erro ao baixar");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${ebook?.codigo}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao baixar o guia.");
    } finally {
      setBaixando(false);
      setLoading(false)
    }
  };

 

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* CAPA */}
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={`/api/orientador/estudante/${ebook.imagem}`}
            alt="capa do material"
            fill
            className="object-cover"
            priority
          />

          {jaComprou && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
              ✔ Adquirido
            </div>
          )}
        </div>

        {/* INFORMAÇÕES */}
        <div className="flex flex-col">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800">
            {ebook.titulo}
          </h1>

          {!jaComprou && !verificando && (
            <div className="mt-4">
              <p className="text-gray-600 text-sm">Adquira por apenas</p>
              <p className="text-3xl font-bold text-blue-600">
                {ebook.valor},00 kz
              </p>
            </div>
          )}

          {/* CONTEÚDOS */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Principais Conteúdos
            </h2>

            {ebook.SubItens && (
              <ul className="space-y-3">
                {ebook.SubItens.map((s: any, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="text-blue-600 mt-1 text-lg">•</span>
                    <span>{s.item}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* BOTÕES */}
          <div className="mt-10">
            {verificando ? (
              <div className="text-gray-400">Verificando acesso...</div>
            ) : !jaComprou ? (
              <Link
                href={`/usuario/materias/${ebook.codigo}/pagar`}
                className="w-full sm:w-auto inline-block text-center bg-blue-600 text-white py-3 px-8 rounded-xl hover:bg-blue-700 transition font-medium shadow-md hover:shadow-lg"
              >
                Efectuar Pagamento
              </Link>
            ) : (
              <button
                onClick={handleDownload}
                disabled={baixando}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-3 px-8 rounded-xl font-medium shadow-md hover:shadow-lg transition"
              >
                {baixando ? "Baixando..." : "Baixar Guia"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
