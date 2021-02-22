import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CategoriesModule} from './modules/categories/categories.module';
import {DatabaseModule} from "./utils/database";
import {ProductsModule} from "./modules/products/products.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    DatabaseModule,
    CategoriesModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}