import z from "zod";
import { Env } from "#utils/env.util.ts";
import { describe, it, expect, vi } from "vitest";
import * as envModule from "#env";
vi.mock("#env", () => {
  const mockSchema = z.object({
    TEST_VAR: z.string(),
    TEST_IMPORT_VAR: z.string().default("1"),
  });
  return {
    envSchema: mockSchema,
  };
});
describe("Env function", () => {
  it("should return environment variable", () => {
    expect(["production", "development", "test"]).include(
      Env("NXT_MODE" as any),
    );
  });

  it("should throw an error if environment variable does not exist", () => {
    expect(() =>
      Env("NON_EXISTENT_VAR" as keyof z.infer<typeof envModule.envSchema>),
    ).toThrowError();
  });
});
