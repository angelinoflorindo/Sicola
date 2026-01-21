// models/Papel.ts
import {
  Table,
  Model,
  Column,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
} from "sequelize-typescript";
import {User} from "./User";

@Table({ tableName: "papeis" })
export  class Papel extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id!: number;

  @Column({
    type: DataType.ENUM("ADMIN", "ESTUDANTE", "EXPLICADOR"),
    allowNull: false,
  })
  perfil!: "ADMIN" | "ESTUDANTE" | "EXPLICADOR";

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: true,
  })
  estado!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id!: number;

  @CreatedAt
  @Column({ field: "created_at", type: DataType.DATE })
  createdAt!: Date;

  @UpdatedAt
  @Column({ field: "updated_at", type: DataType.DATE })
  updatedAt!: Date;

}
