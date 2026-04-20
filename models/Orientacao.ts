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
  ForeignKey,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "orientacoes",
  createdAt: "created_at",
  updatedAt: "updated_at",
}) 
export class Orientacao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => User)
  @Column
  declare estudante_id: number;

  @Column(DataType.STRING)
  declare valor: String;

  @Column({
    type: DataType.ENUM("pendente", "aprovado", "rejeitado"),
    defaultValue: "pendente",
  })
  declare situacao: "pendente" | "aprovado" | "rejeitado";

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare estado: boolean;

  
  @Column({
    type: DataType.ENUM("Presencial", "Online", "Ambas"),
    allowNull: false,
  })
  declare formato: "Presencial" | "Online" | "Ambas";


  @Column(DataType.STRING)
  declare filename: string; // recibo

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
