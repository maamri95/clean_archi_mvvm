export interface HttpClient {
  get<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>
  ): Promise<T>;

  delete<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>
  ): Promise<T>;

  post<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>
  ): Promise<T>;

  put<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>
  ): Promise<T>;

  request<T, TBody = object, TParams = Record<string, string>>(
    requestOptions: RequestOptions<TBody, TParams>
  ): Promise<T>;
}

export type BaseOptions<TParams> = {
  url: string;
  params?: TParams;
};

export type BodyOptions<TBody, TParams> = BaseOptions<TParams> & {
  body: TBody;
};

export type RequestMethod = "get" | "delete" | "post" | "put";

export type RequestOptions<Tbody, TParams> =
  | {
      method: Exclude<RequestMethod, "get" | "delete">;
      options: BodyOptions<Tbody, TParams>;
    }
  | {
      method: Exclude<RequestMethod, "post" | "put">;
      options: BaseOptions<TParams>;
    };

export class HttpClientError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "HttpClientError";
  }
}

export class NetworkError extends HttpClientError {
  constructor(message: string) {
    super(message);
    this.name = "NetworkError";
  }
}

export class ServerError extends HttpClientError {
  constructor(message: string) {
    super(message);
    this.name = "ServerError";
  }
}

export class ClientError extends HttpClientError {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = "ClientError";
  }
}

export class MiddelwareError extends HttpClientError {
  constructor(message: string) {
    super(message);
    this.name = "MiddelwareError";
  }
}
