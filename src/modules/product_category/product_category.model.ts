import {Column, Model, Table, DataType} from "sequelize-typescript";

@Table({
  timestamps: false,
  indexes: [
    {
      fields: ["productId"],
      using: "GIN",
    }
  ],
})
export class ProductCategory extends Model {
  @Column({
    type: DataType.INTEGER,
  })
  productId: number;

  @Column({
    type: DataType.INTEGER,
  })
  categoryId: number;
}