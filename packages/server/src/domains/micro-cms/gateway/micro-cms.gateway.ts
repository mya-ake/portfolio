import { http } from './client';
import type {
  ArticleRequest,
  ArticleResponse,
  ArticlesResponse,
} from '../types';

export const getArticle = async ({
  id,
}: ArticleRequest): Promise<ArticleResponse> => {
  const response = await http.get<ArticleResponse>(`articles/${id}`);
  return response.body;
};

export const getArticles = async (): Promise<ArticlesResponse> => {
  const response = await http.get<ArticlesResponse>('articles');
  return response.body;
};
