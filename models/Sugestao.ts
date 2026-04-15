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
  tableName: "sugestoes",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Sugestao extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare descricao: string;


  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare estado: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;


  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
