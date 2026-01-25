"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Resultados() {
  const [data, setData] = useState()
  const router = useRouter()
  const fetchProva = async () => {
    const resp = await fetch("/api/usuario/pagamento/acesso/validar", {
      method: "POST",
    });

    if (!resp.ok) {
      router.replace("/usuario/pagamentos");
    }
  };

  useEffect(() => {
    fetchProva()
  }, []);

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
