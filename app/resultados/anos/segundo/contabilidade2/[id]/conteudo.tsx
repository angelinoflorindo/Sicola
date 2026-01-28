"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingPage from "@/components/LoadingPage";
import { primeiroGrupoContabilidadeII,segundoGrupoContabilidadeII } from "@/lib/provas/contabilidade2/questoes";
import ResultadoContabilidade from "../ResultadoContabilidade";

// Adaptador para o componente
const mapeadoQ1 = () => {
  return primeiroGrupoContabilidadeII.map((q) => ({
    id: q.id,
    tipo:q.tipo,
    subitens:q.subitens,
    enunciado: q.enunciado,
    tabela: q.tabela,
    opcoes: q.opcoes,
  }));
};



const mapeadoQ2 = () => {
  return segundoGrupoContabilidadeII.map((q) => ({
    id: q.id,
    tipo:q.tipo,
    subitens:q.subitens,
    enunciado: q.enunciado,
    tabela: q.tabela,
    opcoes: q.opcoes,
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
      const resp = await fetch(`/api/provas/contabilidade2/${id}`);
      if (!resp.ok) throw new Error("Erro ao buscar prova");
      const json = await resp.json();
      console.log("validando prova", json);
      setData(json);
    } catch (error) {
      console.log("erros", error);
      router.push("/anos/segundo/contabilidade2/p2");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProva();
  }, []);

  if (loading || !data) return <LoadingPage />;

  const adaptadoQ1 = mapeadoQ1();
  const adaptadoQ2 = mapeadoQ2();

  return (
    <section className="space-y-6">

      
      <ResultadoContabilidade
        notaFinal={data.notaFinal}
        detalhes={data.detalhes}
        primeiraQuestoes={primeiroGrupoContabilidadeII}
        segundaQuestoes={segundoGrupoContabilidadeII}
      />

      <div className="flex gap-4 mt-6">
        <Link href={"/dashboard"}>
          <button className="px-4 py-2 bg-gray-200 rounded">Voltar à página principal</button>
        </Link>
        <Link href={"/anos/segundo/contabilidade2/p2"}>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Voltar a realizar a prova</button>
        </Link>
      </div>
    </section>
  );
}
