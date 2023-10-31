import {envValidation} from "#utils/env.ts";
import {setupDependencyInjection} from "#config/diConfig.ts";

export const setup = () => {
    envValidation();
    setupDependencyInjection();
}