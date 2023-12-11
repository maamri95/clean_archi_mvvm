import {
  ApiStandardResponse,
  DataSource,
  PaginatedResult,
  PaginationOptions,
} from "#contracts/DataSource.ts";
const TIMEOUT = 5;
export abstract class AbstractLocalDatasource<T extends { uuid: string }>
  implements DataSource<T>
{
  constructor(private items: T[]) {}
  create(item: T): Promise<ApiStandardResponse<T>> {
    return new Promise((resolve) => {
      this.items.push(item);
      setTimeout(() => {
        resolve({
          data: item,
        });
      }, TIMEOUT);
    });
  }

  delete(uuid: string): Promise<void> {
    return new Promise((resolve) => {
      this.items = this.items.filter((f) => f.uuid !== uuid);
      setTimeout(() => {
        resolve();
      }, TIMEOUT);
    });
  }

  getAll(options?: PaginationOptions): Promise<PaginatedResult<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: this.items.slice(options?.page ?? 1, options?.per_page ?? 10),
          meta: {
            total: this.items.length,
            current_page: options?.page ?? 1,
            path: "",
            per_page: options?.per_page ?? 10,
            last_page: Math.ceil(this.items.length / (options?.per_page ?? 10)),
            to: this.items.length,
            links: [],
          },
          links: {
            next: "",
            prev: "",
            first: "",
            last: "",
          },
        });
      }, TIMEOUT);
    });
  }

  getByUuid(uuid: string): Promise<ApiStandardResponse<T> | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const item = this.items.find((f) => f.uuid === uuid);
        resolve(item ? { data: item } : null);
      }, TIMEOUT);
    });
  }

  update(uuid: string, item: T): Promise<ApiStandardResponse<T>> {
    return new Promise((resolve) => {
      setTimeout(() => {
        this.items = this.items.map((f) => (f.uuid === uuid ? item : f));
        resolve({ data: item });
      }, TIMEOUT);
    });
  }
}
