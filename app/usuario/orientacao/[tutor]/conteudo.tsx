"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { OrientadorInfo } from "@/services/userService";

import OperacaoSucesso from "@/components/ui/operacaoSucesso";
import LoadingPage from "@/components/LoadingPage";
const MATERIAL_PRECO = 3000;

function calcularPreco(item: string, sessoes: number) {
  if (item === "Online") {
    if (sessoes <= 9) return sessoes * 2000;

    return sessoes * 1500;
  }

  return sessoes * 5000;
}

export default function Conteudo() {
  const [sessoes, setSessao] = useState<any[]>([]);
  const [collection, setCollection] = useState<any[]>([]);
  const [formato, setFormato] = useState("");
  const [disponibilidade, setDisponibilidade] = useState<any[]>([]);
  const [operacaoSucesso, setOperacaoSucesso] = useState(false);
  const [loading, setLoading] = useState(true);
  const [orientador, setOrientador] = useState<OrientadorInfo>({
    id: "",
    email: "",
    curso: "",
    password: "",
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    perfil: "",
    estado: "",
    createdAt: "",
    situacao: "",
    filename: "",
    updatedAt: "",
    UserDisciplina: [],
    Universidade:''
  });
  const [total, setTotal] = useState(0);
  const [valorBase, setBase] = useState(0);
  const [foto, setFoto] = useState<File | null>(null);
  const router = useRouter();
  const { tutor } = useParams();
  const id = Number(tutor);

  const toggleSessao = (dia: string, form: string, data: any) => {
    setFormato(form);
    if (sessoes.includes(dia)) {
      const result = sessoes.filter((d) => d !== dia);
      const filtered = collection.filter((d) => d != data);
      setSessao(result);
      setCollection(filtered);
    } else {
      setSessao([...sessoes, dia]);
      setCollection([...collection, data]);
    }
  };

  const fetchDisponibilidade = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/disponibilidade/${id}`,
    );
    const data = await res.json();
    setLoading(false);
    setDisponibilidade(data);
  };

  const fetchOrientador = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientador/${id}`,
    );
    const data = await resp.json();
    setLoading(false);
    setOrientador(data);
  };

  const handleSubmit = async () => {
    try {
      if (!foto) {
        alert("anexa o comprovativo de pagamento");
        return;
      }

      if (!total) {
        alert("Escolha sessões de orientação");
        return;
      }

      if (!formato) {
        alert("Escolha modalidade das sessões");
        return;
      }
      const formData = new FormData();

      formData.append("sessoes", JSON.stringify(collection));
      formData.append("valor", String(total));
      formData.append("file", foto);
      formData.append("formato", formato);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/orientacao`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!res.ok) throw new Error("Erro ao submeter");

      setOperacaoSucesso(true);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      alert("Erro ao enviar candidatura");
      router.push(`/usuario/orientacao/${id}`);
    }
  };
  const verifyDias = async () => {
    if (sessoes.length > 0) {
      let base = calcularPreco(formato, sessoes.length);
      const sum = base + MATERIAL_PRECO;
      setTotal(sum);
      setBase(base);
    }

    if (sessoes.length === 0) {
      setTotal(0);
      setBase(0);
    }
  };

  useEffect(() => {
    verifyDias();
  }, [sessoes.length]);

  useEffect(() => {
    fetchOrientador();
    fetchDisponibilidade();
  }, []);

  if (loading) return <LoadingPage />;
  return (
    <>
      {operacaoSucesso && <OperacaoSucesso />}

      <div className="min-h-screen bg-gray-50 py-4 px-4">
        <div className="max-w-2xl mx-auto bg-white p-4 rounded-2xl shadow space-y-4">
          {/* INFORMAÇÕES DO ORIENTADOR */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6   p-4">
            <div className="mx-auto">
              <Image
                src={
                  orientador.filename === "N/D"
                    ? "/candidatos/candidate.png"
                    : `/candidatos/${orientador.filename}`
                }
                alt="perfil indisponível"
                width={120}
                height={120}
                className="rounded-full object-cover mb-4"
              />

              <div className="text-center">
                <h3 className="font-semibold text-lg text-gray-800">
                  {orientador.primeiro_nome} {orientador.segundo_nome}
                </h3>
                <p className="text-xs text-gray-500 mb-2">
                  {"Universidade"} 
                </p>
                <p className="text-xs bg-gray-100 text-green-500 p-2 rounded">
                  {"Whatssap"} - {orientador.telemovel}
                </p>
              </div>
            </div>
            <div className=" flex flex-col rounded-2xl shadow-md   p-6">
              <h3 className="font-semibold text-lg text-gray-800">
                Disciplinas de orientação
              </h3>

              <span className="py-4 ">
                {orientador.UserDisciplina.map((d) => (
                  <span key={d.id} className=" space-y-2">
                    {" "}
                    {d.Disciplina.nome} <br />
                  </span>
                ))}
              </span>
            </div>
          </div>

          {/* INFORMAÇÕES DE DISPONIBILIDADE*/}
          <div>
            <h2 className="text-lg font-semibold py-4">
              {" "}
              Escolher sessões/dias de orientação
            </h2>
            <table className="w-full">
              <thead className="bg-gray-100 text-gray-600 text-sm">
                <tr>
                  <th className="p-4 text-left">Data</th>
                  <th className="p-4 text-left">Modalidade</th>
                  <th className="p-4 text-left">Duração</th>
                  <th className="p-4 text-left">Estado</th>
                </tr>
              </thead>

              <tbody>
                {disponibilidade.map((d) => {
                  const data = new Date(d.data_sessao);

                  const diaSemana = data.toLocaleDateString("pt-PT", {
                    weekday: "long",
                  });

                  const diaNumerico = data.toLocaleDateString("pt-PT", {
                    day: "numeric",
                  });

                  const dataFormatada = data.toLocaleDateString("pt-PT", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  });

                  return (
                    <tr
                      key={d.id}
                      onClick={() =>
                        toggleSessao(diaNumerico, d.formato, d.data_sessao)
                      }
                      className={`border-t  hover:cursor  ${
                        sessoes.includes(diaNumerico)
                          ? "bg-blue-600 text-white"
                          : "bg-white hover:bg-gray-50"
                      }`}
                    >
                      {/* DATA */}
                      <td className="p-4">
                        <div>
                          <p className="font-medium capitalize">{diaSemana}</p>
                          <p className="text-xs text-gray-500">
                            {dataFormatada}
                          </p>
                        </div>
                      </td>

                      {/* FORMATO */}
                      <td className="p-4 ">
                      <>{d.formato}</>
                      </td>

                      {/* DURAÇÃO */}
                      <td className="p-4">
                        <span className="text-sm">
                          {d.formato === "Online" ? "1h30" : "2h30"}
                        </span>
                      </td>

                      {/* ESTADO */}
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${
                            d.estado
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-200 text-gray-600"
                          }`}
                        >
                          {d.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* RESUMO */}
          <div className="bg-gray-100 p-4 rounded-xl space-y-1">
            <p>
              <strong>Duração:</strong> {sessoes.length} dias
            </p>

            <hr className="my-2" />

            <p>Valor base: {valorBase} Kz</p>
            <p>Material: {MATERIAL_PRECO} Kz</p>
            <p className="text-3xl sm:text-4xl font-bold text-blue-600 mt-2">
              Total: {total} Kz
            </p>
          </div>
          <h2 className="text-lg font-semibold py-2">
            {" "}
            Informações de Pagamento
          </h2>
          <div className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 ">
            {/* Dados */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Dados para Transferência
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <b>Gestor:</b> Angelino Francisco <br />
                <b>IBAN:</b> 0040 0000 9926 0129 1013 0 <br />
                <b>Express / BAI Directo:</b> +244 930 754 775
              </p>
            </div>

            {/* Comprovativo */}
            <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6">
              <h3 className="font-semibold text-gray-800 mb-2 text-sm sm:text-base">
                Anexar Comprovativo
              </h3>

              <div>
                <input
                  type="file"
                  name="fotoPerfil"
                  onChange={(e) => setFoto(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>
            </div>
          </div>

          {/* BOTÃO */}
          <button
            onClick={() => handleSubmit()}
            className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 transition"
          >
            Marcar Orientação
          </button>
        </div>
      </div>
    </>
  );
}
