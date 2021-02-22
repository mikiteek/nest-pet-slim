export const testCategoryReq = {
  name: "nutella"
};

export const testCategoryRes = {
  name: "nutella",
  id: 1
};


export const toReturnNull = jest.fn(() => null);
export const toReturnCategory = jest.fn(() => testCategoryRes);
export const toReturnListCategories = jest.fn(() => [testCategoryRes, testCategoryRes]);
export const toDestroyCategory = jest.fn(() => 1);
export const nothingToDestroy = jest.fn(() => 0);