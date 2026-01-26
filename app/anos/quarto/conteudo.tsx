"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";

export default function Conteudo() {
  return (
 <section>
      <h2 className="text-xl font-bold mb-4">4 º Ano</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/develop`}>
          <Card title="Fiscalidade" description="Consultar simulados" />
        </Link>

        <Link href={`/develop`}>
          <Card
            title="Contabilidade Analítica Avançada"
            description="Consultar Simulados"
          />
        </Link>

        <Link href={`/develop`}>
          <Card
            title="Operações e Prática Seguradora"
            description="Consultar Simulados"
          />
        </Link>
      </div>
    </section>
  );
}
