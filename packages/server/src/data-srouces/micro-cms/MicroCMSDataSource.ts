import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { ApolloError } from 'apollo-server-core';
import { ERROR_CODES } from '@mya-ake-com/error';
import type {
  PostRequest,
  PostResponse,
  PostsRequest,
  PostsResponse,
} from './types';

type ErrorResponse = {
  message: string;
  extensions: {
    response: {
      status: number;
    };
  };
};

const isErrorResponse = (input: unknown): input is ErrorResponse => {
  console.log(input);
  if (typeof input !== 'object' || input === null) {
    return false;
  }
  return 'extensions' in input;
};

// TODO: moce error package
const getErrorCode = (status: number): string => {
  switch (status) {
    case 404:
      return ERROR_CODES.NOT_FOUND;
    default:
      return ERROR_CODES.UNKNOWN;
  }
};

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

  private handleError(error: unknown) {
    if (!isErrorResponse(error)) {
      return Promise.reject(
        new ApolloError('Unknown error', ERROR_CODES.UNKNOWN),
      );
    }
    const status = error.extensions.response.status;
    const code = getErrorCode(status);
    return Promise.reject(new ApolloError(error.message, code));
  }

  getPost({ id }: PostRequest): Promise<PostResponse> {
    return this.get(`posts/${id}`).catch(this.handleError);
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
