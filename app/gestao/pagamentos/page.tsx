"use client";

import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";

export default function Pagamentos() {
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
