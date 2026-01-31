"use client";

import Link from "next/link";
import DropDown from "@/components/dropDown/index";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserPerfonal } from "@/services/userService";

export default function Topbar() {
  type Role = 'ADMIN' | 'ESTUDANTE' | 'EXPLICADOR'
  const { data: session, status } = useSession();
  const [perfil, setPerfil] = useState<Role>('ESTUDANTE');
  const nome = session?.user.name;
  const router = useRouter()
  
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/personal?email=${session?.user.email}`)
      .then((res) => {
        if (!res.ok) {
          router.push("/dashboard");
        }
        
        return res.json();
      })
      .then((data:UserPerfonal)=>{
        if(data){
          setPerfil(data.perfil)
        }

      })
  
  }, []);


  return (
    <header  className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/dashboard">
        <span className="font-semibold"> SICOLA - Simulação de Provas</span>
      </Link>

      <DropDown userPerfil={perfil} userNome={nome}></DropDown>
    </header>
  );
}
