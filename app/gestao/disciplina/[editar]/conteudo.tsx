"use client";
import LoadingPage from "@/components/LoadingPage";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "@/modules/login.module.css";
 
export default function Conteudo() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { editar } = useParams();

  const [formData, setFormData] = useState<any>({
    nome: '',
    codigo:'',
  });

  const fetchData = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/disciplina/${editar}`,
    );
    if (!resp.ok){ throw new Error("Erro encontrado");}

    const data = await resp.json();
    setFormData(data);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev:any) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        id: editar,
        nome: formData.nome,
        codigo: formData.codigo,
      };

      if (!data.nome || !data.codigo) {
        alert("Verifique os campos vazios");
        setLoading(false);
        return;
      }

      const resp = await fetch("/api/disciplina", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!resp.ok) {
        setLoading(false);
        return router.push(`/gestao/disciplina/${editar}`);
      }
      router.push("/gestao/disciplina");
    } catch (err) {
      router.push(`/gestao/disciplina/${editar}`);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <div className="bg-gray-50 p-6 flex flex-col items-center ">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">
        Editar Disciplina
      </h1>

      <form onSubmit={onSubmit} className="max-w-3xl">
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          className={styles.input}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="codigo"
          placeholder="Código - disciplina"
          value={formData.codigo}
          className={styles.input}
          onChange={handleChange}
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100%]"
        >
          confirmar
        </button>
      </form>
    </div>
  );
}
