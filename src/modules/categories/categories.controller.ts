import { Controller, Post, Get, Body } from '@nestjs/common';
import { CreateCategoryDto } from "./dbo/create-category.dto";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @Post()
  async createCategory(@Body() categoryData: CreateCategoryDto) {
    return await this.categoriesService.create(categoryData);
  }
}
