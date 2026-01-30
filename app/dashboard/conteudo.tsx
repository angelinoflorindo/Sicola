
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function DashBoardContent() {
  return (
    <div id="container">
      <h2 className="text-2xl font-bold mb-6">Painel principal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link key={1} href={`/anos/primeiro`}>
          <Card title="1 º Ano" description={` 2 disciplinas`} />
        </Link>

        <Link key={2} href={`/anos/segundo`}>
          <Card title="2 º Ano" description={` 3 disciplinas`} />
        </Link>

        <Link key={3} href={`/anos/terceiro`}>
          <Card title="3 º Ano" description={` 3 disciplinas`} />
        </Link>

        <Link key={4} href={`/anos/quarto`}>
          <Card title="4 º Ano" description={` 3 disciplinas`} />
        </Link>
      </div>
    </div>
  );
}
