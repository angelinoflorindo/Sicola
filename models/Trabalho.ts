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
  tableName: "trabalhos",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Trabalho extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column(DataType.TEXT)
  declare tema: string;

  @Column(DataType.STRING)
  declare valor: string;

  @Column({
    type: DataType.ENUM(
      "Medio",
      "Licenciatura",
      "Especialidade",
      "Catedratico",
    ),
    allowNull: false,
  })
  declare grau: "Medio" | "Licenciatura" | "Especialidade" | "Catedratico";

  @Column(DataType.STRING)
  declare area: string;

  @Column(DataType.TEXT)
  declare descricao: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @Unique
  @Column(DataType.STRING)
  declare filename: string;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  declare estado: boolean;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
