"use client";
import { useState } from "react";

type Role = "ADMIN" | "ESTUDANTE" | "ORIENTADOR" | "VISITANTE";

interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  {
    label: "Painel Principal",
    path: "/dashboard",
    roles: ["ADMIN", "ESTUDANTE", "ORIENTADOR", "VISITANTE"],
  },
  {
    label: "Meu Perfil",
    path: "/usuario",
    roles: ["ADMIN", "ESTUDANTE", "ORIENTADOR", "VISITANTE"],
  },

  /*
   {
    label: "Portal de  Pagamentos",
    path: "/usuario/pagamentos",
    roles: ["ESTUDANTE"],
  },
  */
  /*

{
    label: "Portal de Reclamações",
    path: "/usuario/reclamacoes",
    roles: ["ESTUDANTE","ORIENTADOR"],
  },
*/
  
  {
    label: "Aulas consultivas",
    path: "/usuario/aulas",
    roles: ["ESTUDANTE", "VISITANTE"],
  },
  {
    label: "Materias acadêmicos",
    path: "/usuario/materias",
    roles: ["ESTUDANTE", "VISITANTE"],
  },
    {
    label: "Marcar Orientação",
    path: "/develop",
    roles: ["ESTUDANTE", "VISITANTE"],
  },
  {
    label: "Simulação de Provas",
    path: "/dashboard/simulados",
    roles: ["ESTUDANTE", "ORIENTADOR", "VISITANTE"],
  },
  {
    label: "Portal de  Sugestões",
    path: "/usuario/sugestoes",
    roles: ["ESTUDANTE", "ORIENTADOR", "VISITANTE"],
  },
  { label: "Gerir Usuarios", path: "/gestao/usuario", roles: ["ADMIN"] },
  { label: "Gerir Pagamentos", path: "/gestao/pagamentos", roles: ["ADMIN"] },
  { label: "Gerir Ebooks", path: "/gestao/ebooks", roles: ["ADMIN"] },
  //{ label: "Gerir Reclamações", path: "/gestao/reclamacoes", roles: ["ADMIN"] },
  { label: "Gerir Sugestões", path: "/gestao/sugestoes", roles: ["ADMIN"] },
  {
    label: "Terminar a Sessão",
    path: "/usuario/logout",
    roles: ["ESTUDANTE", "ADMIN", "ORIENTADOR", "VISITANTE"],
  },
];

export default function DropDown({
  userPerfil,
  userNome,
}: {
  userPerfil: Role;
  userNome: String;
}) {
  const [open, setOpen] = useState(false);
  const filteredItems = menuItems.filter((item) =>
    item.roles.includes(userPerfil),
  );

  return (
    <div className="relative inline-block text-left" id="container">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg   hover:bg-gray-300 transition"
      >
        👤 Painel de {userNome}
      </button>

      {open && (
        <div className="absolute mt-2 w-45 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {filteredItems.map((item) => (
              <a
                key={item.path}
                href={item.path}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
