import Link from "next/link";

export default function Topbar() {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/">
        <span className="font-semibold"> SICOLA - Simulação de Provas</span>
      </Link>
      <span className="text-sm text-gray-600">👤 Estudante</span>
    </header>
  );
}
