import {Test, TestingModule} from '@nestjs/testing';
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";
import {
  testProductRes,
  testProductReq,
  toReturnProduct,
} from "./test-helpers/product.variables";

describe("ProductsController", () => {
  let productsController: ProductsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: toReturnProduct,
          }
        },
      ],
    }).compile();

    productsController = module.get<ProductsController>(ProductsController);
  });

  it("should be defined", () => {
    expect(productsController).toBeDefined();
  });

  it("should be defined", async () => {
    expect(await productsController.createProduct(testProductReq)).toEqual(testProductRes);
  });
});