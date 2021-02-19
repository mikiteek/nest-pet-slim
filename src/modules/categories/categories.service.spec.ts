import {Test, TestingModule} from '@nestjs/testing';
import {getModelToken} from "@nestjs/sequelize";
import {ConflictException} from "@nestjs/common";
import {Category} from "./category.model";
import {CategoriesService} from "./categories.service";

const testCategoryReq = {name: "milk"};
const testCategoryRes = {name: "milk", id: 1};

describe('CategoriesController', () => {
  let categoriesService: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        {
          provide: getModelToken(Category),
          useValue: {
            findOne: jest.fn(() => null),
          },
        },
      ],
    }).compile();
    categoriesService = module.get(CategoriesService);
  });

  it("should return new category", async () => {
    expect(await categoriesService.create(testCategoryReq)).toEqual(testCategoryRes);
  });

  // it("should return new category", async () => {
  //   expect(async () => {
  //     await categoriesService.create(testCategoryReq);
  //   }).toThrow(ConflictException);
  // });

  it('should be defined', () => {
    expect(categoriesService).toBeDefined();
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
