import {
  ApiStandardResponse,
  DataSource,
  PaginatedResult,
  PaginationOptions,
} from "#contracts/DataSource.ts";
import { inject } from "tsyringe";
import type { HttpClient } from "#contracts/HttpClient";
import { DI_TOKENS } from "#config/diTokens.ts";
import { Logger } from "#src/contracts/logger";
import { queryClient } from "#presentation/provider/query";
import { Env } from "#utils/env.util.ts";

export abstract class AbstractApiDatasource<T> implements DataSource<T> {
  protected verbose = Env("NXT_MODE") === "development";
  protected abstract baseUrl: string;
  constructor(
    @inject(DI_TOKENS.httpClient) protected readonly httpClient: HttpClient,
    @inject(DI_TOKENS.logger) protected readonly logger: Logger,
  ) {}
  public async create(item: T): Promise<ApiStandardResponse<T>> {
    this.log("create started");
    const promise = await this.httpClient.post<ApiStandardResponse<T>>({
      url: this.baseUrl,
      body: item as object,
    });
    this.log("create ended");
    return promise;
  }

  public async delete(uuid: string): Promise<void> {
    this.log("delete started");
    const promise = await this.httpClient.delete<void>({
      url: `${this.baseUrl}/${uuid}`,
    });
    this.log("delete ended");
    return promise;
  }

  public async getAll(
    options?: PaginationOptions & Record<string, any>,
  ): Promise<PaginatedResult<T>> {
    this.log("getAll started");
    const promise = await queryClient.ensureQueryData({
      queryKey: [this.baseUrl, "index", options],
      queryFn: async () => {
        return this.httpClient.get<PaginatedResult<T>, PaginationOptions>({
          url: this.baseUrl,
          params: options,
        });
      },
    });
    this.log("getAll ended");
    return promise;
  }

  public async getByUuid(uuid: string): Promise<ApiStandardResponse<T> | null> {
    this.log("getByUuid started");
    const promise = await queryClient.ensureQueryData({
      queryKey: [this.baseUrl, uuid],
      queryFn: async () => {
        return this.httpClient.get<ApiStandardResponse<T>>({
          url: `${this.baseUrl}/${uuid}`,
        });
      },
    });
    this.log("getByUuid ended");
    return promise;
  }

  public async update(uuid: string, item: T): Promise<ApiStandardResponse<T>> {
    this.log("update started");
    const promise = await this.httpClient.put<ApiStandardResponse<T>>({
      url: `${this.baseUrl}/${uuid}`,
      body: item as object,
    });
    this.log("update ended");
    return promise;
  }
  protected log(message: string) {
    if (!this.verbose) return;
    this.logger.info(`${this.baseUrl} - ${message}`);
  }
}
