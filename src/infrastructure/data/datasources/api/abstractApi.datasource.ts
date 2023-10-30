import {DataSource, PaginatedResult, PaginationOptions} from "#contracts/DataSource.ts";
import {inject} from "tsyringe";
import type {HttpClient} from "#contracts/HttpClient.ts";
import {DI_TOKENS} from "#config/diConfig.ts";
import { Logger } from "#src/contracts/logger";

export abstract class AbstractApiDatasource<T> implements DataSource<T>{
    protected abstract baseUrl: string;
    constructor(
        @inject(DI_TOKENS.httpClient) private readonly httpClient: HttpClient,
        @inject(DI_TOKENS.logger) private readonly logger: Logger,
        ) {
    }
    async create(item: T): Promise<T> {
        this.#log('create started')
        const promise = await this.httpClient.post<T>({
            url: this.baseUrl,
            body: item as object
        });
        this.#log('create ended')
        return promise;
    }

    async delete(uuid: string): Promise<void> {
        this.#log('delete started')
        const promise = await this.httpClient.delete<void>({
            url: `${this.baseUrl}/${uuid}`
        });
        this.#log('delete ended')
        return promise;
    }

    async getAll(options?: PaginationOptions): Promise<PaginatedResult<T>> {
        this.#log('getAll started')
        const promise = await this.httpClient.get<PaginatedResult<T>>({
            url: this.baseUrl,
            params: {
                page: options?.page?.toString() || '1',
                per_page: options?.pageSize?.toString() || '10',
                sort_by: options?.sortBy || 'id',
            }
        });
        this.#log('getAll ended')
        return promise;
    }

    async getByUuid(uuid: string): Promise<T | null> {
        this.#log('getByUuid started')
        const promise = this.httpClient.get<T>({
            url: `${this.baseUrl}/${uuid}`
        });
        this.#log('getByUuid ended');
        return promise;
    }

    async update(uuid: string, item: T): Promise<T> {
        this.#log('update started')
        const promise = await this.httpClient.put<T>({
            url: `${this.baseUrl}/${uuid}`,
            body: item as object
        });
        this.#log('update ended')
        return promise;
    }
    #log(message: string){
        this.logger.info(`${this.baseUrl} - ${message}`)
    }
}