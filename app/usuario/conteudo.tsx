"use client";
import LoadingPage from "@/components/LoadingPage";
import { UserPerfonal } from "@/services/userService";
import { useEffect, useState } from "react";

export default function Conteudo({ users }: { users: UserPerfonal }) {
  const [faculdade, setFaculdade] = useState("");
  const fetchData = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/universidade`,
    );

    if (!resp.ok) {
      throw new Error("Erro de busca");
    }

    const data = await resp.json();
    data.map((item: any) => {
      if (item.id === Number(users.universidade_id)) {
        setFaculdade(item.nome);
        return;
      }
    });
  };

  useEffect(() => {
    if (users.universidade_id) {
      fetchData();
    }
  }, [users.universidade_id]);

  if (!users.primeiro_nome || !users.email) {
    return <LoadingPage />;
  }
  return (
    <div id="container" className="bg-gray-50 py-5 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>
        <div className="flex flex-col">
          <span className="py-1">
            Nome Completo:{" "}
            <b>
              {users?.primeiro_nome} {users.segundo_nome}
            </b>
          </span>
          <span className="py-1">
            Telemovel: <b>{users?.telemovel}</b>
          </span>
          <span className="py-1">
            Email: <b>{users?.email}</b>
          </span>

          <span className="py-1">
            Universidade: <b>{faculdade}</b>
          </span>
        </div>
      </div>
    </div>
  );
}
