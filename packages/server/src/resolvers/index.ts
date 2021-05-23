import type { Context } from '../context';
import type { Resolvers } from '../generated/resolvers';

export const resolvers: Resolvers<Context> = {
  Query: {
    hello: () => 'Hello World',
    article: async (_, { id }, { dataSources }) => {
      const response = await dataSources.microCMS.getArticle({ id });
      return {
        ...response,
      };
    },
    artiles: async (_, __, { dataSources }) => {
      const response = await dataSources.microCMS.getArticles();
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
