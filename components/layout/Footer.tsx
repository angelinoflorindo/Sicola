export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full text-center text-sm text-gray-500 py-4 border-t">
      © {year} Sicola. Todos os direitos reservados. <br />
      <b>Grupo SAV</b> - Somos Academia de Vida  <br />
      By <b> Angelino Francisco</b>

    </footer>
  );
}
