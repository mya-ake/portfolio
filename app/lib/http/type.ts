import { HTTP_METHODS } from './constants';

export type HttpMethods = typeof HTTP_METHODS[number];

export interface IHttp<E> {
  request<D>(
    request: HttpRequest,
    option?: HttpRequestOption,
  ): Promise<HttpResponse<D, E>>;

  cancelAll(): void;
  cancel(url: string): void;
}

export type HttpRequest = {
  url: string;
  method: HttpMethods;
};

export type HttpRequestOption = {
  cancelable: boolean;
};

interface IHttpResponse<D> {
  ok: boolean;
  status: number | undefined;
  data: D;
  noResponse: boolean;
  canceled: boolean;
}

export interface HttpOkResponse<D> extends IHttpResponse<D> {
  ok: true;
  status: number;
  noResponse: false;
  canceled: false;
}

export interface HttpErrorResponse<D> extends IHttpResponse<D> {
  ok: false;
  status: number;
  noResponse: false;
  canceled: false;
}

export interface HttpNoResponse extends IHttpResponse<undefined> {
  ok: false;
  status: undefined;
  data: undefined;
  noResponse: true;
  canceled: false;
}

export interface HttpCancelResponse extends IHttpResponse<undefined> {
  ok: false;
  status: undefined;
  data: undefined;
  noResponse: true;
  canceled: true;
}

export type HttpResponse<D, E> =
  | HttpOkResponse<D>
  | HttpErrorResponse<E>
  | HttpNoResponse
  | HttpCancelResponse;
