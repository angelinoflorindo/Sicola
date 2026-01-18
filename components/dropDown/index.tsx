
'use client'

import { useState } from 'react';

type Role = 'ADMIN' | 'ESTUDANTE';

interface MenuItem {
  label: string;
  path: string;
  roles: Role[];
}

const menuItems: MenuItem[] = [
  { label: 'Meu Perfil', path: '/usario/perfil', roles: ['ESTUDANTE'] },
  { label: 'Portal de  Pagamentos', path: '/usuario/pagementos', roles: ['ESTUDANTE'] },
  { label: 'Portal de Reclamações', path: '/usuario/reclamacoes', roles: ['ESTUDANTE'] },
  { label: 'Portal de  Sugestões', path: '/usuario/sugestoes', roles: ['ESTUDANTE'] },
  { label: 'Marcar Explicação', path: '/usario/explicadores', roles: ['ESTUDANTE'] },
  { label: 'Terminar a Sessão', path: '/usurio/logout', roles: ['ESTUDANTE'] },
  { label: 'Gerir Perfil', path: '/gestao/perfil', roles: ['ADMIN'] },
  { label: 'Gerir Pagamentos', path: '/gestao/pagamentos', roles: ['ADMIN'] },
  { label: 'Gerir Códigos', path: '/gestao/codigos', roles: ['ADMIN'] },
  { label: 'Gerir Reclamações', path: '/gestao/reclamacoes', roles: ['ADMIN'] },
];


export default function DropDown({ userRole }: {userRole:Role}) {
  const [open, setOpen] = useState(false);

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="bg-gray-400 text-white px-4 py-2 rounded-lg   hover:bg-gray-300 transition"
      >
        👤 Painel do Estudante
      </button>

      {open && (
        <div className="absolute mt-2 w-45 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {filteredItems.map(item => (
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
