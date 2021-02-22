export const testProductRes = {
  title: "fried eggs",
  weight: 100,
  calories: 320,
  id: 1,
};

export const testProductReq = {
  title: "fried eggs",
  weight: 100,
  calories: 320,
};

export const toReturnNull = jest.fn(() => null);
export const toReturnProduct = jest.fn(() => testProductRes);