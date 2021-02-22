import {Module} from "@nestjs/common";
import {SequelizeModule} from '@nestjs/sequelize';
import {ProductCategory} from "./product_category.model";
import {ProductCategoryRepo} from "./product_category.repo";

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory])],
  providers: [ProductCategoryRepo],
})
export class ProductCategoryModule{}