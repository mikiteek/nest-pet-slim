import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {ConflictException} from "@nestjs/common";
import {Product} from "./product.model";
import {ProductsService} from "./products.service";
import {
  testProductRes,
  testProductReq,
  toReturnNull,
  toReturnProduct,
} from "./test-helpers/product.variables";

describe("ProductsService create", () => {
  let productsService: ProductsService;

  describe("When same product already exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProductsService,
          {
            provide: getModelToken(Product),
            useValue: {
              findOne: toReturnProduct,
              create: toReturnProduct,
            },
          },
        ],
      }).compile();
      productsService = module.get(ProductsService);
    });

    it("should throw error", async () => {
      expect(async () => {
        await productsService.create(testProductReq);
      }).rejects.toThrow(ConflictException);
    });
  });

  describe("When same product does not exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          ProductsService,
          {
            provide: getModelToken(Product),
            useValue: {
              findOne: toReturnNull,
              create: toReturnProduct,
            },
          },
        ],
      }).compile();
      productsService = module.get(ProductsService);
    });

    it("should throw error", async () => {
      expect(await productsService.create(testProductReq)).toEqual(testProductRes);
    });
  });
});