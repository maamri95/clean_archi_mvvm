export interface DataSource<T> {
  getByUuid(uuid: string): Promise<T | null>;
  getAll(options?: PaginationOptions): Promise<PaginatedResult<T>>;
  create(item: T): Promise<T>;
  update(uuid: string, item: T): Promise<T>;
  delete(uuid: string): Promise<void>;
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
  sortBy?: string;
}

export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    current_page: number;
    has_more: boolean;
    has_previous: boolean;
    total_pages: number;
  };
}
