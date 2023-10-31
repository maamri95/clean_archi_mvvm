import z from "zod";
import { Env } from "#utils/env";
import { describe, afterAll, beforeEach, it, expect, vi } from "vitest";
import * as envModule from "#env";
vi.mock('#env', () => {
        const mockSchema = z.object({
            TEST_VAR: z.string(),
            TEST_IMPORT_VAR: z.string().default('1')
        });
        return {
            envSchema: mockSchema,
        };
    });
describe('Env function', () => {
    const OLD_ENV = process.env;
  
    beforeEach(() => {
      vi.resetModules();
      process.env = { ...OLD_ENV };
      delete process.env.TEST_VAR;
    });
  
    afterAll(() => {
      process.env = OLD_ENV;
    });
  
    it('should return environment variable from process.env', () => {
      process.env.TEST_VAR = 'valueFromProcess';
      expect(Env('TEST_VAR' as keyof z.infer<typeof envModule.envSchema>)).toBe('valueFromProcess');
    });
  
    it('should return environment variable from import.meta.env', () => {
      (import.meta.env.TEST_IMPORT_VAR as any) = 'valueFromImportMeta';
      expect(Env('TEST_IMPORT_VAR' as any)).toBe('valueFromImportMeta');
    });
  
    it('should throw an error if environment variable does not exist', () => {
      expect(() => Env('NON_EXISTENT_VAR' as keyof z.infer<typeof envModule.envSchema>)).toThrowError();
    });
  });