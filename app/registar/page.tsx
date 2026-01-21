"use client";
import React from "react";
import styles from "@/modules/login.module.css";
import { hashPassword } from "@/app/api/actions/server";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const RegisterForm = () => {
  const [curso, setCurso] = useState("");
  const router = useRouter();
  const [formData, setFormData] = useState({
    primeiro_nome: "",
    segundo_nome: "",
    telemovel: "",
    email: "",
    password: "",
    curso: "",
  });

  const mudarCurso = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedcurso = event.target.value;
    setCurso(selectedcurso);
  };

  // Manipula mudanças nos inputs
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const hashPass = await hashPassword(formData.password);
    const password = formData.password.trim()
    const usuario = {
      primeiro_nome: formData.primeiro_nome,
      password: hashPass,
      email: formData.email,
      curso: curso,
      segundo_nome: formData.segundo_nome,
      telemovel: formData.telemovel,
    };

    if(!usuario.primeiro_nome || !usuario.segundo_nome || !usuario.curso || !usuario.password || !usuario.telemovel || !usuario.email){
      console.log(usuario)
      
      alert('Verifique os campos vazios')
      return
    }

    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/usuario`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },

        body: JSON.stringify(usuario),
      }
    );
  
    if (!resp.ok) {
      router.push("/registar");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email: usuario.email,
      password:password,
    });

    if (res?.error) {
      console.log("Erro na autenticação:", res.error);
      router.push("/registar");
      return;
    } else {
      router.push("/dashboard");
      return;
    }
  }

  return (
    <div className={styles.container}>
      <div className="flex flex-col h-screen w-[400px] bg-white mx-auto shadow-lg">
        <div className=" p-[20px]">
          <b>
            <h1>CRIAR UMA CONTA</h1>{" "}
          </b>
          <form onSubmit={onSubmit}>
            <div className="space-y-4">
              <input
                type="text"
                name="primeiro_nome"
                placeholder="Primeiro Nome"
                required
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="text"
                name="segundo_nome"
                placeholder="Segundo Nome"
                required
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Palavra passe"
                required
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="tel"
                name="telemovel"
                placeholder="Telemovel"
                required
                className={styles.input}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Insira email institucional"
                required
                className={styles.input}
                onChange={handleChange}
              />

              <select
                name="curso"
                value={curso}
                onChange={mudarCurso}
                className={styles.input}
                required
              >
                <option value="Nenhum">Escolher o curso</option>
                <option value="IGF">IGF</option>
                <option value="CF">CF</option>
                <option value="GBS">GBS</option>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
