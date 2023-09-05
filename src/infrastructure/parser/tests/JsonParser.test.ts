import { JsonParser } from "#infrastructure/parser/JsonParser";
import { ParserError } from "#contracts/Parser";
import { expect, it, describe, beforeAll } from "vitest";

describe("JsonParser", () => {
  let parser: JsonParser;

  beforeAll(() => {
    parser = new JsonParser();
  });

  it("should parse valid JSON strings", () => {
    const json = '{"name": "John", "age": 30}';
    const result = parser.parse(json);
    expect(result).toEqual({ name: "John", age: 30 });
  });

  it("should throw a ParserError on invalid JSON strings", () => {
    const json = '{"name": "John", "age": 30';
    expect(() => parser.parse(json)).toThrow(ParserError);
  });

  it("should prevent harmful JSON injections (like __proto__)", () => {
    const harmfulJSON = '{"__proto__": {"isAdmin": true}}';
    const parsed = parser.parse(harmfulJSON) as any;
    expect(parsed.isAdmin).toBeUndefined();
  });

  it("should serialize objects into JSON strings", () => {
    const obj = { name: "John", age: 30 };
    const result = parser.serialize(obj);
    expect(result).toBe('{"name":"John","age":30}');
  });
});
