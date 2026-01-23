"use client";

import React, { useEffect, useState } from "react";
import Conteudo from "./conteudo";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserPerfonal } from "@/services/userService";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";

const Usuario = () => {
  const [userData, setUser] = useState<UserPerfonal>({
    id: "",
    email: "",
    curso: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    perfil:"",
    estado:""
  });
  const { data: session, status } = useSession();
  const router = useRouter();

  const fetchData = () => {
    fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/personal?email=${session?.user?.email}`
    )
      .then((res) => {
        if (!res.ok) {
          throw Error("Erro na requisição");
        }
        return res.json();
      })
      .then((users: UserPerfonal) => {
        setUser(users);
      })
      .catch((error) => {
        console.log("Error message", error);
        router.push("/");
      });
  };

  useEffect(() => {
    if (session?.user.email) {
      fetchData();
    }
  }, []);


  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-4 md:p-8">
          <Conteudo users={userData} />
        </main>
      </div>
    </div>
  );
};

export default Usuario;
