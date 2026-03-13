import Link from "next/link";
import Image from "next/image";

export default function DashBoardContent() {
  return (
    <div id="container">
      <h2 className="text-2xl font-bold mb-6">Painel principal</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Link href={`/usuario/aulas`}>
          <div
            id="dashboard-items"
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <Image
              src="/images/aulasConsultivas.png"
              alt="imagens - Dashboard"
              width={50} // define a largura base do Next.js
              height={50} // define altura base do Next.js
              className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
            />

            <h3 className="font-semibold text-lg">Aulas Consultivas</h3>
          </div>
        </Link>

        <Link href={`/usuario/materias`}>
          <div
            id="dashboard-items"
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <Image
              src="/images/materiasAcademicos.png"
              alt="imagens - Dashboard"
              width={50} // define a largura base do Next.js
              height={50} // define altura base do Next.js
              className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
            />

            <h3 className="font-semibold text-lg">Materias Acadêmicos</h3>
          </div>
        </Link>

        <Link href={`/develop`}>
          <div
            id="dashboard-items"
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <Image
              src="/images/orientacao.png"
              alt="imagens - Dashboard"
              width={40} // define a largura base do Next.js
              height={40} // define altura base do Next.js
              className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
            />

            <h3 className="font-semibold text-lg">Marcar Orientação</h3>
          </div>
        </Link>

        <Link href={`/dashboard/simulados`}>
          <div
            id="dashboard-items"
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <Image
              src="/images/simulados.png"
              alt="imagens - Dashboard"
              width={40} // define a largura base do Next.js
              height={40} // define altura base do Next.js
              className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
            />

            <h3 className="font-semibold text-lg">Simulação de Provas</h3>
          </div>
        </Link>

        <Link href={`/usuario`}>
          <div
            id="dashboard-items"
            className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition"
          >
            <Image
              src="/images/meuPerfil.png"
              alt="imagens - Dashboard"
              width={40} // define a largura base do Next.js
              height={40} // define altura base do Next.js
              className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
            />

            <h3 className="font-semibold text-lg">Meu Perfil</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
