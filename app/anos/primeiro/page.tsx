"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function PrimeiroAno() {
 

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">1 º Ano</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/anos/primeiro/matematica1`}>
          <Card title="Matemática I" description="Consultar simulados" />
        </Link>

        <Link href={`/develop`}>
          <Card
            title="Métodos de Investigação"
            description="Consultar Simulados"
          />
        </Link>
      </div>
    </section>
  );
}
