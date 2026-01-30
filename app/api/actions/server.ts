"use server";
import bcrypt from "bcryptjs";
import { User } from "@/models/User";
import { Pagamento } from "@/models/Pagamento";
import { Prova } from "@/models/Prova";
import { Disciplina } from "@/models/Disciplina";
import { Suporte } from "@/models/Suporte";
import { initDB } from "@/lib/db";
import { Op, where } from "sequelize";
import { Acesso } from "@/models/Acesso";
import { getToken } from "next-auth/jwt";
import { Resposta } from "@/models/Resposta";
import { Detalhes } from "@/models/Detalhes";

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
export async function calcularDataFim(
  plano: "BASICO" | "PREMIUM",
  inicio: Date,
): Promise<Date> {
  const fim = new Date(inicio);

  if (plano === "BASICO") {
    fim.setTime(fim.getTime() + 24 * 60 * 60 * 1000); // +1 dia
  }

  if (plano === "PREMIUM") {
    fim.setTime(fim.getTime() + 7 * 24 * 60 * 60 * 1000); // +7 dias
  }

  return fim;
}

export async function buscarAcesso(uuid: number) {
  return await Acesso.findOne({
    where: { user_id: uuid, estado: true },
  });
}

export async function buscarPagamento(uuid: number) {
  return await Pagamento.findOne({
    where: { user_id: uuid, estado: true },
  });
}

export async function buscarPagamentoId(id: number) {
  return await Pagamento.findOne({
    raw: false,
    where: { id: id, estado: true },
  });
}

export async function buscarDisciplina(codigo: string) {
  return await Disciplina.findOne({
    raw: false,
    where: { nome: codigo, estado: true },
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

export async function buscarProva(id: number) {
  const prova = await Prova.findOne({
    where: { id: id },
    include: [
      {
        model: Resposta,
        as: "Respostas",
        include: [{ model: Detalhes, as: "Detalhes" }],
      },
    ],
  });
   
  if (!prova) return null;

  const provaJSON = prova.toJSON() as any;

  provaJSON.Respostas = provaJSON.Respostas.map((r: any) => ({
    ...r,
    resposta: JSON.parse(r.resposta), //  NORMALIZA AQUI
  }));

  return provaJSON;
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

// Lógica de acesso a prova
export async function validarAcesso(userId: number) {
  return  {ok:true}


  /*

  await Acesso.findOne({
    where: {
      user_id: userId,
      estado: true,
      fim: {
        [Op.gte]: new Date(),
      },
    },
  });
   */
}

export async function registarPagamento(userId: number, planoIn: string) {
  if (planoIn == "BASICO") {
    return await Pagamento.create({
      user_id: userId,
      plano: planoIn,
      valor: 1000,
    });
  }

  return await Pagamento.create({
    user_id: userId,
    plano: planoIn,
    valor: 5000,
  });
}
export async function getUserIdFromToken(req: any) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  return token?.id;
}

export async function validarEstado(value: any) {
  if (value === "true" || value === true) {
    return true;
  }
  return false; // já é número ou não é conversível
}

// Operações relacionadas entre os models

export async function buscarUser(userId: number) {
  return await User.findByPk(userId);
}

export async function buscarUserPorPagamento(pagamentoId: number) {
  const result = await Pagamento.findOne({
    raw: false,
    where: {
      id: pagamentoId,
      estado: true,
    },
    include: [
      {
        model: User,
        attributes: [
          "id",
          "primeiro_nome",
          "segundo_nome",
          "email",
          "telemovel",
        ],
        as: "Usuario",
      },
    ],
  });

  return result;
}
