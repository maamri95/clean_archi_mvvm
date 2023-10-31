import { envValidation } from "../../env";
import { describe, beforeEach, it, expect, vi } from "vitest";
import z from "zod";

describe('Env validation', () => {
    const schema = z.object({
        TEST_VAR: z.string()
    });

    beforeEach(() => {
        vi.resetModules();
    });


    it('should throw an error when variable not in the env', () => {
        expect(() => envValidation(schema, {})).toThrowError();
    });

    it('should passes with valid env', () => {
        expect(() => envValidation(schema, { TEST_VAR: 'value' })).not.toThrowError();
    });
});