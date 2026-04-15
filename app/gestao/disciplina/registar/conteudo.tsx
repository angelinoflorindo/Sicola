"use client";
import LoadingPage from "@/components/LoadingPage";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "@/modules/login.module.css";

export default function Conteudo() { 

  const [loading, setLoading] = useState(false);



  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    codigo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const usuario = {
        nome: formData.nome,
        codigo: formData.codigo,
      };

      if (
        !usuario.nome ||
        !usuario.codigo
      ) {
        alert("Verifique os campos vazios");
        setLoading(false);
        return;
      }

      const resp = await fetch("/api/disciplina", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!resp.ok) {
        setLoading(false);
        return router.push("/gestao/disciplina/registar");
      }
      router.push("/gestao/disciplina");
    } catch (err) {
      router.push("/gestao/disciplina/registar");
    } finally {
      setLoading(false);
    }
  }
 

  if (loading) {
    return <LoadingPage />;
  }
  return (
   <div className="bg-gray-50 p-6 flex flex-col items-center ">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">Nova Disciplina</h1>

        <form onSubmit={onSubmit} className="max-w-3xl">
          <input
            name="nome"
            placeholder="Nome"
            className={styles.input}
            onChange={handleChange}
          />
        
          <input
            name="codigo"
            placeholder="Código - disciplina"
            className={styles.input}
            onChange={handleChange}
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
