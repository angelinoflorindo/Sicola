import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Conteudo() {
  return (
    <div>
      <h1>
        <b>Página em desenvolvimento</b>
      </h1>

      <hr />
      <h3>Conteúdo brevemente disponível....</h3>

      <Link href={`/dashboard`}>
        <Card title="Voltar" description="Voltar ao painel princiopal" />
      </Link>
    </div>
  );
}
