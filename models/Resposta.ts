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
import { Prova } from "./Prova";

@Table({
  tableName: "respostas",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Resposta extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column(DataType.FLOAT)
  declare nota: number;

  @Column(DataType.JSON)
  declare resposta: string | boolean[];

  @Column(DataType.INTEGER)
  declare questao_id: number;

  @ForeignKey(() => Prova)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare prova_id: number;

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
