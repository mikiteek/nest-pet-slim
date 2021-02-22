import {Test, TestingModule} from '@nestjs/testing';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from "./categories.service";
import {
  testCategoryReq,
  testCategoryRes,
  toDestroyCategory,
  toReturnCategory,
  toReturnListCategories,
} from "./test-helpers/category.variables";

describe("CategoriesController", () => {
  let categoriesController: CategoriesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: toReturnCategory,
            remove: toDestroyCategory,
            getList: toReturnListCategories,
          },
        },
      ],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
  });

  it("should be defined", () => {
    expect(categoriesController).toBeDefined();
  });

  it("should return new category", async () => {
    expect(await categoriesController.createCategory(testCategoryReq)).toEqual(testCategoryRes);
  });

  it("should return count of destroyed rows as 1", async () => {
    expect(await categoriesController.removeCategory(testCategoryRes.id)).toEqual(1);
  });

  it("should return array of categories", async () => {
    expect(await categoriesController.getListCategories()).toEqual(expect.arrayContaining([testCategoryRes]));
  });
});
