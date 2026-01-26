import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Conteudo() {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Estatistica </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href={`/develop`}>
          <Card title="Simular - P1" description="Iniciar Simulação(2h)" />
        </Link>

        <Link href={`/anos/segundo/estatistica/p2`}> 
          <Card title="Simular - P2" description="Iniciar Simulação(2h)" />
        </Link>

        {/*`/anos/primeiro/estatistica/exame`*/}
        <Link href={"/develop"}>
          <Card title="Simular - Exame" description="Iniciar Simulação(2h)" />
        </Link>

        <Link href={`/develop`}>
          <Card title="Simular - Recurso" description="Iniciar Simulação(2h)" />
        </Link>
      </div>
    </section>
  );
}
