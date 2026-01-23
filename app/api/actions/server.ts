"use server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { Pagamento } from "@/models/Pagamento";
import { Prova } from "@/models/Prova";
import { Disciplina } from "@/models/Disciplina";
import { Suporte } from "@/models/Suporte";
import { initDB } from "@/lib/db";
import { Op } from "sequelize";
import { Acesso } from "@/models/Acesso";
import { getToken } from "next-auth/jwt";

export async function converterString(value: any) {
  if (!isNaN(value)) {
    return parseInt(value, 10);
  } else if (typeof value === "string") {
    return parseInt(value, 10);
  }
  return value; // já é número ou não é conversível
}

export async function hashPassword(password: string) {
  const saltRounds = 12; // Definir número de rounds (quanto maior, mais seguro, mas mais lento)
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

// logica de concessao de acesso
export async function calcularDataFim(plano: string) {
  const agora = new Date();

  if (plano === "BASICO") {
    agora.setHours(agora.getHours() + 24);
  }

  if (plano === "PREMIUM") {
    agora.setDate(agora.getDate() + 7);
  }

  return agora;
}

export async function buscarAcesso(uuid: number) {
  return await Acesso.findOne({
    where: { user_id: uuid, estado: true },
  });
}

// serviços para  criar usuario e buscar usuarios

export async function buscarPersonalUsuario(email: any) {
  await initDB();

  return await User.findOne({
    where: { email: email },
    attributes: { exclude: ["password"] },
  });
}

export async function buscarUsuarioPorEmail(email: string) {
  await initDB();
  return User.findOne({
    where: { email },
    attributes: { exclude: ["password"] },
    include: [
      { model: Pagamento, as: "Pagamento" },
      { model: Suporte, as: "Suporte" },
      {
        model: Prova,
        as: "Prova",
        include: [{ model: Disciplina, as: "Disciplina" }],
      },
    ],
  });
}

export async function criarUsuario(data: any) {
  await initDB();
  return await User.create(data);
}

// Lógica de acesso a prova
export async function validarAcesso(userId: number) {
  return await Acesso.findOne({
    where: {
      user_id:userId, 
      estado: true,
      fim: {
        [Op.gte]: new Date(),
      },
    },
  });
}

export async function getUserIdFromToken(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token?.id;
}
