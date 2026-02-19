import Link from "next/link";
import Image from "next/image";
import { ebooks } from "@/lib/ebooks";


export default function Conteudo() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      
      {/* Cabeçalho */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Materiais Acadêmicos
        </h1>
        <p className="text-gray-500 mt-2">
          Guias práticos e ebooks preparados para apoiar o seu desempenho académico.
        </p>
      </div>

      {/* Grid de ebooks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {ebooks.map((ebook) => (
          <div
            key={ebook.id}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
          >
            {/* Capa */}
            <div className="relative w-full h-56 overflow-hidden">
              <Image
                src={ebook.imagem}
                alt={ebook.titulo}
                fill
                className="object-cover group-hover:scale-105 transition duration-500"
              />
            </div>

            {/* Conteúdo */}
            <div className="p-5 flex flex-col justify-between h-48">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  {ebook.titulo}
                </h2>
              
              </div>

              <Link
                href={`/usuario/materias/${ebook.codigo}`}
                className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}