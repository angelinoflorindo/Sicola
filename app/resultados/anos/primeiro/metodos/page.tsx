"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Metodos() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Métodos de investigação</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/anos/primeiro/matematica/p1`}>
          <Card
            title="Simulado - P1"
            description="Simular a primeira frequência"
          />
        </Link>

        <Link href={`/anos/primeiro/matematica/p2`}>
          <Card
            title="Simulado - P2"
            description="Simular a segunda frequência"
          />
        </Link>

        <Link href={`/anos/primeiro/matematica/exame`}>
          <Card title="Simulado - Exame" description="Simular o exame" />
        </Link>

        <Link href={`/anos/primeiro/matematica/exame`}>
          <Card title="Simulado - Recurso" description="Simular o recurso" />
        </Link>
      </div>
    </section>
  );
}
