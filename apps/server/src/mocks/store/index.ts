import { configureStore, EnhancedStore, AnyAction } from '@reduxjs/toolkit';
import { createPost } from '@mya-ake-com/mock';
import { postsSlice, State as PostsState } from './posts.slice';
import type { ThunkMiddleware } from 'redux-thunk';
export * from './selectors';

type State = { posts: PostsState };
export type Store = EnhancedStore<
  State,
  AnyAction,
  [ThunkMiddleware<State, AnyAction, undefined>]
>;

const createStore = (): Store => {
  const store = configureStore({
    reducer: {
      posts: postsSlice.reducer,
    },
  });
  return store;
};

const initializeStore = (store: Store): void => {
  store.dispatch(postsSlice.actions.addPost(createPost()));
  store.dispatch(postsSlice.actions.addPost(createPost()));
};

export const setupStore = (): Store => {
  const store = createStore();
  initializeStore(store);
  return store;
};
