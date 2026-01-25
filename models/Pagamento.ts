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
  tableName: "pagamentos",
  createdAt: "created_at",
  updatedAt: "updated_at",
})
export class Pagamento extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER.UNSIGNED)
  declare id: number;

  @Column(DataType.INTEGER)
  declare valor: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare user_id: number;
  
  @Column({
    type: DataType.ENUM("BASICO", "PREMIUM"),
    allowNull: false,
  })
  declare plano:'BASICO'|'PREMIUM' 


  @Default("PENDENTE")
  @Column({
    type: DataType.ENUM("PENDENTE", "PAGO", "EXPIRADO"),
    allowNull: false,
  })
  declare status: "PENDENTE" | "PAGO" | "EXPIRADO"


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
