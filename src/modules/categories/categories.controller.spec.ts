import {Test, TestingModule} from '@nestjs/testing';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from "./categories.service";

const testCategory = {name: "milk", id: 1};

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn(() => testCategory),
          },
        },
      ],
    }).compile();

    categoriesController = module.get<CategoriesController>(CategoriesController);
  });

  it('should be defined', () => {
    expect(categoriesController).toBeDefined();
  });
  it("should return new category", async () => {
    expect(await categoriesController.createCategory(testCategory)).toEqual(testCategory);
  });

  // it("should throw conflict exception", () => {
  //   const spyCategoryFindOne = jest.spyOn(Category, "findOne");
  //   spyCategoryFindOne.mockResolvedValue(testCategoryDataRes);
  //
  //   expect(() => {
  //     categoriesController.createCategory(testCategoryDataReq);
  //   }).toThrow(ConflictException);
  // });
  //
  // it("should return testCategoryDataRes", () => {
  //   const spyCategoryFindOne = jest.spyOn(Category, "findOne");
  //   spyCategoryFindOne.mockResolvedValue(null);
  //   jest.spyOn(category, "save").mockResolvedValue(testCategoryDataRes);
  //
  //   expect(categoriesController.createCategory(testCategoryDataReq)).toEqual(testCategoryDataRes);
  // });
  //
  // it("should return testCategoryDataRes", () => {
  //   const spyCategoryFindOne = jest.spyOn(Category, "findOne");
  //   spyCategoryFindOne.mockResolvedValue(null);
  //   jest.spyOn(categoriesService, "create").mockResolvedValue(testCategoryDataRes);
  //
  //   expect(categoriesController.createCategory(testCategoryDataReq)).toEqual(testCategoryDataRes);
  // });
});
