import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import type { PostRequest, PostResponse, PostsResponse } from './types';

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

  getPosts(): Promise<PostsResponse> {
    return this.get<PostsResponse>('posts');
  }
}
