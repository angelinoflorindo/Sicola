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
import { Disciplina } from "./Disciplina";

@Table({
  tableName: "provas",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Prova extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column({
    type: DataType.ENUM("P2", "EXAME", "RECURSO"),
    allowNull: false,
  })
  declare nome: "P2" | "EXAME" | "RECURSO"; // p2, exame, recurso

  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  declare tempo: string;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @ForeignKey(() => Disciplina)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare disciplina_id: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare estado: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
  Respostas: any;
}
