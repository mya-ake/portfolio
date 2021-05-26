import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import type {
  PostRequest,
  PostResponse,
  PostsRequest,
  PostsResponse,
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

  getPost({ id }: PostRequest): Promise<PostResponse> {
    return this.get(`posts/${id}`);
  }

  getPosts({
    limit,
    orderType,
    referenceDate,
  }: PostsRequest): Promise<PostsResponse> {
    const filters: string[] = [];
    const orders: string[] = [];

    if (!referenceDate) {
      const order = orderType === 'ASC' ? 'publishedAt' : '-publishedAt';
      orders.push(order);
    } else if (orderType === 'ASC') {
      orders.push('publishedAt');
      filters.push(`publishedAt[greater_than]${referenceDate}`);
    } else {
      orders.push('-publishedAt');
      filters.push(`publishedAt[less_than]${referenceDate}`);
    }

    return this.get<PostsResponse>('posts', {
      fields: ['id', 'title', 'publishedAt', 'revisedAt'].join(','),
      limit,
      filters: filters.join('[and]'),
      orders: orders.join(','),
    });
  }
}
