'server-only'
import { Sequelize } from "sequelize-typescript";
import {User} from "@/models/User";
import {Disciplina} from "@/models/Disciplina"
import {Pagamento} from "@/models/Pagamento"
import {Prova} from "@/models/Prova"
import {Detalhes} from "@/models/Detalhes"
import {Resposta} from "@/models/Resposta"
import {Suporte} from "@/models/Suporte"


import { setProvaAssociation } from "./prova.association";
import {setUserAssociation} from "./user.association"
import { Acesso } from "@/models/Acesso";
import { Ebook } from "@/models/Ebook";
import { Sugestao } from "@/models/Sugestao";
import { UserDisciplina } from "@/models/UserDisciplina";
import { Disponibilidade } from "@/models/Disponibilidade";
import { Orientacao } from "@/models/Orientacao";
import { Sessao } from "@/models/Sessao";
import { Material } from "@/models/Material";
import { SubItem } from "@/models/SubItem";
import { Universidade } from "@/models/Universidade";
import { Trabalho } from "@/models/Trabalho";
  




export const sequelize = new Sequelize({
  dialect: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging:false,
  dialectModule: require("mysql2"),
  models: [
    User,
    Disciplina,
    Pagamento,
    Ebook,
    Acesso,
    Prova,
    Suporte,
    Resposta,
    Detalhes,
    Sugestao,
    UserDisciplina,
    Disponibilidade,
    Orientacao,
    Sessao,
    Material,
    SubItem,
    Universidade,
    Trabalho
  ]
});
 

setUserAssociation()
setProvaAssociation()
