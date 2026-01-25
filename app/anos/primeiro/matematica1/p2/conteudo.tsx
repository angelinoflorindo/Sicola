"use client";
import { useEffect, useState } from "react";
import { questoesMatematicaI } from "@/lib/provas/matematica1/questoes";
import { QuestaoCard } from "@/components/provas/matematica1/QuestaoCard";
import { Temporizador } from "@/components/provas/matematica1/Temporizador";
import { useRouter } from "next/navigation";
import Sucesso from "@/components/ui/Sucesso";
import LoadingPage from "@/components/LoadingPage";


export default function Conteudo() {
  const [respostas, setRespostas] = useState<any[]>(
    Array(questoesMatematicaI.length).fill("")
  );
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);
  
  
  // Atualiza resposta de uma questão
  function handleSelect(qIndex: number, subIndex: number, valor: boolean) {
    setRespostas((prev) => {
      const copia = [...prev];
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
      const resp = await fetch("/api/provas/matematica1/p2", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          respostas,
        }),
      });

      if (!resp.ok) throw new Error("Erro na submissão");

      // sucesso
      setLoading(false);
      setOperacaoSucesso(true);

      // redireciona após 3s
      setTimeout(() => {
        router.push("/resultados/anos/primeiro/matematica1/p2");
      }, 3000);
    } catch (error) {
      router.push("/anos/primeiro/matematica1/p2");
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
        <h1 className="text-2xl font-bold">Prova de Matemática I</h1>
        <p className="text-sm text-gray-600">
          Duração: 2 horas · Leia atentamente as questões
        </p>
      </header>

      {/* Temporizador */}
      <Temporizador onFinish={submeterProva} />

      {/* Questões */}
      {questoesMatematicaI.map((questao, index) => (
        <QuestaoCard
          key={questao.id}
          questao={questao}
          changeInput={(valor: string) => handleInput(index, valor)}
          changeSelect={(i:number, valor:boolean) => handleSelect(index, i, valor)}
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
