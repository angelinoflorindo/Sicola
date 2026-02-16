import Link from "next/link";
import { cursos } from "@/lib/cursos";

export default function Conteudo() {
  return (
    <div id="container">
      <h2 className="text-2xl font-bold mb-6">Disciplinas Disponíveis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cursos.map((curso) => (
          <Link
            key={curso.id}
            href={`/usuario/aulas/${curso.id}`}
            className="p-6 border rounded-xl hover:shadow-xl transition"
          >
            <h2 className="text-xl font-semibold">{curso.nome}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
