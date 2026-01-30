"use client";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import Conteudo from "./conteudo";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AcessoProps, PagamentoProps } from "@/services/userService";
import styles from "@/modules/login.module.css"
export default function ContaPage() {
  const [acesso, setAcesso] = useState<any>();
  const [pagamento, setPagamento] = useState<any>();

  const router = useRouter();

  const fetchAcesso = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/pagamento/acesso/validar`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Erro na requisição");
        }
        return res.json();
      })
      .then((data: AcessoProps) => {
        setAcesso(data);
      })
      .catch((error) => {
        console.log("Error message", error);
        router.push("/");
      });
  };

  const fetchPagamento = async () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/pagamento/validar`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Erro na requisição");
        }
        return res.json();
      })
      .then((data:PagamentoProps) => {
        setPagamento(data);
      })
      .catch((error) => {
        console.log("Error message", error);
        router.push("/");
      });
  };

  useEffect(() => {
    fetchAcesso();
    fetchPagamento()
  }, []);

  return (
    <div className={styles.section}>
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <Conteudo getAcesso={acesso} getPagamento={pagamento} />
        </main>
      </div>
    </div>
  );
}
