"use client";
import { useState } from "react";

type Role = "ADMIN" | "ESTUDANTE" | "EXPLICADOR";

interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  {
    label: "Meu Perfil",
    path: "/usuario",
    roles: ["ADMIN", "ESTUDANTE", "EXPLICADOR"],
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
    roles: ["ESTUDANTE","EXPLICADOR"],
  },
*/
  {
    label: "Portal de  Sugestões",
    path: "/usuario/sugestoes",
    roles: ["ESTUDANTE", "EXPLICADOR"],
  },
  /*
  
  {
    label: "Marcar Explicação",
    path: "/develop",
    roles: ["ESTUDANTE"],
  },
  
  */
  {
    label: "Aulas consultivas",
    path: "/usuario/aulas",
    roles: ["ESTUDANTE"],
  },
  {
    label: "Materias acadêmicos",
    path: "/usuario/materias",
    roles: ["ESTUDANTE"],
  },
  { label: "Gerir Usuarios", path: "/gestao/usuario", roles: ["ADMIN"] },
  { label: "Gerir Pagamentos", path: "/gestao/pagamentos", roles: ["ADMIN"] },
  { label: "Gerir Ebooks", path: "/gestao/ebooks", roles: ["ADMIN"] },
  //{ label: "Gerir Reclamações", path: "/gestao/reclamacoes", roles: ["ADMIN"] },
  { label: "Gerir Sugestões", path: "/gestao/sugestoes", roles: ["ADMIN"] },
  {
    label: "Terminar a Sessão",
    path: "/usuario/logout",
    roles: ["ESTUDANTE", "ADMIN", "EXPLICADOR"],
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
