'server-only'
import { Sequelize } from "sequelize-typescript";
import {User} from "@/models/User";
import {Disciplina} from "@/models/Disciplina"
import {Pagamento} from "@/models/Pagamento"
import {Prova} from "@/models/Prova"
import {Detalhes} from "@/models/Detalhes"
import {Resposta} from "@/models/Resposta"
import {Suporte} from "@/models/Suporte"


import { config } from "dotenv";
import { setProvaAssociation } from "./prova.association";
import {setUserAssociation} from "./user.association"
import { Acesso } from "@/models/Acesso";
  


config();


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
    Acesso,
    Prova,
    Suporte,
    Resposta,
    Detalhes
  ]
});
 

setUserAssociation()
setProvaAssociation()
