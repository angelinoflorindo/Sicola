
import { Chave } from "@/models/Chave";
import { Questao } from "@/models/Questao";
import { Resposta } from "@/models/Resposta";

export function setQuestaoAssociation(): void {
  Questao.hasMany(Chave, { foreignKey: "questao_id", as: "Chave" }); 
  Chave.belongsTo(Questao, { as: "Questao", foreignKey: "questao_id" });  

  Questao.hasMany(Resposta, { foreignKey: "questao_id", as: "Resposta" }); 
  Resposta.belongsTo(Questao, { as: "Questao", foreignKey: "questao_id" });  
}
