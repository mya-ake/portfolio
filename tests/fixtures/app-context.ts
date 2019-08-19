export const createContextMock = () => {
  const mocks = {
    http: jest.fn(),
  };

  const createMock = () => {
    return {
      $_context: {
        http: {
          request: mocks.http,
        },
      },
    };
  };

  return {
    mocks,
    createMock,
  };
};
