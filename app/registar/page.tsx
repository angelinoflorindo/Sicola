"use client";
import React, { useEffect, useState } from "react";
import styles from "@/modules/login.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";

const Registar = () => {
  const [faculdade, setFaculdade] = useState<any[]>([]);
  const [unid, setUnid] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    password: "",
  });

  const mudarCurso = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setUnid(e.target.value);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
 
      const usuario = {
        primeiro_nome: formData.primeiro_nome,
        segundo_nome: formData.segundo_nome,
        telemovel: formData.telemovel,
        email: formData.email,
        password: formData.password,
        universidade_id:unid,
      };

      if (
        !usuario.primeiro_nome ||
        !usuario.segundo_nome ||
        !usuario.universidade_id ||
        !usuario.password ||
        !usuario.telemovel ||
        !usuario.email
      ) {
        alert("Verifique os campos vazios");
        setLoading(false);
        return;
      }

      const resp = await fetch("/api/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!resp.ok) {
        setLoading(false);
        return router.push("/registar");
      }

      const res = await signIn("credentials", {
        redirect: false,
        email: usuario.email,
        password: usuario.password,
      });

      if (res?.error) {
        setLoading(false);
        return router.push("/registar");
      }

      router.push("/dashboard");
    } catch (err) {
      router.push("/registar");
    } finally {
      setLoading(false);
    }
  }

  const fetchUniversidade = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/universidade`,
    );
    if (!resp.ok) throw new Error("Erro de busca");
    const data = await resp.json();
    setFaculdade(data);
  };

  useEffect(()=>{
    fetchUniversidade()
  }, [])

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} id={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            <b>Registar </b>
          </h1>
        </div>
        <input
          name="primeiro_nome"
          placeholder="Primeiro Nome"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          name="segundo_nome"
          placeholder="Segundo Nome"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Palavra passe"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          name="telemovel"
          placeholder="Telemovel"
          className={styles.input}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email:numeroEstudante@isaf.co.ao"
          className={styles.input}
          onChange={handleChange}
        />

        <select onChange={mudarCurso} className={styles.input}>
          <option > --- --- </option>
          {faculdade.map((inst) => (
            <option key={inst.id} value={`${inst.id}`} >{inst.codigo}</option>
          ))}
        </select>
        <div className={styles.space}>
          <button
            type="button"
            onClick={() => {
              router.push("/");
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100px]"
          >
            Login
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100px]"
          >
            Registar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registar;
