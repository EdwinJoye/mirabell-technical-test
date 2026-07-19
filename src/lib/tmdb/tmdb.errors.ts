export class TmdbApiError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly tmdbStatusCode?: number,
  ) {
    super(message);
    this.name = "TmdbApiError";
  }
}
