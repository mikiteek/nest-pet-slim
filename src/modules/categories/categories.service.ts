import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize"
import {Category} from "./category.model";
import {CreateCategoryDto} from "./dbo/create-category.dto";

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepo: typeof Category,
  ) {}

    async create (categoryData: CreateCategoryDto): Promise<Category> {
    const categoryExisted = await this.categoryRepo.findOne({where: {name: categoryData.name}});
    if (categoryExisted) {
      throw new ConflictException({message: "Name must be unique"});
    }
    return await this.categoryRepo.create(categoryData);
  }
}