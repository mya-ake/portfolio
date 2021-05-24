import { Post } from './posts.type';

export type PostRequest = { id: Post['id'] };
export type PostResponse = Post;

export type PostsResponse = {
  contents: Post[];
  totalCount: number;
  offset: number;
  limit: number;
};
