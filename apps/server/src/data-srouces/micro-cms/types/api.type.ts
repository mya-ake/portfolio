import { Post, PostInList } from './posts.type';

export type PostRequest = { id: Post['id'] };
export type PostResponse = Post;

export type PostsRequest = {
  limit: number;
  orderType: 'ASC' | 'DESC';
  referenceDate: string; // publishedAt
};
export type PostsResponse = {
  contents: PostInList[];
  totalCount: number;
  offset: number;
  limit: number;
};
