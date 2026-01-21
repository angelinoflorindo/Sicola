"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ANOS = [1, 2, 3, 4];
const Links = ["primeiro", "segundo", "terceiro", "quarto"];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-blue-900 text-white flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">SICOLA</h1>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/dashboard"
              className={`block px-3 py-2 rounded ${
                pathname === "/dashboard" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              Painel Principal
            </Link>
          </li>

          <li className="mt-4 text-sm text-blue-200 uppercase">
            Anos Académicos
          </li>

          <li>
            <Link
              href={`/anos/primeiro`}
              className={`block px-3 py-2 rounded ${
                pathname === `/anos/primeiro`
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
            >
              🎓 1º Ano
            </Link>
          </li>

          
          <li>
            <Link
              href={`/anos/segundo`}
              className={`block px-3 py-2 rounded ${
                pathname === `/anos/segundo`
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
            >
              🎓 2º Ano
            </Link>
          </li>

          
          <li>
            <Link
              href={`/anos/terceiro`}
              className={`block px-3 py-2 rounded ${
                pathname === `/anos/terceiro`
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
            >
              🎓 3º Ano
            </Link>
          </li>

          
          <li>
            <Link
              href={`/anos/quarto`}
              className={`block px-3 py-2 rounded ${
                pathname === `/anos/quarto`
                  ? "bg-blue-700"
                  : "hover:bg-blue-800"
              }`}
            >
              🎓 4º Ano
            </Link>
          </li>

          <li className="mt-4">
            <Link
              href="/resultados"
              className={`block px-3 py-2 rounded ${
                pathname === "/resultados" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              Resultados
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
