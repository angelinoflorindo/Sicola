"use client";

import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Notfound() {
  return (
    <div>
      <h1>
        <b>Página 404: Inexistente</b>
      </h1>

      <Link href={`/`}>
        <Card title="Voltar" description="Voltar ao painel princiopal" />
      </Link>
    </div>
  );
}
