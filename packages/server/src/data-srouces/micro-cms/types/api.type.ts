import { Article } from './articles.type';

export type ArticleRequest = { id: Article['id'] };
export type ArticleResponse = Article;

export type ArticlesResponse = {
  contents: Article[];
  totalCount: number;
  offset: number;
  limit: number;
};
