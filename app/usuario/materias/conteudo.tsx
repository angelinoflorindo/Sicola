
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Conteudo() {
  return (
    <div id="container">
      <h2 className="text-2xl font-bold mb-6">Materias acadêmicos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/*
        
        
        <Link key={1} href={`/anos/primeiro`}>
          <Card title="1 º Ano" description={` 2 disciplinas`} />
        </Link>
        */}
      </div>
    </div>
  );
}
