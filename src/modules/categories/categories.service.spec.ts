import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {ConflictException} from "@nestjs/common";
import {Category} from "./category.model";
import {CategoriesService} from "./categories.service";
import {NoContentException} from "../../shared/exceptions/no-content.exception";
import {
  testCategoryReq,
  testCategoryRes,
  toReturnNull,
  toReturnCategory,
  toReturnListCategories,
  toDestroyCategory,
  nothingToDestroy,
} from "./test-helpers/category.variables";

describe("CategoriesService create", () => {
  let categoriesService: CategoriesService;

  describe("When same category already exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              findOne: toReturnCategory,
              create: toReturnCategory,
            }
          },
        ],
      }).compile();
      categoriesService = module.get(CategoriesService);
    });

    it("should throw error", async () => {
      expect(async () => {
        await categoriesService.create(testCategoryReq);
      }).rejects.toThrow(ConflictException);
    });
  });

  describe("When same category does not exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              findOne: toReturnNull,
              create: toReturnCategory,
            }
          },
        ],
      }).compile();
      categoriesService = module.get(CategoriesService);
    });

    it("should return new category", async () => {
      expect(await categoriesService.create(testCategoryReq)).toEqual(testCategoryRes);
    });
  });
});

describe('CategoriesService delete', () => {
  let categoriesService: CategoriesService;

  describe("When content not found", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              destroy: nothingToDestroy,
            }
          },
        ],
      }).compile();
      categoriesService = module.get(CategoriesService);
    });

    it("should throw error", async () => {
      expect(async () => {
        await categoriesService.remove(1);
      }).rejects.toThrow(NoContentException);
    });
  });

  describe("When content exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              destroy: toDestroyCategory,
            }
          },
        ],
      }).compile();
      categoriesService = module.get(CategoriesService);
    });

    it("should return new category", async () => {
      expect(await categoriesService.remove(1)).toEqual(1);
    });
  });
});

describe('CategoriesService getList', () => {
  let categoriesService: CategoriesService;

  describe("Without additional params", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              findAll: toReturnListCategories,
            }
          },
        ],
      }).compile();
      categoriesService = module.get(CategoriesService);
    });

    it("should return array of categories", async () => {
      expect(await categoriesService.getList()).toEqual(expect.arrayContaining([testCategoryRes]));
    });
  });
});
