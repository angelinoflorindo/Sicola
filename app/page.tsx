import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Dashboard() {
  const anos = [
    { ano: 1, disciplinas: 2 },
    { ano: 2, disciplinas: 3 },
    { ano: 3, disciplinas: 3 },
    { ano: 4, disciplinas: 3 },
  ];

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Painel principal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {anos.map((a) => (
          <Link key={a.ano} href={`/anos/${a.ano}`}>
            <Card
              title={`${a.ano}º Ano`}
              description={`${a.disciplinas} disciplinas`}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}
