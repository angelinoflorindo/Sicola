"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import ResultadoProva from "@/components/ui/ResultadoProva";
import { questoesEstatisticaI } from "@/lib/provas/estatistica1/questoes";

// Adaptador para o componente
const mapearQuestoes = () => {
  return questoesEstatisticaI.map((q) => ({
    id: q.id,
    tipo:q.tipo,
    subitens:q.subitens,
    enunciado: q.enunciado,
    tabela: q.tabela,
    opcoes: q.opcoes,
    formula: q.formula,
  }));
};

export default function Conteudo() {
  const router = useRouter();
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const id = params.id;

  const fetchProva = async () => {
    try {
      const resp = await fetch(`/api/provas/estatistica/${id}`);
      if (!resp.ok) throw new Error("Erro ao buscar prova");
      const json = await resp.json();
      setData(json);
    } catch (error) {
      console.log("erros", error);
      router.push("/anos/segundo/estatistica/p2");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProva();
  }, []);

  if (loading || !data) return <LoadingPage />;

  const questoesAdaptadas = mapearQuestoes();

  return (
    <section className="space-y-6">
      <ResultadoProva
        notaFinal={data.notaFinal}
        detalhes={data.detalhes}
        questoes={questoesAdaptadas}
      />

      <div className="flex gap-4 mt-6">
        <Link href={"/dashboard"}>
          <button className="px-4 py-2 bg-gray-200 rounded">Voltar à página principal</button>
        </Link>
        <Link href={"/anos/segundo/estatistica/p2"}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Voltar a realizar a prova</button>
        </Link>
      </div>
    </section>
  );
}
