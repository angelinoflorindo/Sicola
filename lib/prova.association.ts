
import { Disciplina } from "@/models/Disciplina";
import { Prova } from "@/models/Prova";
import { User } from "@/models/User";

export function setProvaAssociation(): void {
  User.hasMany(Prova, { foreignKey: "user_id", as: "Prova" }); 
  Prova.belongsTo(User, { as: "User", foreignKey: "user_id" });  

  
  Disciplina.hasMany(Prova, { foreignKey: "disciplina_id", as: "Prova" }); 
  Prova.belongsTo(Disciplina, { as: "Disciplina", foreignKey: "disciplina_id" });  

}
