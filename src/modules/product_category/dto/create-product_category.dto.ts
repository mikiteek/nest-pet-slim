import {IsInt, IsNotEmpty} from "class-validator";

export class CreateProductCategoryDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;

  @IsNotEmpty()
  @IsInt()
  categoryId: number;
}