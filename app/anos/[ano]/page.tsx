'use client'
import Link from "next/link";
import Card from "@/components/ui/Card";
import { useParams } from "next/navigation";

const DISCIPLINAS: Record<number, string[]> = {
  1: ["Matemática I", "Métodos de Investigação"],
  2: [
    "Contabilidade Geral II",
    "Cálculo e Operações Financeiras",
    "Estatística",
  ],
  3: [
    "Finanças Empresariais",
    "Contabilidade e Controlo Orçamental",
    "Macroeconomia I",
  ],
  4: [
    "Fiscalidade",
    "Contabilidade Analítica Avançada",
    "Operações e Prática Seguradora",
  ],
};

export default function AnoPage() {
  const params = useParams()
  const anoNumero = Number(params.ano);

  const disciplinas = DISCIPLINAS[anoNumero] ?? [];

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{params.ano}º Ano</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {disciplinas.map((d) => (
          <Link key={d} href={`/simular/${encodeURIComponent(d)}`}>
            <Card title={d} description="Iniciar simulação (2h)" />
          </Link>
        ))}
      </div>
    </section>
  );
}
