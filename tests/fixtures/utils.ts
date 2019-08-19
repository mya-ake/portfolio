type Mocks = {
  [key: string]: jest.Mock;
};

export const clearMocks = (mocks: Mocks) => {
  Object.values(mocks).forEach(mock => mock.mockClear());
};
