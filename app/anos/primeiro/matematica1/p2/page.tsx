"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import LoadingPage from "@/components/LoadingPage";

export default function Simular() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const validarPagamento = async () => {
      try {
        const resp = await fetch("/api/usuario/pagamento", {
          method: "POST",
        });

        if (!resp.ok) {
          router.push("/usuario/pagamentos");
          return;
        }

        setAuthorized(true);
      } catch (error) {
        console.error("Erro ao validar pagamento:", error);
        router.push("/usuario/pagamentos");
      } finally {
        setLoading(false);
      }
    };

    validarPagamento();
  }, [router]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!authorized) {
    return null; // evita flash de conteúdo
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <Conteudo />
        </main>
      </div>
    </div>
  );
}
