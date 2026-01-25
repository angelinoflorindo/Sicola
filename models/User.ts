// models/User.ts
import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Model,
  Column,
  DataType,
  Unique,
  CreatedAt,
  UpdatedAt,
  Default,
} from "sequelize-typescript";

@Table({
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column(DataType.STRING)
  declare primeiro_nome: string;

  @Column(DataType.STRING)
  declare segundo_nome: string;

  @Unique
  @Column(DataType.STRING)
  declare password: string;

  @Unique
  @Column(DataType.STRING)
  declare telemovel: string;

  @Unique
  @Column(DataType.STRING)
  declare email: string;

  @Column(DataType.ENUM("GBS", "IGF", "CF"))
  declare curso: "GBS" | "IGF" | "CF";

  @Default("ESTUDANTE")
  @Column({
    type: DataType.ENUM("ADMIN", "ESTUDANTE", "EXPLICADOR"),
    allowNull: false,
  })
  declare perfil: "ADMIN" | "ESTUDANTE" | "EXPLICADOR";

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare estado: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
