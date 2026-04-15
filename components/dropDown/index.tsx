"use client";
import { useState } from "react";

type Role = "ADMIN" | "ESTUDANTE" | "ORIENTADOR" | "VISITANTE" | "CANDIDATO";

interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  {
    label: "Painel Principal",
    path: "/dashboard",
    roles: ["ADMIN", "ESTUDANTE", "ORIENTADOR", "VISITANTE", "CANDIDATO"],
  },
  {
    label: "Meu Perfil",
    path: "/usuario",
    roles: ["ADMIN", "ESTUDANTE", "ORIENTADOR", "VISITANTE", "CANDIDATO"],
  },

  /*
   {
    label: "Portal de  Pagamentos",
    path: "/usuario/pagamentos",
    roles: ["ESTUDANTE"],
  },
  */
  /*
*/

  {
    label: "Aulas consultivas",
    path: "/usuario/aulas",
    roles: ["ESTUDANTE", "VISITANTE", "CANDIDATO"],
  },
  {
    label: "Painel do Orientador",
    path: "/usuario/orientacao/painel",
    roles: ["ORIENTADOR"],
  },

  {
    label: "Materias acadêmicos",
    path: "/usuario/materias",
    roles: ["ESTUDANTE", "VISITANTE", "CANDIDATO"],
  },
  {
    label: "Marcar Orientação",
    path: "/usuario/orientacao",
    roles: ["ESTUDANTE", "VISITANTE", "CANDIDATO"],
  },
  {
    label: "Simulação de Provas",
    path: "/dashboard/simulados",
    roles: ["ESTUDANTE", "ORIENTADOR", "VISITANTE", "CANDIDATO"],
  },
  {
    label: "Sugestões & Reclamações",
    path: "/usuario/sugestoes",
    roles: ["ESTUDANTE", "ORIENTADOR", "VISITANTE", "CANDIDATO"],
  },
  { label: "Gerir Pagamentos", path: "/gestao/pagamentos", roles: ["ADMIN"] },
  { label: "Gerir Ebooks", path: "/gestao/ebooks", roles: ["ADMIN"] },
  { label: "Gerir Disciplinas", path: "/gestao/disciplina", roles: ["ADMIN"] },
  { label: "Gerir Sugestões", path: "/gestao/sugestao", roles: ["ADMIN"] },
  { label: "Gerir Usuarios", path: "/gestao/usuario", roles: ["ADMIN"] },
  { label: "Gerir Orientadores", path: "/gestao/orientador", roles: ["ADMIN"] },
  {
    label: "Terminar a Sessão",
    path: "/usuario/logout",
    roles: ["ESTUDANTE", "ADMIN", "ORIENTADOR", "VISITANTE", "CANDIDATO"],
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
