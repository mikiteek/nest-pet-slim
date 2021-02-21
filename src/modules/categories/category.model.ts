import {Column, Model, Table, DataType} from "sequelize-typescript";

@Table({
  timestamps: false,
})
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}