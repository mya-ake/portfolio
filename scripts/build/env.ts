export const getUseMockServer = (): boolean =>
  Boolean(process.env.USE_MOCK_SERVER) ?? false;
