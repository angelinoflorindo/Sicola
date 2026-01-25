import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
import Card from "@/components/ui/Card";
import Link from "next/link";

export default function Conteudo() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    async function validar() {
      const resp = await fetch("/api/usuario/pagamento/acesso/validar", {
        method: "POST",
      });

      if (!resp.ok) {
        router.replace("/usuario/pagamentos");
      }
      setActive(true);
    }

    validar();
  }, [router]);

  if (!active) {
    return <LoadingPage />;
  }
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">Resultados</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card title="Matemática I" description="Nota: 15/20" />
        <Card title="Estatística" description="Nota: 13/20" />
      </div>

      <div>
       <Link href={'/dashboard'} > <button>Voltar a página principal</button></Link>
       <Link href={'/anos/primeiro/matematica1/p2'} > <button>Voltar a realizar a prova</button></Link>
      </div>
    </section>
  );
}
