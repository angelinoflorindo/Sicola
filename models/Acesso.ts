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
  tableName: "acessos",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Acesso extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column(DataType.DATE)
  inicio!: Date;

  @Column(DataType.DATE)
  fim!: Date;

  @Column({
    type: DataType.ENUM("BASICO", "PREMIUM"),
    allowNull: false,
  })
  plano!: "BASICO" | "PREMIUM";

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

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
