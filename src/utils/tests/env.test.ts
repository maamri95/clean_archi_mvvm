import { Env } from "#utils/env";
import { describe, afterAll, beforeEach, it, expect, vi } from "vitest";
describe('Env function', () => {
    // sauvegarder les variables d'environnement originales
    const OLD_ENV = process.env;
  
    beforeEach(() => {
      vi.resetModules(); // pour s'assurer que nous avons une nouvelle instance à chaque fois
      process.env = { ...OLD_ENV }; // faire une copie des variables d'environnement originales
      delete process.env.TEST_VAR; // assurer qu'il n'y a pas de TEST_VAR initial
    });
  
    afterAll(() => {
      process.env = OLD_ENV; // restaurer l'environnement original après tous les tests
    });
  
    it('should return environment variable from process.env', () => {
      process.env.TEST_VAR = 'valueFromProcess';
      expect(Env('TEST_VAR')).toBe('valueFromProcess');
    });
  
    it('should return environment variable from import.meta.env', () => {
      import.meta.env.TEST_VAR = 'valueFromImportMeta';
      expect(Env('TEST_VAR')).toBe('valueFromImportMeta');
      expect('DEV' in import.meta.env).toBeTruthy()
      expect(Env('DEV')).toBe('1');
    });
  
    it('should return an empty string if environment variable does not exist', () => {
      expect(Env('NON_EXISTENT_VAR')).toBe('');
    });
  });