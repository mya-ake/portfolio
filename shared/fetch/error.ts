export class FetchError extends Error {
  name = "FetchError";
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}

export function isFetchError(error: unknown): error is FetchError {
  return error instanceof FetchError;
}
