import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {ConflictException} from "@nestjs/common";
import {Category} from "./category.model";
import {CategoriesService} from "./categories.service";

const testCategoryReq = {name: "nutella"};
const testCategoryRes = {name: "nutella", id: 1};

const findOneEmpty = jest.fn(() => null);
const findOneValue = jest.fn(() => testCategoryRes);
const createCategoryMock = jest.fn(() => testCategoryRes);

describe('CategoriesController', () => {
  let categoriesService: CategoriesService;

  describe("When same category already exist", () => {
    beforeAll(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [
          CategoriesService,
          {
            provide: getModelToken(Category),
            useValue: {
              findOne: findOneValue,
              create: createCategoryMock,
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
              findOne: findOneEmpty,
              create: createCategoryMock,
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
