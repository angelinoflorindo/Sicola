import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export default function Conteudo() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  useEffect(() => {
    async function validar() {
      const resp = await fetch("/api/usuario/pagamento", {
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
    <section className="max-w-3xl mx-auto">
      <h2 className="font-bold text-lg">Exame</h2>
    </section>
  );
}
