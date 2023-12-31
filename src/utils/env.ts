import { envSchema } from "#env";
import z from "zod";

type EnvKey = keyof z.infer<typeof envSchema>;
export const Env = <T extends EnvKey>(key: T): z.infer<typeof envSchema.shape[T]> => {

    if (!(key in envSchema.shape)) {
        throw new Error(`Key ${key} not found in env schema`);
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
            value = import.meta.env[key];
        }
    }
    const schemaForKey = envSchema.shape[key];
    return schemaForKey.parse(value);
}