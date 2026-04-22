"use client";

import { useRouter, useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import OperacaoSucesso from "@/components/ui/operacaoSucesso";
 

export default function Conteudo() {
  const [loading, setLoading] = useState(false);
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);
  const [ebook, setEbook] = useState<any>(null)
  const [foto, setFoto] = useState<File | null>(null);

  const router = useRouter();
  const { codigo } = useParams();  

  const fetchEbook = async ()=>{
     const res = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/materiais/ver/${codigo}`);
    if(res.ok){
      const data = await res.json()
 
      setLoading(false)
      setEbook(data)
      return
    }

    router.push(`/usuario/materias/${codigo}/pagar`)
  }

  useEffect(()=>{
    fetchEbook()
  }, [])
  async function submitPagamento(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);


    if(!foto){
      alert('Anexa o comprovativo !')
      return
    }

    const formData = new FormData()
    formData.append('file', foto)
    formData.append('codigo', JSON.stringify(codigo))

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/ebooks/pagar`,
        {
          method: "POST",
          body:formData
        },
      );

      if (!resp.ok) throw new Error("Erro no pagamento");

      setOperacaoSucesso(true);

      setTimeout(() => {
        router.push(`/usuario/materias/${codigo}`);
      }, 3000);
    } catch {
      router.push(`/usuario/materias/${codigo}/pagar`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {operacaoSucesso && <OperacaoSucesso />}

      <div className="min-h-screen bg-gray-50 px-4 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Cabeçalho */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Finalizar Pagamento
            </h1>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">
              Após confirmação do pagamento, o guia ficará disponível para
              download.
            </p>
          </div>

          {/* Card principal */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-md sm:shadow-lg p-5 sm:p-8 space-y-6 sm:space-y-8">
            {/* Valor */}
            <div className="text-center border-b pb-5 sm:pb-6">
              <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-wide">
                Valor do Guia
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
                {ebook?.valor},00 kz
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Anexar Comprovativo
              </h3>

              <div>
                <input
                  type="file"
                  name="fotoPerfil"
                  onChange={(e) => setFoto(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>
            {/* Botão */}
            <form onSubmit={submitPagamento}>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 transition text-white py-3.5 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-base sm:text-lg shadow-md active:scale-[0.98]"
              >
                {loading ? "Processando..." : "Confirmar Pagamento"}
              </button>
            </form>

            {/* Dados */}
              <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
                <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                  Dados para Transferência
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                  <b>Gestor:</b> Angelino Francisco <br />
                  <b>IBAN:</b> 0040 0000 9926 0129 1013 0 <br />
                  <b>Express / BAI Directo:</b> +244 930 754 775
                </p>
              </div>
          </div>
        </div>
      </div>
    </>
  );
}
