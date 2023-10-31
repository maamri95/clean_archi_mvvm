import {envValidation} from "#utils/env.ts";
import {setupDependencyInjection} from "#config/diConfig.ts";
import {envSchema} from "#env";

export const setup = () => {
    envValidation(envSchema, import.meta.env);
    setupDependencyInjection();
}