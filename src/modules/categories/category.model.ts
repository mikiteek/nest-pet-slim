import { Column, Model, Table, DataType } from "sequelize-typescript";
import {CreateCategoryDto} from "./dbo/create-category.dto";

@Table({
  timestamps: false,
})
export class Category extends Model <CreateCategoryDto> {
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  name: string;
}