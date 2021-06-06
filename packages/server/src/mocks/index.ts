import { setupStore, findOnePost, Store } from './store';
import { ApolloError, IMocks } from 'apollo-server-express';
import type { QueryPostArgs, Post } from '../generated/resolvers';

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
