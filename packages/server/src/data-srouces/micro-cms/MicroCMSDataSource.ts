import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import type {
  ArticleRequest,
  ArticleResponse,
  ArticlesResponse,
} from './types';

type Config = {
  baseURL: string;
  apiKey: string;
};

export class MicroCMSDataSource extends RESTDataSource {
  private apiKey: string;

  constructor(config: Config) {
    super();
    this.baseURL = config.baseURL;
    this.apiKey = config.apiKey;
  }

  willSendRequest(request: RequestOptions): void {
    request.headers.set('x-api-key', this.apiKey);
  }

  getArticle({ id }: ArticleRequest): Promise<ArticleResponse> {
    return this.get(`articles/${id}`);
  }

  getArticles(): Promise<ArticlesResponse> {
    return this.get<ArticlesResponse>('articles');
  }
}
