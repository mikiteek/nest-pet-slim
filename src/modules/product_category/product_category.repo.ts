import {ConflictException, Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {ProductCategory} from "./product_category.model";
import {CreateProductCategoryDto} from "./dto/create-product_category.dto";

@Injectable()
export class ProductCategoryRepo {
  constructor(
    @InjectModel(ProductCategory)
    private readonly productCategoryRepo: typeof ProductCategory,
  ) {}

  async create (productCategoryData: CreateProductCategoryDto): Promise<ProductCategory> {
    const productCategoryExisted = await this.productCategoryRepo.findOne(
      {
        where: {
          ...productCategoryData,
        }
      }
    );
    if (productCategoryExisted) {
      throw new ConflictException({message: "Such item already exist"});
    }
    return await this.productCategoryRepo.create(productCategoryData);
  }
}