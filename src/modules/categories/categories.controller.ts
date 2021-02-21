import {Controller, Post, Body, UsePipes, Delete, Param, ParseIntPipe, Get} from '@nestjs/common';
import {CreateCategoryDto} from "./dbo/create-category.dto";
import {CategoriesService} from "./categories.service";
import {ValidationPipe} from "../../shared/pipes/validation.pipe";

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  async createCategory (@Body() categoryData: CreateCategoryDto) {
    return await this.categoriesService.create(categoryData);
  }

  @Delete(":id")
  async removeCategory(@Param("id", ParseIntPipe) id: number) {
    return await this.categoriesService.remove(id);
  }

  @Get()
  async getListCategories() {
    return await this.categoriesService.getList();
  }
}