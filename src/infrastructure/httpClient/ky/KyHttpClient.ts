import { inject, injectable } from "tsyringe";
import {
  BaseOptions,
  BodyOptions,
  ClientError,
  HttpClient,
  HttpClientError,
  NetworkError,
  RequestOptions,
  ServerError,
} from "#contracts/HttpClient";
import ky, { HTTPError, Options as KyOptions, TimeoutError } from "ky";
import type { Parser } from "#contracts/Parser.ts";
import { DI_TOKENS } from "#config/diTokens.ts";
import { flattenObjectWithBracketNotation } from "#utils/object.ts";

@injectable()
export class KyHttpClient implements HttpClient {
  constructor(
    @inject(DI_TOKENS.httpClientConfig) private readonly api: typeof ky,
    @inject(DI_TOKENS.parser) private readonly parser: Parser<string, unknown>,
  ) {}

  async get<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>,
  ): Promise<T> {
    return this.request({ method: "get", options });
  }

  async delete<T, TParams = Record<string, string>>(
    options: BaseOptions<TParams>,
  ): Promise<T> {
    return this.request({ method: "delete", options });
  }

  async post<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>,
  ): Promise<T> {
    return this.request({ method: "post", options });
  }

  async put<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>,
  ): Promise<T> {
    return this.request({ method: "put", options });
  }
  async patch<T, TBody = object, TParams = Record<string, string>>(
    options: BodyOptions<TBody, TParams>,
  ): Promise<T> {
    return this.request({ method: "patch", options });
  }

  async request<T, TBody = object, TParams = Record<string, string>>(
    requestOptions: RequestOptions<TBody, TParams>,
  ): Promise<T> {
    const kyOptions = this.buildKyOptions(requestOptions);
    try {
      return await this.api[requestOptions.method](
        requestOptions.options.url,
        kyOptions,
      ).json();
    } catch (error) {
      console.log(error);
      this.handleError(error as Error);
    }
  }

  private buildKyOptions<TBody, TParams>({
    method,
    options,
  }: RequestOptions<TBody, TParams>): KyOptions {
    const token = (
      this.parser.parse(localStorage.getItem("token") ?? "{}") as {
        access_token?: string;
      }
    )?.access_token;
    return {
      ...(options.params && {
        searchParams: flattenObjectWithBracketNotation(options.params),
      }),
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      ...(["post", "put", "patch"].includes(method) && {
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
          error.response.status,
        );
      }
    }

    throw new HttpClientError(`UnknownError: ${error.message}`);
  }
}
