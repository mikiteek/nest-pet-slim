import {Test, TestingModule} from '@nestjs/testing';
import {CategoriesController} from './categories.controller';
import {CategoriesService} from "./categories.service";

const testCategory = {name: "milk", id: 1};
const testDestroyedCount = 1;

describe('CategoriesController', () => {
  let categoriesController: CategoriesController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoriesController],
      providers: [
        {
          provide: CategoriesService,
          useValue: {
            create: jest.fn(() => testCategory),
            remove: jest.fn(() => testDestroyedCount),
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

  it("should return count of destroyed rows as 1", async () => {
    expect(await categoriesController.removeCategory(testCategory.id)).toEqual(testDestroyedCount);
  });
});
