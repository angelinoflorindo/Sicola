"use client";
import Link from "next/link";
import { useState } from "react";
import styles from "@/modules/login.module.css";
import { signIn } from "next-auth/react";
import Footer from "@/components/layout/Footer";
import Image from "next/image";
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
      window.alert("Se esqueceu sua senha, contacta o Administrador");
      router.push("/");
    } else {
      router.push("/dashboard");
    }
  }
  return (
    <div className={styles.container}>
      <form onSubmit={onSubmit} id={styles.form}>
        <div className="flex flex-col items-center mb-4">
          <Image
            src="/images/onesicola.png"
            alt="Sicola - logotipo"
            width={100} // define a largura base do Next.js
            height={100} // define altura base do Next.js
            className="mb-2 w-auto h-24 sm:h-32 object-contain" // mantém proporção, evita deformação
          />
          <h1 className="text-lg sm:text-2xl font-bold text-gray-800">
            Sicola Online
          </h1>
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
