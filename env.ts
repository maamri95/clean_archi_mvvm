import dotenv from "dotenv";
import z from "zod";
import * as process from "process";

export const envSchema = z.object({
    NXT_API_BASE_URL: z.string({
        invalid_type_error: "NXT_GOOGLE_API_KEY Must be a valid URL",
        required_error: "NXT_API_BASE_URL is required"
    }).url("NXT_GOOGLE_API_KEY Must be a valid URL").transform((value) => new URL(value)),
    NODE_ENV: z.enum(["development", "production", "test"]).optional().default("development"),
    CI: z.coerce.boolean().optional().default(false),
});





/**
 * Validate the environment variables against the schema
 * @param schema zod schema to validate against
 * @param env env variable object to validate
 */
export const envValidation = (schema: z.ZodType<any, any>, env: Record<string, unknown>) => {
    schema.parse({
        ...env,
    });
}

export const configVitePlugin = () => {
    return {
        name: 'validate-env',
        config() {
            const env = dotenv.config({
                encoding: 'utf-8',
            }).parsed;
                try {
                    envValidation(envSchema, env!)
                } catch (err) {
                    if (err instanceof z.ZodError) {
                        if (process.env.CI === undefined || process.env.CI === "false") {
                            throw new Error(`Invalid environment variables:\n${err.errors.map((error: { message: string; }) => error.message).join('\n')}`)
                        }else{
                            console.error(`Invalid environment variables:\n${err.errors.map((error: { message: string; }) => error.message).join('\n')}`)
                        }
                    }else {
                        throw new Error(err.message)
                    }
                }
        }
    }
}