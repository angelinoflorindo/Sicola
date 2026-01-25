"use client";
import Link from "next/link";
import Card from "@/components/ui/Card";


export default function TerceiroAno() {

  return (
    <section>
      <h2 className="text-xl font-bold mb-4">3 º Ano</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/develop`}>
          <Card
            title="Finanças Empresariais"
            description="Consultar simulados"
          />
        </Link>

        <Link href={`/develop`}>
          <Card
            title="Contabilidade e Controlo Orçamental"
            description="Consultar Simulados"
          />
        </Link>

        <Link href={`/develop`}>
          <Card
            title="Macroeconomia I"
            description="Consultar Simulados"
          />
        </Link>
      </div>
    </section>
  );
}
