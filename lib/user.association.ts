import { Acesso } from "@/models/Acesso";
import { Pagamento } from "@/models/Pagamento";
import { Suporte } from "@/models/Suporte";
import { User } from "@/models/User";

export function setUserAssociation(): void {
  User.hasMany(Pagamento, { foreignKey: "user_id", as: "Pagamento" });
  Pagamento.belongsTo(User, { as: "User", foreignKey: "user_id" });

  User.hasMany(Acesso, { foreignKey: "user_id", as: "Acesso" });
  Acesso.belongsTo(User, { as: "User", foreignKey: "user_id" });

  User.hasMany(Suporte, { foreignKey: "user_id", as: "Suporte" });
  Suporte.belongsTo(User, { as: "User", foreignKey: "user_id" });
}
