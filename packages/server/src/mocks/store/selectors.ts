import { postsAdapter } from './posts.slice';

export const findOnePost = postsAdapter.getSelectors().selectById;
export const findAllPosts = postsAdapter.getSelectors().selectAll;
