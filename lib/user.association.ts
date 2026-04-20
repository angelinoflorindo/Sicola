import { Acesso } from "@/models/Acesso";
import { Disciplina } from "@/models/Disciplina";
import { Ebook } from "@/models/Ebook";
import { Orientacao } from "@/models/Orientacao";
import { Pagamento } from "@/models/Pagamento";
import { Sessao } from "@/models/Sessao";
import { Sugestao } from "@/models/Sugestao";
import { Suporte } from "@/models/Suporte";
import { User } from "@/models/User";
import { UserDisciplina } from "@/models/UserDisciplina";

export function setUserAssociation(): void {
  User.hasMany(Pagamento, { foreignKey: "user_id", as: "Pagamentos" });
  Pagamento.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Sugestao, { foreignKey: "user_id", as: "Sugestoes" });
  Sugestao.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Ebook, { foreignKey: "user_id", as: "Ebook" });
  Ebook.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Acesso, { foreignKey: "user_id", as: "Acessos" });
  Acesso.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(Suporte, { foreignKey: "user_id", as: "Suportes" });
  Suporte.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });

  User.hasMany(UserDisciplina, { foreignKey: "user_id", as: "UserDisciplina" });
  UserDisciplina.belongsTo(User, { as: "Usuario", foreignKey: "user_id" });
  // Associação com a tabela da disciplina
  Disciplina.hasMany(UserDisciplina, {
    foreignKey: "disciplina_id",
    as: "UserDisciplina",
  });
  UserDisciplina.belongsTo(Disciplina, {
    as: "Disciplina",
    foreignKey: "disciplina_id",
  });

  // Relação entre Estudante e Orientação

  User.hasMany(Orientacao, { foreignKey: "estudante_id", as: "Orientacoes" });
  Orientacao.belongsTo(User, { as: "Estudante", foreignKey: "estudante_id" });

  // Relação entre Orientação e sessões

  Orientacao.hasMany(Sessao, { foreignKey: "orientacao_id", as: "Sessoes" });
  Sessao.belongsTo(Orientacao, {
    as: "Orientacao",
    foreignKey: "orientacao_id",
  });
}
