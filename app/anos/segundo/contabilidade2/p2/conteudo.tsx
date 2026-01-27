"use client";
import { useEffect, useState } from "react";
import {
  primeiroGrupoContabilidadeII,
  segundoGrupoContabilidadeII,
} from "@/lib/provas/contabilidade2/questoes";
import { QuestaoCard } from "@/components/provas/contabilidade2/QuestaoCard";
import { QuestaoCardAdd } from "@/components/provas/contabilidade2/QuestaoCardAdd";
import { Temporizador } from "@/components/provas/contabilidade2/Temporizador";
import { useRouter } from "next/navigation";
import Sucesso from "@/components/ui/Sucesso";
import LoadingPage from "@/components/LoadingPage";

export default function Conteudo() {
  const [respostas, setRespostas] = useState<any[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [inicioProva] = useState<number>(() => Date.now());
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);

  // Atualiza resposta de uma questão
  function handleSelect(qIndex: number, subIndex: number, valor: boolean) {
    setRespostas((prev) => {
      const copia = [...prev]; // aqui tambem esta dando erros
      if (!copia[qIndex]) copia[qIndex] = [];
      copia[qIndex][subIndex] = valor;
      return copia;
    });
  }

  function handleInput(qIndex: number, valor: string) {
    setRespostas((prev) => {
      const copia = [...prev];
      copia[qIndex] = valor;
      return copia;
    });
  }
  // Submissão da prova
  async function submeterProva() {
    setLoading(true);
    try {
      const tempoGasto = Math.floor((Date.now() - inicioProva) / 1000);
      const codigo = "CONTABILIDADEII";

      const resp = await fetch("/api/provas/contabilidade2/p2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respostas,
          tempoGasto,
          codigo,
        }),
      });

      if (!resp.ok) throw new Error("Erro na submissão");
      const data = await resp.json().then((data) => {
        return data;
      });
      const prova = data.prova;
      // sucesso
      setLoading(false);
      setOperacaoSucesso(true);

      // redireciona após 3s
      setTimeout(() => {
        router.push(`/resultados/anos/segundo/contabilidade2/${prova.id}`);
      }, 3000);
    } catch (error) {
      router.push("/anos/segundo/contabilidade2/p2");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    <LoadingPage />;
  }
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {operacaoSucesso && <Sucesso />}
      {/* Cabeçalho */}
      <header className="border-b pb-4">
        <h1 className="text-2xl font-bold">Prova de Contabilidade Geral II </h1>
        <p className="text-sm text-gray-600">
          Duração: 2 horas · Leia atentamente as questões
        </p>
      </header>



      {/* Temporizador // erro esta vindo daqui*/}
      <Temporizador onFinish={submeterProva} /> 

      {/* Questões */}
      {primeiroGrupoContabilidadeII.map((questao, index) => (
        <QuestaoCard
          key={questao.id}
          questao={questao}
          changeInput={(valor: string) => handleInput(index, valor)}
          changeSelect={(i: number, valor: boolean) =>
            handleSelect(index, i, valor)
          }
        />
      ))}

    {segundoGrupoContabilidadeII.map((questao, index) => (
  <QuestaoCardAdd
    key={questao.id}
    questao={questao}
    changeInput={(valor: string) => handleInput(index, valor)}
    changeSelect={(i: number, valor: boolean) =>
      handleSelect(index, i, valor)
    }
  />
))}


      {/* Botão submeter */}
      <div className="flex justify-end">
        <button
          onClick={submeterProva}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        >
          Submeter Prova
        </button>
      </div>
    </div>
  );
}
