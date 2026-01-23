'use client'
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AcessoProps } from "@/services/userService";


export default function ContaPage() {
  
  const [acesso, setAcesso] = useState<any>()
  const router = useRouter();
  
  const fetchAcesso =  async() => {
  await  fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/pagamento`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Erro na requisição");
        }
        return res.json();
      })
      .then((data:AcessoProps) => {
        setAcesso(data)

      })
      .catch((error) => {
        console.log("Error message", error);
        router.push("/");
      });
  };

  useEffect(() => {
      fetchAcesso();
  }, []);



  return (
    <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col">
            <Topbar />
            <main className="p-4 md:p-8">
              <Conteudo getAcesso={acesso} />
            </main>
          </div>
        </div>
  );
}
