"use client";
import React, { useState } from "react";
import styles from "@/modules/login.module.css";
import { useRouter } from "next/navigation";
import LoadingPage from "@/components/LoadingPage";
import { signIn } from "next-auth/react";

const Recuperar = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
        email: formData.email,
        password: formData.password,
      };

      if (!usuario.password || !usuario.email) {
        alert("Verifique os campos vazios");
        setLoading(false);
        return;
      }

      const resp = await fetch("/api/usuario", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });

      if (!resp.ok) {
        setLoading(false);
        alert("Verifique corretamente o seu email");
        return router.push("/recover/update");
      }

      const res = await signIn("credentials", {
        redirect: false,
        email: usuario.email,
        password: usuario.password,
      });

      if (res?.error) {
        router.push("/recover/update");
      } else {
        fetch(
          `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario?email=${usuario.email}`,
        );

        setLoading(false);
        router.push("/dashboard");
      }
    } catch (err) {
      router.push("/recover/update");
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
        <div className={styles.header}>
          <h1 className={styles.h1}>
            <b>Recuperar Conta </b>
          </h1>
        </div>

        <input
          type="password"
          name="password"
          placeholder="Nova Palavra passe"
          className={styles.input}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Antigo"
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
            Login
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-900 text-white rounded  cursor-pointer w-[100px]"
          >
            Confirmar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Recuperar;
