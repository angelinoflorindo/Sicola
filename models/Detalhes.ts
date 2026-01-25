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
import { Resposta } from "./Resposta";

@Table({
  tableName: "detalhes",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Detalhes extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  // índice da opção (0,1,2,3...)
  @Column(DataType.INTEGER)
  declare indice: number;

  // resposta do aluno nessa opção
  @Column(DataType.BOOLEAN)
  declare marcada: boolean;

  // gabarito
  @Column(DataType.BOOLEAN)
  declare correta: boolean;
  
  // acertou 
  @Column(DataType.BOOLEAN)
  declare acertou: boolean;

  @ForeignKey(() => Resposta)
  @Column(DataType.INTEGER)
  declare resposta_id: number;

  @Default(true)
  @Column(DataType.BOOLEAN)
  declare estado: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
