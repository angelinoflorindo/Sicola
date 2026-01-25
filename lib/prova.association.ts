import { Detalhes } from "@/models/Detalhes";
import { Disciplina } from "@/models/Disciplina";
import { Prova } from "@/models/Prova";
import { Resposta } from "@/models/Resposta";
import { User } from "@/models/User";

export function setProvaAssociation(): void {
  User.hasMany(Prova, { foreignKey: "user_id", as: "Provas" });
  Prova.belongsTo(User, { as: "User", foreignKey: "user_id" });

  Resposta.hasMany(Detalhes, { foreignKey: "resposta_id", as: "Detalhes" });
  Detalhes.belongsTo(Resposta, { as: "Resposta", foreignKey: "resposta_id" });

  Prova.hasMany(Resposta, { as: "Respostas", foreignKey: "prova_id" });
  Resposta.belongsTo(Prova, { as: "Prova", foreignKey: "prova_id" });

  Disciplina.hasMany(Prova, { foreignKey: "disciplina_id", as: "Provas" });
  Prova.belongsTo(Disciplina, {
    as: "Disciplina",
    foreignKey: "disciplina_id",
  });
}
