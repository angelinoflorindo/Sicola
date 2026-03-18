import Link from "next/link";
import Image from "next/image";

export default function Conteudo() {
  return (
    <div id="container">
      <h2 className="text-2xl font-bold mb-6">Todos Orientadores</h2>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
       
        
          <div className="flex flex-col justify-center px-5 py-5 align-center text-center bg-gray-200 rounded-xl shadow">
          <Image
            src="/images/mauro.png"
            alt="imagens"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />

          <h3 className="font-bold text-lg">Mauro da Silva</h3>
          <h2 className="text-sm">Estatística</h2>
          <h2 className=" text-sm">ISAF - GBS</h2>
          <Link
            href={`/usuario/orientacao/1`}
            className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            consultar
          </Link>
        </div>

          <div className="flex flex-col justify-center px-5 py-5 align-center text-center bg-gray-200 rounded-xl shadow">
          <Image
            src="/images/fenilanio.png"
            alt="imagens"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />

          <h3 className="font-bold text-lg">Fenilânio Sobral</h3>
          <h2 className="text-sm">Contabilidade Geral I</h2>
          <h2 className="text-sm">Contabilidade Geral II</h2>
          <h2 className=" text-sm">ISAF - CF</h2>
          <Link
            href={`/usuario/orientacao/1`}
            className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            consultar
          </Link>
        </div>

          <div className="flex flex-col justify-center px-5 py-5 align-center text-center bg-gray-200 rounded-xl shadow">
          <Image
            src="/images/orientador3.png"
            alt="imagens"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />

          <h3 className="font-bold text-lg">Terceiro Orientador</h3>
          <h2 className="text-sm">Matemática I</h2>
          <h2 className="text-sm">Matemática II</h2>
          <h2 className=" text-sm">ISAF - GBS</h2>
          <Link
            href={`/usuario/orientacao/1`}
            className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            consultar
          </Link>
        </div>

          <div className="flex flex-col justify-center px-5 py-5 align-center text-center bg-gray-200 rounded-xl shadow">
          <Image
            src="/images/angelino.png"
            alt="imagens"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />

          <h3 className="font-bold text-lg">Quarto Orientador</h3>
          <h2 className="text-sm">Programação</h2>
          <h2 className=" text-sm">ISAF - IGF</h2>
          <Link
            href={`/usuario/orientacao/1`}
            className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            consultar
          </Link>
        </div>


        <div className="flex flex-col justify-center px-5 py-5 align-center text-center bg-gray-200 rounded-xl shadow">
          <Image
            src="/images/angelinoFrancisco.png"
            alt="imagens"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />

          <h3 className="font-bold text-lg">Angelino Francisco</h3>
          <h2 className="text-sm">Cálculo Financeiro</h2>
          <h2 className=" text-sm">ISAF - GBS</h2>
          <Link
            href={`/usuario/orientacao/1`}
            className="mt-4 inline-block text-center bg-blue-600 text-white py-2 px-4 rounded-xl hover:bg-blue-700 transition"
          >
            consultar
          </Link>
        </div>
      </div>

      <h2 className="text-2xl font-bold mb-9">Saiba como se tornar Orientador</h2>
      <h4 className="text-2xl font-semibold">Saiba como se tornar Orientador</h4>
      <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"> 

      </div>
    </div>
  );
}
