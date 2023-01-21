export class FetchError extends Error {
  name = "FetchError";
  response: Response;

  constructor(message: string, response: Response) {
    super(message);
    this.response = response;
  }
}
