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
  ForeignKey,
  Default,
} from "sequelize-typescript";
import { User } from "./User";

@Table({
  tableName: "suportes",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Suporte extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column(DataType.STRING)
  declare descricao: string;

  @Column(DataType.ENUM("RECLAMACAO", "SUGESTAO"))
  declare categoria: "RECLAMACAO" | "SUGESTAO";

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

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
