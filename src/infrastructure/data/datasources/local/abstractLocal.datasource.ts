import {DataSource, PaginatedResult, PaginationOptions} from "#contracts/DataSource.ts";
const TIMEOUT = 5
export abstract class AbstractLocalDatasource<T extends {uuid: string}> implements DataSource<T> {
    constructor(private items: T[]) {}
    create(item: T): Promise<T> {
        return new Promise((resolve) => {
            this.items.push(item);
            setTimeout(() => {
                resolve(item);
            }, TIMEOUT);
        })
    }

    delete(uuid: string): Promise<void> {
        return new Promise((resolve) => {
            this.items = this.items.filter(f => f.uuid !== uuid);
            setTimeout(() => {
                resolve();
            }, TIMEOUT);
        })
    }

    getAll(options?: PaginationOptions): Promise<PaginatedResult<T>> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: this.items
                        .slice(options?.page || 1, options?.pageSize || 10),
                    meta: {
                        total: this.items.length,
                        current_page: options?.page || 1,
                        has_more: true,
                        has_previous: false,
                        total_pages: Math.ceil(this.items.length / (options?.pageSize || 10))
                    }
                });
            }, TIMEOUT);
        });
    }

    getByUuid(uuid: string): Promise<T | null> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const item = this.items.find(f => f.uuid === uuid);
                resolve(item ?? null);
            }, TIMEOUT);
        });
    }

    update(uuid: string, item: T): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.items = this.items.map(f => f.uuid === uuid ? item : f);
                resolve(item);
            }, TIMEOUT);
        });
    }

}