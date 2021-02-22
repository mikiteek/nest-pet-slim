import {Controller, Post, UsePipes, Body} from "@nestjs/common";
import {CreateProductDbo} from "./dbo/create-product.dbo";
import {ProductsService} from "./products.service";
import {ValidationPipe} from "../../shared/pipes/validation.pipe";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createProduct (@Body() productData: CreateProductDbo) {
    return await this.productsService.create(productData);
  }
}
