import ContadorAcesso from "@/components/ui/contador";
import { AcessoProps, PagamentoProps } from "@/services/userService";

export default function Pagamentos({
  getAcesso,
  getPagamento,
}: {
  getAcesso: AcessoProps | null;
  getPagamento: PagamentoProps | null;
}) {
  const temAcesso = !!getAcesso;
  const temPagamento = !!getPagamento;

  const statusLabel =
    getPagamento?.status === "PENDENTE"
      ? "O seu pagamento está sendo validado. Aguarde até receber o acesso!"
      : getPagamento?.status === "PAGO"
      ? "O seu pagamento já foi validado!"
      : "Faça o pagamento para garantir acesso contínuo às simulações."

  const planoLabel =
    getAcesso?.plano === "BASICO"
      ? "Plano Básico (Diário)"
      : getAcesso?.plano === "PREMIUM"
      ? "Plano Premium (Semanal)"
      : "Plano gratuito";

  const statusAtivo = getAcesso?.estado === true;

  return (
    <div id="container" className="bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Portal de pagamentos
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Plano */}
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Plano Atual</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {temAcesso ? planoLabel : "Sem plano activo"}
            </p>
          </div>

          {/* Status */}
          <div className="text-center bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Status</p>

            {temAcesso ? (
              <span
                className={` inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium
                ${
                  statusAtivo
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {statusAtivo ? "Activo" : "Inactivo"}
              </span>
            ) : (
              <span className="inline-flex items-center mt-2 px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600">
                Inactivo
              </span>
            )}
          </div>

          {/* Validade */}
          <div className="text-center bg-white rounded-2xl shadow-sm p-6">
            <p className="text-sm text-gray-500">Validade</p>
            <p className="text-xl font-semibold text-gray-800 mt-1">
              {temAcesso ? getAcesso.fim.split("T")[0] : "--"}
            </p>
          </div>
        </div>

        {/* Contador (opcional, se já existir lógica) */}
        {temAcesso && statusAtivo && (
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <ContadorAcesso getFim={getAcesso.fim} />
          </div>
        )}

        {/* Ação */}
        <div className="bg-white rounded-2xl shadow-sm p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-blue-800">
            {temPagamento ? statusLabel : "Faça o pagamento para renovar!"}
          </p>

          <a
            href="/usuario/pagamentos/renovar"
            className="inline-flex justify-center bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl font-medium"
          >
            Renovar Acesso
          </a>
        </div>
      </div>
    </div>
  );
}
