"use client";
import React, { useState } from "react";
import styles from "@/modules/login.module.css";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import LoadingPage from "@/components/LoadingPage";
import Image from "next/image";

const Registar = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmail(value);
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const resp = await fetch(`/api/usuario/personal?email=${email}`);

      if (!resp.ok) {
        alert("Email não encontrado!");
        return router.push("/recover");
      }


      router.push(`/recover/update`);
    } catch (err) {
      router.push("/r");
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <LoadingPage />;
  }

  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} id={styles.form}>
        <div className="flex flex-col items-center mb-2">
          <Image
            src="/images/onesicola.png"
            alt="Sicola - logotipo"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />
        </div>

        <div className={styles.header}>
          <h1 className={styles.h1}>
            <b>Insira o seu email </b>
          </h1>
        </div>

        <input
          type="email"
          name="email"
          placeholder="insira aqui o email"
          className={styles.input}
          onChange={handleChange}
        />

        <div className={styles.space}>
          <button
            type="button"
            onClick={() => {
              router.push("/");
            }}
            className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100px]"
          >
            voltar
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100px]"
          >
            confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Registar;
