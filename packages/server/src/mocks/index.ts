import { setupStore, findOnePost, findAllPosts, Store } from './store';
import { ApolloError, IMocks } from 'apollo-server-express';
import { createPageInfo } from '../shared/pagination';
import type {
  QueryPostArgs,
  Post,
  PostConnection,
} from '../generated/resolvers';

export const createMocks = (store: Store): IMocks => {
  return {
    Post: (_, args): Post => {
      const { id } = args as QueryPostArgs;
      const post = findOnePost(store.getState().posts, id);
      if (!post) {
        throw new ApolloError('Not found post');
      }
      return post;
    },

    // not support args
    PostConnection: (): PostConnection => {
      const posts = findAllPosts(store.getState().posts);
      const pageInfo = createPageInfo();
      pageInfo.startCursor = posts[0].publishedAt;
      pageInfo.endCursor = posts[posts.length - 1].publishedAt;

      return {
        edges: posts.map((post) => ({
          node: { ...post, __typename: 'PostInList' },
          cursor: post.publishedAt,
        })),
        pageInfo,
      };
    },
  };
};

const initializeMocks = (): Store => {
  const store = setupStore();
  return store;
};

export const setupMocks = (): IMocks => {
  const store = initializeMocks();
  return createMocks(store);
};
