'use client'

import { Formula } from "@/components/math/Formula";


interface TabelaQuestao {
  cabecalho: string[];
  subcabecalho?: string[];
  dados: (string | number)[][];
}
  // Renderizar fórmulas LaTeX no texto
  const renderComLatex = (texto: string) => {
    return  <Formula latex={texto} />
  };

  // Renderizar tabela
export default function TabelaCard  (tabela: TabelaQuestao) {
    const { cabecalho, subcabecalho, dados } = tabela;
    
    return (
      <div className="overflow-x-auto my-4">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead className="bg-gray-100">
            <tr>
              {cabecalho.map((col:any, idx:any) => (
                <th 
                  key={idx} 
                  className="border border-gray-300 px-3 py-2 text-left font-semibold"
                  colSpan={subcabecalho && idx === 0 ? 1 : cabecalho.length > 4 ? 1 : undefined}
                >
                  {renderComLatex(col)}
                </th>
              ))}
            </tr>
            {subcabecalho && (
              <tr>
                {subcabecalho.map((col, idx) => (
                  <th key={idx} className="border border-gray-300 px-3 py-2 text-left font-medium">
                    {renderComLatex(col)}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {dados.map((linha:any, rowIndex:any) => (
              <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                {linha.map((celula:any, cellIndex:any) => (
                  <td key={cellIndex} className="border border-gray-300 px-3 py-2">
                    {typeof celula === 'string' && celula.includes('\\') 
                      ? renderComLatex(celula)
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



{/*
  
  
    return (
    <div className="overflow-x-auto my-4">
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
  
  */}