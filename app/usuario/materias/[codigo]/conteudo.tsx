"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { ebooks } from "@/lib/ebooks";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Conteudo() {
  const { codigo } = useParams();
  const ebook = ebooks.find((c) => c.codigo === codigo);

  const [jaComprou, setCompra] = useState(false);
  const [verificando, setVerificando] = useState(true);
  const [baixando, setBaixando] = useState(false);

  // 🔎 Verificar se o usuário já comprou
  const getEbook = async () => {
    try {
      const res = await fetch(`/api/ebooks/pagar/${codigo}`);

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
    }
  }, [codigo]);

  // 📥 Download seguro
  const handleDownload = async () => {
    try {
      setBaixando(true);

      const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/ebooks/${codigo}`);

      console.log("STATUS:", response.status);

      if (!response.ok) {
        const text = await response.text();
        console.log("ERRO BACKEND:", text);
        throw new Error("Erro ao baixar");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${ebook?.titulo}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      alert("Erro ao baixar o guia.");
    } finally {
      setBaixando(false);
    }
  };

  if (!ebook) {
    return (
      <div className="flex items-center justify-center h-[60vh] text-gray-500">
        Ebook não encontrado.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* CAPA */}
        <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl">
          <Image
            src={ebook.imagem}
            alt={ebook.titulo}
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

            {ebook.subItens && (
              <ul className="space-y-3">
                {ebook.subItens.map((s: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-gray-600">
                    <span className="text-blue-600 mt-1 text-lg">•</span>
                    <span>{s}</span>
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
