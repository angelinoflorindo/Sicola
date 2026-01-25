"use client";
import { CheckCircle } from "lucide-react";

export default function OperacaoSucesso() {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center animate-fadeIn">
        <CheckCircle size={72} className="text-green-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Operação realizada com sucesso!
        </h2>

        <p className="text-gray-600 mb-6">
          Aguarde até ser validado o seu comprovativo. 
          Estamos a redirecioná-lo para o dashboard.
        </p>

        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 animate-progress" />
        </div>
      </div>
    </div>
  );
}
