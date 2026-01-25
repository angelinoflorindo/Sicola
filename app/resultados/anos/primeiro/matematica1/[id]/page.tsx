"use client";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";

export default function Matematica() {
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
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <Conteudo  />
        </main>
      </div>
    </div>
  );
}
