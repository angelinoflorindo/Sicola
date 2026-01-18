"use client";
import { Timer } from "@/components/Timer";
import { QuestionCard } from "@/components/QuentionCard";
import { useParams, useRouter } from "next/navigation";

export default function Simular() {
  const params = useParams();
  const disciplina = String(params.disciplina)
  const router = useRouter();

  function finalizar() {
    alert("Prova finalizada!");
    router.push("/resultados");
  }

  return (
    <section className="max-w-3xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-2">
        <h2 className="font-bold text-lg">
          {decodeURIComponent(disciplina)}
        </h2>
        <Timer duration={2 * 60 * 60} onFinish={finalizar} />
      </div>

      <QuestionCard/>

      <button
        onClick={finalizar}
        className="mt-6 w-full bg-blue-700 text-white py-3 rounded"
      >
        Submeter Prova
      </button>
    </section>
  );
}
