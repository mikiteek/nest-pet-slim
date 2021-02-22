import {Controller, Post, UsePipes, Body} from "@nestjs/common";
import {CreateProductDto} from "./dto/create-product.dto";
import {ProductsService} from "./products.service";
import {ValidationPipe} from "../../shared/pipes/validation.pipe";

@Controller("products")
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createProduct (@Body() productData: CreateProductDto) {
    return await this.productsService.create(productData);
  }
}
