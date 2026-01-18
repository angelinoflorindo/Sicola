"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Matematica() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Matemática I </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/develop`}>
          <Card
            title="Simular - P1"
            description="Iniciar Simulação(2h)"
          />
        </Link>

        <Link href={`/anos/primeiro/matematica1/p2`}>
          <Card
            title="Simular - P2"
            description="Iniciar Simulação(2h)"
          />
        </Link>

        <Link href={`/anos/primeiro/matematica1/exame`}>
          <Card title="Simular - Exame" description="Iniciar Simulação(2h)" />
        </Link>

        <Link href={`/develop`}>
          <Card title="Simular - Recurso" description="Iniciar Simulação(2h)" />
        </Link>
      </div>
    </section>
  );
}
