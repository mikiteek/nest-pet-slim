import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/sequelize";
import {Product} from "./product.model";
import {CreateProductDto} from "./dto/create-product.dto";
import {ConflictException} from "@nestjs/common";


@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productRepo: typeof Product,
  ) {}
  async create (productData: CreateProductDto): Promise<Product> {
    const productExisted = await this.productRepo.findOne(
      {
        where: {
          ...productData
        },
      },
    );
    if (productExisted) {
      throw new ConflictException({message: "Such object already exist"});
    }
    return await this.productRepo.create(productData);
  }
}