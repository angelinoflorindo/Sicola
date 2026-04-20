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
  tableName: "disponibilidades",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Disponibilidade extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Default(true)
  @Column({ type: DataType.BOOLEAN, defaultValue: true })
  declare estado: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;

  @Column({
    type: DataType.DATEONLY,
    allowNull: false,
  })
  declare data_sessao: Date;

  @Column({
    type: DataType.ENUM("Presencial", "Online", "Ambas"),
    allowNull: false,
  })
  declare formato: "Presencial" | "Online" | "Ambas";

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  declare createdAt: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  declare updatedAt: Date;
}
