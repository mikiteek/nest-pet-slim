import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from '@nestjs/sequelize';
import {Category} from "./category.model";
import {CreateCategoryDto} from "./dbo/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

    async create (categoryData: CreateCategoryDto): Promise<Category> {
    const categoryExisted = await this.categoryModel.findOne({where: {name: categoryData.name}});
    if (categoryExisted) {
      throw new ConflictException({message: "Name must be unique"});
    }
    const category = new Category();
    category.name = categoryData.name;
    return await category.save();
  }
}