"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ANOS = [1, 2, 3, 4];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex w-64 bg-blue-900 text-white flex-col p-4">
      <h1 className="text-2xl font-bold mb-6">SICOLA</h1>

      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Link
              href="/"
              className={`block px-3 py-2 rounded ${
                pathname === "/" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              🏠 Dashboard
            </Link>
          </li>

          <li className="mt-4 text-sm text-blue-200 uppercase">
            Anos Académicos
          </li>

          {ANOS.map((ano) => (
            <li key={ano}>
              <Link
                href={`/anos/${ano}`}
                className={`block px-3 py-2 rounded ${
                  pathname === `/anos/${ano}`
                    ? "bg-blue-700"
                    : "hover:bg-blue-800"
                }`}
              >
                🎓 {ano}º Ano
              </Link>
            </li>
          ))}

          <li className="mt-4">
            <Link
              href="/resultados"
              className={`block px-3 py-2 rounded ${
                pathname === "/resultados" ? "bg-blue-700" : "hover:bg-blue-800"
              }`}
            >
              📊 Resultados
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
