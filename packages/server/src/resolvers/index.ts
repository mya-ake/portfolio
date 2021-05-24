import type { Context } from '../context';
import type { Resolvers } from '../generated/resolvers';

export const resolvers: Resolvers<Context> = {
  Query: {
    post: async (_, { id }, { dataSources }) => {
      const response = await dataSources.microCMS.getPost({ id });
      return {
        ...response,
      };
    },
    posts: async (_, __, { dataSources }) => {
      const response = await dataSources.microCMS.getPosts();
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
