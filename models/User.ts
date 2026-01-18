// models/User.ts
import { Table, PrimaryKey, AutoIncrement, Model, Column, DataType, Unique, CreatedAt, UpdatedAt, Default } from "sequelize-typescript";
import {Prova} from "@/models/Prova"
import {Pagamento} from "@/models/Pagamento"

@Table({
  tableName: "users",
  createdAt: "created_at",
  updatedAt: "updated_at",
})

export class User extends Model {
  @PrimaryKey 
  @AutoIncrement
  @Column (DataType.INTEGER.UNSIGNED)
  id!: number;

  @Column(DataType.STRING)
  primeiro_nome!: string;

  @Column(DataType.STRING)
  segundo_nome!: string;

  @Unique
  @Column(DataType.STRING)
  password!: string;

  @Unique
  @Column(DataType.STRING)
  telemovel!: string;

  @Unique
  @Column(DataType.STRING)
  email!: string;

  @Column(DataType.ENUM("GBS", "IGF", "CF"))
  curso!: "GBS" |"IGF"|"CF";

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
