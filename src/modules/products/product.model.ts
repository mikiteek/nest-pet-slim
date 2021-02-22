import {Column, Table, Model, DataType} from "sequelize-typescript";

@Table({
  timestamps: false,
  indexes: [
    {
      fields: ["title"],
      using: "GIN",
    },
  ],
})
export class Product extends Model {
  @Column({
    type: DataType.STRING,
  })
  title: string;

  @Column({
    type: DataType.NUMBER,
  })
  weight: number;

  @Column({
    type: DataType.NUMBER,
  })
  calories: number;
}