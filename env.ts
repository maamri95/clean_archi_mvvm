import z from "zod";

export const envSchema = z.object({
    NXT_API_BASE_URL: z.string().url("Must be a valid URL").transform((value) => new URL(value)),
    NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
    CI: z.boolean().optional().default(false),
});