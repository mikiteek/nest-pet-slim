import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoriesModule} from './modules/categories/categories.module';
import {DatabaseModule} from "./utils/database";
import {ProductsModule} from "./modules/products/products.module";
import {ProductCategoryModule} from "./modules/product_category/product_category.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    CategoriesModule,
    ProductsModule,
    ProductCategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}