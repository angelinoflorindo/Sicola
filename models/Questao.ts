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
  tableName: "questoes",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Questao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Unique
  @Column(DataType.STRING)
  codigo!: string;
  
  @Column(DataType.STRING)
  nome!: string;

  @Column(DataType.FLOAT)
  cotacao_total!: number;
  
  @Column(DataType.FLOAT)
  cotacao_parcial!: number;

  @ForeignKey(() => Prova)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  prova_id!: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  estado!: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;
}
