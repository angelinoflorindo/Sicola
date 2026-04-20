// models/User.ts
import {
  Table,
  PrimaryKey,
  AutoIncrement,
  Model,
  Column,
  DataType,
  CreatedAt,
  UpdatedAt,
  Default,
  ForeignKey,
} from "sequelize-typescript";
import { Orientacao } from "./Orientacao";

@Table({
  tableName: "sessoes",
  createdAt: "created_at",
  updatedAt: "updated_at",
}) 
export class Sessao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @ForeignKey(() => Orientacao)
  @Column
  declare orientacao_id: number;

  @Column(DataType.DATE)
  declare sessao: Date;

  
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