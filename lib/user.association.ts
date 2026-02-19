import { Acesso } from "@/models/Acesso";
import { Ebook } from "@/models/Ebook";
import { Pagamento } from "@/models/Pagamento";
import { Suporte } from "@/models/Suporte";
import { User } from "@/models/User";

export function setUserAssociation(): void {
  User.hasMany(Pagamento, { foreignKey: "user_id", as: "Pagamentos" });
  Pagamento.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Ebook, { foreignKey: "user_id", as: "Ebook" });
  Ebook.belongsTo(User, { as: "Usuario", foreignKey: "user_id" })

  User.hasMany(Acesso, { foreignKey: "user_id", as: "Acessos" });
  Acesso.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Suporte, { foreignKey: "user_id", as: "Suportes" });
  Suporte.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });
}
