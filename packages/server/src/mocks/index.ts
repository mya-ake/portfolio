import { setupStore, findOnePost, findAllPosts, Store } from './store';
import { ApolloError } from 'apollo-server-express';
import { createPageInfo } from '../shared/pagination';
import { ERROR_CODES } from '@mya-ake-com/error';
import type { IResolvers } from '@graphql-tools/utils';
import type {
  QueryPostArgs,
  Post,
  PostConnection,
} from '../generated/resolvers';

export const createMocks = (store: Store): IResolvers => {
  return {
    Query: {
      post: (_: unknown, args: QueryPostArgs): Post => {
        const { id } = args;
        const post = findOnePost(store.getState().posts, id);
        if (!post) {
          throw new ApolloError('Not found post', ERROR_CODES.NOT_FOUND);
        }
        return post;
      },

      // not support args
      posts: (): PostConnection => {
        const posts = findAllPosts(store.getState().posts);
        const pageInfo = createPageInfo();
        pageInfo.startCursor = posts[0].publishedAt;
        pageInfo.endCursor = posts[posts.length - 1].publishedAt;

        return {
          edges: posts.map((post) => {
            return {
              node: {
                id: post.id,
                title: post.title,
                description: post.description,
                publishedAt: post.publishedAt,
                revisedAt: post.revisedAt,
                __typename: 'PostInList',
              },
              cursor: post.publishedAt,
            };
          }),
          pageInfo,
        };
      },
    },
  };
};

const initializeMocks = (): Store => {
  const store = setupStore();
  return store;
};

export const setupMocks = (): IResolvers => {
  const store = initializeMocks();
  return createMocks(store);
};
