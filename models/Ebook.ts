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
  tableName: "ebooks",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Ebook extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  
  @Column(DataType.INTEGER)
  declare valor: number;

  
  @Column(DataType.STRING)
  declare codigo: string;


  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;
  

  @Default("PENDENTE")
  @Column({
    type: DataType.ENUM("PENDENTE", "PAGO", "EXPIRADO"),
    allowNull: false,
  })
  declare status: "PENDENTE" | "PAGO" | "EXPIRADO"

  
  @Column(DataType.STRING)
  declare filename: string;

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
