"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "@/modules/login.module.css";
import { signIn } from "next-auth/react";
import Footer from "@/components/layout/Footer";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();
  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    const email = formData.email.trim();
    const password = formData.password.trim();

    const res = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password,
    });

    if (res?.error) {
      console.log("Erro na autenticação:", res.error);
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit}  id={styles.form}>
        <div className={styles.header}>
          <h1 className={styles.h1}>
            <b>Sicola</b>
          </h1>
          <h4>Simulação de provas</h4>
        </div>
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className={styles.input}
        />

        <input
          type="password"
          name="password"
          placeholder="Palavra passe"
          onChange={handleChange}
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <Link href="/registar" className={styles.center}>
          <span className={styles.criarConta}>Criar uma conta!</span>
        </Link>
        <Footer />
      </form>
    </div>
  );
}
