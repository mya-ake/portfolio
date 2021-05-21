import { getArticle, getArticles } from '../domains/micro-cms';
import type { Resolvers } from '../generated/resolvers';

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello World',
    article: async (_, { id }) => {
      const response = await getArticle({ id });
      return {
        ...response,
      };
    },
    artiles: async () => {
      const response = await getArticles();
      const { contents, ...pagination } = response;
      return {
        edges: {
          node: contents,
        },
        pagination,
      };
    },
  },
};
