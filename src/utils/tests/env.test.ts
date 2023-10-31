import { Env } from "#utils/env";
import { describe, afterAll, beforeEach, it, expect, vi } from "vitest";
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
      expect(Env('TEST_VAR' as any)).toBe('valueFromProcess');
    });
  
    it('should return environment variable from import.meta.env', () => {
      import.meta.env.TEST_VAR = 'valueFromImportMeta';
      expect(Env('TEST_VAR' as any)).toBe('valueFromImportMeta');
      expect('DEV' in import.meta.env).toBeTruthy()
      expect(Env('DEV' as any)).toBe('1');
    });
  
    it('should return an empty string if environment variable does not exist', () => {
      expect(Env('NON_EXISTENT_VAR' as any)).toBe('');
    });
  });