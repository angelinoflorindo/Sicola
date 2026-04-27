"use client";
import LoadingPage from "@/components/LoadingPage";
import { UserPerfonal } from "@/services/userService";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Conteudo({ users }: { users: UserPerfonal }) {
  const [faculdade, setFaculdade] = useState("");
  const [loading, setLoading] = useState(false);
  const [unid, setUnid] = useState("");
  const [codigo, setCodigo] = useState("");
  const [universidade, setUniversidade] = useState<any>([]);
  const [isUpdated, setUpdated] = useState(true);
  const [foto, setFoto] = useState<File | any>(null);

  const [formata, setFormData] = useState({
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const handleSubmit = async () => {
    setLoading(true);

    const formData = new FormData();

    if (
      !formata.email ||
      !formata.password ||
      !formata.primeiro_nome ||
      !formata.segundo_nome ||
      !formata.telemovel
    ) {
      alert(`Preencha os campos vazios!`);
      setLoading(false);
      return;
    }

    if (!unid) {
      alert(`Confirma a universidade!`);
      setLoading(false);
      return;
    }

    formData.append("file", foto);
    formData.append("filename", users.filename);
    formData.append("primeiro_nome", formata.primeiro_nome);
    formData.append("segundo_nome", formata.segundo_nome);
    formData.append("telemovel", formata.telemovel);
    formData.append("email", formata.email);
    formData.append("password", formata.password);
    formData.append("universidade_id", unid);

    try {
      const resp = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario/personal`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (resp.ok) {
        setLoading(false);
        signOut({ callbackUrl: "/" });
      }
    } catch (error) {
      console.log(error);
      router.push("/usuario/");
    }
  };

  const toggle = () => {
    if (isUpdated) {
      setUpdated(false);
      return;
    }

    setUpdated(true);
  };
  const mudarUniversidade = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const inc = e.target.value;
    const out = universidade.find((item: any) => item.codigo === inc);
    if (out) {
      setFaculdade(out.nome);
      setUnid(out.id);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const fetchData = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/universidade`,
    );

    if (!resp.ok) {
      throw new Error("Erro de busca");
    }

    const data = await resp.json();
    setUniversidade(data);
    data.map((item: any) => {
      if (item.id === Number(users.universidade_id)) {
        setFaculdade(item.nome);

        return;
      }
    });
  };

  useEffect(() => {
    if (users.universidade_id) {
      fetchData();
    }
  }, [users.universidade_id]);

  if (!users.primeiro_nome || !users.email || loading) {
    return <LoadingPage />;
  }

  return (
    <div id="container" className="bg-gray-50 py-5 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {isUpdated && (
          <div>
            <div className="flex flex-raw justify-between">
              <h1 className="text-2xl font-bold text-gray-800">Meu Perfil</h1>

              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-sm"
                type="button"
                onClick={toggle}
              >
                Atualizar dados
              </button>
            </div>

            <div className="flex flex-col">
              <span className="py-1">
                Nome Completo:{" "}
                <b>
                  {users?.primeiro_nome} {users.segundo_nome}
                </b>
              </span>
              <span className="py-1">
                Telemovel: <b>{users?.telemovel}</b>
              </span>
              <span className="py-1">
                Email: <b>{users?.email}</b>
              </span>

              <span className="py-1">
                Universidade: <b> {faculdade}</b>
              </span>
            </div>
          </div>
        )}

        {!isUpdated && users && (
          <div>
            <div className="flex flex-raw justify-between">
              <h1 className="text-2xl font-bold text-gray-800">
                Atualizar Dados
              </h1>

              <button
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-sm"
                type="button"
                onClick={toggle}
              >
                Voltar
              </button>
            </div>

            <div className="grid grid-cols-1  m-2">
              <h2 className="font-semibold"> Primeiro Nome </h2>
              <input
                type="text"
                name="primeiro_nome"
                required
                onChange={handleChange}
                className="text-black p-2  border "
                placeholder={users.primeiro_nome}
              />

              <h2 className="font-semibold mt-6"> Segundo Nome </h2>
              <input
                type="text"
                required
                name="segundo_nome"
                onChange={handleChange}
                className="text-black p-2    border "
                placeholder={users.segundo_nome}
              />

              <h2 className="font-semibold mt-6  mt-2 "> Telemovel </h2>
              <input
                type="text"
                required
                name="telemovel"
                onChange={handleChange}
                className="text-black p-2    border "
                placeholder={users.telemovel}
              />
              <h2 className="font-semibold mt-6  mt-2 "> Email </h2>
              <input
                type="email"
                required
                name="email"
                onChange={handleChange}
                className="text-black p-2    border "
                placeholder={users.email}
              />
              <h2 className="font-semibold mt-6  mt-2 "> Password </h2>
              <input
                type="password"
                required
                name="password"
                onChange={handleChange}
                className="text-black p-2    border "
                placeholder={users.password}
              />

              <h2 className="font-semibold mt-6  mt-2 "> Universidade </h2>
              <select className="border p-4" onChange={mudarUniversidade}>
                <option className="text-white bg-green-600">
                  {" "}
                  {faculdade}{" "}
                </option>
                {universidade.map((inst: any) => (
                  <option key={inst.id} value={inst.codigo}>
                    {inst.codigo} -- {inst.nome}
                  </option>
                ))}
              </select>
              <div>
                <h2 className="font-semibold mt-6  mt-2 ">
                  {" "}
                  Fotografia Profissional{" "}
                </h2>

                <input
                  type="file"
                  name="fotoPerfil"
                  onChange={(e) => setFoto(e.target.files?.[0] || null)}
                  className="w-full border border-gray-300 rounded-lg p-2 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              <div className="flex justify-center mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition shadow-sm"
                >
                  Confirmar atualização
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
