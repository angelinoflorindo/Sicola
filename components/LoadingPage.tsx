// components/LoadingScreen.tsx
export default function LoadingPage({ mensagem = "Carregando dados..." }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 w-full">
      <div className="relative flex items-center justify-center">
        {/* Spinner Exterior */}
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
        {/* Círculo de Pulso Interior */}
        <div className="absolute rounded-full h-8 w-8 bg-blue-400 animate-ping opacity-75"></div>
      </div>
      <h2 className="mt-6 text-xl font-semibold text-slate-700 animate-pulse">
        {mensagem}
      </h2>
      <p className="mt-2 text-slate-500 text-sm">Por favor, aguarde um momento.</p>
    </div>
  );
}