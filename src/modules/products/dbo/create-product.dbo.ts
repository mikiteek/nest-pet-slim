import {IsString, IsNumber, IsPositive, IsNotEmpty} from "class-validator";

export class CreateProductDbo {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  @IsPositive()
  weight: number;

  @IsNumber()
  @IsPositive()
  calories: number;
}