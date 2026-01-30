
export interface Tabela {
  cabecalho: string[];
  dados: (string | number)[][];
}


export default function TabelaCard({ tabela }:{tabela:Tabela}) {
  if (!tabela) return null;

  const { cabecalho, dados } = tabela;

  return (
    <div id="container" className="overflow-x-auto my-4">
      <table className="min-w-full border border-gray-300 text-sm text-center">
        <thead className="bg-gray-100">
          <tr>
            {cabecalho.map((col, i) => (
              <th
                key={i}
                className="border px-3 py-2 font-semibold"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {dados.map((linha:any, i:any) => (
            <tr key={i} className="even:bg-gray-50">
              {linha.map((celula:any, j:any) => (
                <td key={j} className="border px-3 py-2">
                  {celula.toLocaleString("pt-BR")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
