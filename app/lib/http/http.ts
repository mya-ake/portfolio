import ky from 'ky';
import {
  IHttp,
  HttpRequest,
  HttpRequestOption,
  HttpResponse,
  HttpOkResponse,
  HttpNoResponse,
  HttpErrorResponse,
  HttpCancelResponse,
} from './type';
import { isUndefined } from '@/types/guards';

type Ky = typeof ky;

export class Http<E> implements IHttp<E> {
  private client: Ky;
  private abortControllers: Map<string, AbortController>;

  constructor(client: Ky) {
    this.client = client;
    this.abortControllers = new Map();
  }

  async request<D>(request: HttpRequest, option?: HttpRequestOption) {
    const { url: input } = request;

    const { cancelable = false } = option || {};
    const signal = cancelable ? this.createCancelSignal(input) : undefined;

    const options = { ...this.buildKyOptions(request), signal };
    const response = await this.client(input, options);

    const canceled = cancelable && this.isCanceled(input);
    this.deleteCancelController(input);

    return this.buildResponse<D>(response, { canceled });
  }

  cancelAll() {
    for (const url of this.abortControllers.keys()) {
      this.cancel(url);
    }
  }

  cancel(url: string) {
    const controller = this.abortControllers.get(url);
    if (isUndefined(controller)) {
      return;
    }
    controller.abort();
    this.deleteCancelController(url);
  }

  private createCancelSignal(url: string) {
    const controller = new AbortController();
    this.abortControllers.set(url, controller);
    return controller.signal;
  }

  private deleteCancelController(url: string) {
    this.abortControllers.delete(url);
  }

  private isCanceled(url: string): boolean {
    return !this.abortControllers.has(url);
  }

  private buildKyOptions(request: HttpRequest) {
    const { method } = request;
    return {
      method,
    };
  }

  private async buildResponse<D>(
    response: Response,
    { canceled }: { canceled: boolean },
  ): Promise<HttpResponse<D, E>> {
    if (canceled) {
      return this.buildCancelResponse();
    }

    const noResponse = typeof response === 'undefined';
    if (noResponse) {
      return this.buildNoResposne();
    }

    const { status, ok } = response;
    const data = await response.json();

    if (ok) {
      return this.buildOkResponse<D>(data, status);
    } else {
      return this.buildErrorResponse(data, status);
    }
  }

  private buildOkResponse<D>(data: D, status: number): HttpOkResponse<D> {
    return {
      ok: true,
      status,
      data,
      noResponse: false,
      canceled: false,
    };
  }

  private buildNoResposne(): HttpNoResponse {
    return {
      ok: false,
      status: undefined,
      data: undefined,
      noResponse: true,
      canceled: false,
    };
  }

  private buildErrorResponse(data: E, status: number): HttpErrorResponse<E> {
    return {
      ok: false,
      status,
      data,
      noResponse: false,
      canceled: false,
    };
  }

  private buildCancelResponse(): HttpCancelResponse {
    return {
      ok: false,
      status: undefined,
      data: undefined,
      noResponse: true,
      canceled: true,
    };
  }
}
