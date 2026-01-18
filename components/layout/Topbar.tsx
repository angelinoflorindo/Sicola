import Link from "next/link";
import DropDown  from "@/components/dropDown/index"

export default function Topbar() {
  return (
    <header className="bg-white shadow px-4 py-3 flex justify-between items-center">
      <Link href="/">
        <span className="font-semibold"> SICOLA - Simulação de Provas</span>
      </Link>

      <DropDown userRole="ESTUDANTE" ></DropDown>
    </header>
  );
}
