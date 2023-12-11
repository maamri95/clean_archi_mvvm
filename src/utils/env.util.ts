import { envSchema } from "#env";
import z from "zod";

type EnvKey = keyof z.infer<typeof envSchema>;

/**
 * Get an environment variable
 * @param key The key of the environment variable to get
 * @return The value of the environment variable
 * @example
 * const output = Env("PORT");
 * console.log(output);
 * // Output: 3000
 */
export const Env = <T extends EnvKey>(
  key: T,
): z.infer<(typeof envSchema.shape)[T]> => {
  if (!(key in envSchema.shape)) {
    throw new Error(`Key ${String(key)} not found in env schema`);
  }
  let value: string | undefined = undefined;

  try {
    if (process) {
      if (key in process.env) {
        value = process.env[key]!;
      }
    }
  } catch (e) {
    /* empty */
  }

  if (import.meta.env) {
    if (key in import.meta.env) {
      value = import.meta.env[key as any];
    }
  }
  const schemaForKey = envSchema.shape[key];
  return schemaForKey.parse(value);
};
