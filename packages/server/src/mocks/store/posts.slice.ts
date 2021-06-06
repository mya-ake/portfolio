import {
  createSlice,
  createEntityAdapter,
  EntityState,
} from '@reduxjs/toolkit';
import type { Post } from '../../generated/resolvers';

export const postsAdapter = createEntityAdapter<Post>();

export type State = EntityState<Post>;

export const postsSlice = createSlice({
  name: 'posts',
  initialState: postsAdapter.getInitialState(),
  reducers: {
    addPost: postsAdapter.addOne,
  },
});
