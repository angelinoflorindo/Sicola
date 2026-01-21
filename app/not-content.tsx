'use client'

import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Conteudo() {
  return (
    <div>
      <h1>
        <b>Página 404: Inexistente</b>
      </h1>

      <Link href={`/`}>
        <Card title="Voltar" description="Verificar a página" />
      </Link>
    </div>
  );
}
