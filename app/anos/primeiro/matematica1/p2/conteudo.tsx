'use client'
import { useEffect, useState } from "react";
import { questoesMatematicaI } from "@/lib/provas/matematica1/questoes";
import { QuestaoCard } from "@/components/provas/matematica1/QuestaoCard";
import { Temporizador } from "@/components/provas/matematica1/Temporizador";


export default function Conteudo(){
    
    const [respostas, setRespostas] = useState<string[]>(
    Array(questoesMatematicaI.length).fill("")
  );

  // Atualiza resposta de uma questão
  function atualizarResposta(index: number, valor: string) {
    const novas = [...respostas];
    novas[index] = valor;
    setRespostas(novas);
  }

  // Submissão da prova
  async function submeterProva() {
    await fetch("/api/provas/matematica1/p2", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        estudante: "Aluno Teste", // Aqui entra o nome do estudante
        respostas,
      }),
    });

    alert("Prova submetida com sucesso!");
  }


    return (
            <div className="max-w-4xl mx-auto p-6 space-y-6">
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
            onChange={(valor: string) => atualizarResposta(index, valor)}
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
    )
}