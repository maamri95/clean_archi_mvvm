import z from "zod";

export interface DataSource<T> {
  getByUuid(uuid: string): Promise<ApiStandardResponse<T> | null>;
  getAll(options?: PaginationOptions): Promise<PaginatedResult<T>>;
  create(item: T): Promise<ApiStandardResponse<T>>;
  update(uuid: string, item: T): Promise<ApiStandardResponse<T>>;
  delete(uuid: string): Promise<void>;
}

export const paginationOptionsSchema = z.object({
  page: z.number().int().positive().optional().default(1),
  per_page: z.number().int().positive().optional().default(10),
  sort: z.string().optional().optional(),
  include: z.string().optional().optional(),
  filter: z.record(z.any()).optional(),
  fields: z.record(z.string()).optional(),
});

export type PaginationOptions = z.infer<typeof paginationOptionsSchema>;

export const paginationResultLinksSchema = z.object({
  next: z.string().nullable(),
  prev: z.string().nullable(),
  first: z.string().nullable(),
  last: z.string().nullable(),
});

export const paginationResultMetaSchema = z.object({
  total: z.number().int().min(0),
  current_page: z.number().int().min(0),
  path: z.string(),
  per_page: z.number().int().positive(),
  to: z.number().int().positive().nullable(),
  last_page: z.number().int().positive(),
  links: z.array(
    z.object({
      url: z.string().nullable(),
      label: z.string(),
      active: z.boolean(),
    }),
  ),
});

export type PaginationResultMeta = z.infer<typeof paginationResultMetaSchema>;
export type PaginationResultLinks = z.infer<typeof paginationResultLinksSchema>;
export const paginationResultSchema = <T extends z.ZodTypeAny>(schema: T) =>
  z.object({
    data: z.array(schema),
    links: paginationResultLinksSchema,
    meta: paginationResultMetaSchema,
  });
export interface PaginatedResult<T> {
  data: T[];
  links: PaginationResultLinks;
  meta: PaginationResultMeta;
}
export const ApiStandardResponseSchema = <T extends z.ZodTypeAny>(tSchema: T) =>
  z.object({
    data: tSchema,
  });
export type ApiStandardResponse<T> = {
  data: T;
};
