
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function conteudo() {
  return (
    <div id="container">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link key={1} href={`/anos/primeiro`}>
          <Card title="1 º Ano" description={` 2 disciplinas`} />
        </Link>

        <Link key={2} href={`/anos/segundo`}>
          <Card title="2 º Ano" description={` 3 disciplinas`} />
        </Link>

      </div>
    </div>
  );
}
