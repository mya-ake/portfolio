import {
  createPageInfo,
  hasNextPage,
  hasPreviousPage,
} from '../shared/pagination';
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
    posts: async (_, { input }, { dataSources }) => {
      const realLimit = input?.first ?? input?.last ?? 10;
      const referenceDate = input?.after ?? input?.before ?? '';
      const orderType = input?.first ? 'DESC' : 'ASC';
      const response = await dataSources.microCMS.getPosts({
        limit: realLimit + 1,
        orderType,
        referenceDate,
      });

      const { contents } = response;
      const posts = contents.slice(0, realLimit);
      if (orderType === 'ASC') {
        posts.reverse();
      }

      const pageInfo = createPageInfo();
      pageInfo.hasNextPage = hasNextPage(input ?? {}, contents.length);
      pageInfo.hasPreviousPage = hasPreviousPage(input ?? {}, contents.length);
      pageInfo.startCursor = posts[0].publishedAt;
      pageInfo.endCursor = posts[posts.length - 1].publishedAt;

      return {
        edges: posts.map((post) => ({
          node: post,
          cursor: post.publishedAt,
        })),
        pageInfo,
      };
    },
  },
};
