'use client'

import { Formula } from "@/components/math/Formula";


interface TabelaQuestao {
  cabecalho: string[];
  subcabecalho?: string[];
  dados: (string | number)[][];
}

interface TabelaProps{
  tabela:TabelaQuestao
}
 
  const TabelaCard: React.FC<TabelaProps> = ({
    tabela
  }) => {

    return (
      <div  id="container" className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {tabela && tabela.cabecalho.map((col:any, idx:any) => (
                <th 
                  key={idx} 
                  className="border border-gray-300 px-3 py-2 text-left font-semibold"
                  colSpan={tabela.subcabecalho && idx === 0 ? 1 : tabela.cabecalho.length > 4 ? 1 : undefined}
                >
                  <span>{col}</span>
                </th>
              ))}
            </tr>
            {tabela.subcabecalho && (
              <tr>
                {tabela.subcabecalho.map((col, idx) => (
                  <th key={idx} className="border border-gray-300 px-3 py-2 text-left font-medium">
                    <span>{col}</span>
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {tabela.dados.map((linha:any, rowIndex:any) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {linha.map((celula:any, cellIndex:any) => (
                  <td key={cellIndex} className="border border-gray-300 px-3 py-2">
                    {typeof celula === 'string' && celula.includes('\\') 
                      ? celula
                      : celula.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
                    }
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };


  export default TabelaCard;

