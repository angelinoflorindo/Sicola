"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { useParams } from "next/navigation";

export default function SegundoAno() {

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">2 º Ano</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/anos/segundo/contabilidade`}>
          <Card
            title="Contabilidade Geral II"
            description="Consultar simulados"
          />
        </Link>

        <Link href={`/anos/segundo/calculo`}>
          <Card
            title="Cálculo e Operações Financeiras"
            description="Consultar Simulados"
          />
        </Link>

        <Link href={`/anos/segundo/estatistica`}>
          <Card
            title="Estatística"
            description="Consultar Simulados"
          />
        </Link>
      </div>
    </section>
  );
}
