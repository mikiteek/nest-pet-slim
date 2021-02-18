import { Module } from "@nestjs/common";
import { SequelizeModule } from '@nestjs/sequelize';
import { Category } from "./category.model";
import { CategoriesController } from "./categories.controller";
import { CategoriesService } from "./categories.service";

@Module({
  imports: [SequelizeModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}