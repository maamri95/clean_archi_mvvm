import { inject, injectable } from "tsyringe";
import {
  HttpClient,
  BaseOptions,
  BodyOptions,
  ServerError,
  ClientError,
  NetworkError,
  HttpClientError,
  RequestOptions,
} from "#contracts/HttpClient";
import ky, { Options as KyOptions, TimeoutError, HTTPError } from "ky";

@injectable()
export class KyHttpClient implements HttpClient {
  constructor(@inject("httpClientConfig") private readonly api: typeof ky) {}

  async get<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>
  ): Promise<T> {
    return this.request({ method: "get", options });
  }

  async delete<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>
  ): Promise<T> {
    return this.request({ method: "delete", options });
  }

  async post<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>
  ): Promise<T> {
    return this.request({ method: "post", options });
  }

  async put<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>
  ): Promise<T> {
    return this.request({ method: "put", options });
  }

  async request<T, TBody = object, TParams = Record<string, string>>(
    requestOptions: RequestOptions<TBody, TParams>
  ): Promise<T> {
    const kyOptions = this.buildKyOptions(requestOptions);

    try {
      const response: T = await this.api[requestOptions.method](
        requestOptions.options.url,
        kyOptions
      ).json();
      return response;
    } catch (error) {
      this.handleError(error as Error);
    }
  }

  private buildKyOptions<TBody, TParams>({
    method,
    options,
  }: RequestOptions<TBody, TParams>): KyOptions {
    return {
      ...(options.params && { searchParams: options.params }),
      ...(["post", "put"].includes(method) && {
        json: (options as BodyOptions<TBody, TParams>).body,
      }),
    };
  }
  private handleError(error: Error): never {
    if (error instanceof TimeoutError) {
      throw new NetworkError("Network error: timeout exceeded");
    }

    if (error instanceof HTTPError) {
      if (error.response.status >= 500) {
        throw new ServerError(`ServerError: ${error.response.statusText}`);
      } else {
        throw new ClientError(
          `ClientError: ${error.response.statusText}`,
          error.response.status
        );
      }
    }

    throw new HttpClientError(`UnknownError: ${error.message}`);
  }
}
