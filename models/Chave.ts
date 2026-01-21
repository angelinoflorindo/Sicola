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
import { Questao } from "./Questao";

@Table({
  tableName: "chaves",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Chave extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column(DataType.STRING)
  codigo!: string;
  
  @Column(DataType.STRING)
  descricao!: string;

  @ForeignKey(() => Questao)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  questao_id!: number;

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
