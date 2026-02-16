"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { cursos } from "@/lib/cursos";

export default function CursoPage() {
  const { curso } = useParams();

  const cursoSelecionado = cursos.find(c => c.id === curso);

  if (!cursoSelecionado) return <p>Curso não encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8">
        {cursoSelecionado.nome}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {cursoSelecionado.modulos.map(modulo => (
          <Link
            key={modulo.id}
            href={`/usuario/aulas/${curso}/${modulo.id}`}
            className="p-6 border rounded-xl hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">
              {modulo.nome}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}