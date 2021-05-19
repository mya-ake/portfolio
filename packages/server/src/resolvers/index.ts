import type { Resolvers } from '../generated/resolvers';

export const resolvers: Resolvers = {
  Query: {
    hello: () => ({
      message: 'Hello World',
    }),
  },
};
