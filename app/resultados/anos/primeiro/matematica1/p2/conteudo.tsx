'use client'
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";
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
     

      <div>
        <Link href={"/dashboard"}>
          {" "}
          <button>Voltar a página principal</button>
        </Link>
        <Link href={"/anos/primeiro/matematica1/p2"}>
          {" "}
          <button>Voltar a realizar a prova</button>
        </Link>
      </div>
    </section>
  );
}
