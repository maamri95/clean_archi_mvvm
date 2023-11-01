import {setupDependencyInjection} from "#config/diConfig.ts";
import {envSchema, envValidation} from "#env";
import z from "zod";
import {setupErrorHandler} from "#config/handler.ts";

export const setup = () => {
    try {
        envValidation(envSchema, import.meta.env);
    }catch (e) {
        if (e instanceof z.ZodError) {
            throw new Error(`Invalid environment variables:\n${e.errors.map((error: { message: string; }) => error.message).join('\n')}`)
        }
    }

    const container = setupDependencyInjection();
    setupErrorHandler(container);
}