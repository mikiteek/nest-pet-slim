import {Test, TestingModule} from '@nestjs/testing';
import {ProductsController} from "./products.controller";
import {ProductsService} from "./products.service";

const testProductRes = {
  title: "fried eggs",
  weight: 100,
  calories: 320,
  id: 1,
};

const testProductReq = {
  title: "fried eggs",
  weight: 100,
  calories: 320,
};

describe("ProductsController", () => {
  let productsController: ProductsController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: {
            create: jest.fn(() => testProductRes),
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