import { describe, it, expect } from "vitest";
import {
  flattenObject,
  flattenObjectWithBracketNotation,
  convertBracketNotationToDotNotation,
  convertDotNotationToBracketNotation,
  unFlattenObject,
  serializeObjectToQueryString,
} from "#utils/object.ts";

describe("Util:Object", () => {
  describe("unFlattenObject", () => {
    it("should be defined", () => {
      expect(unFlattenObject).toBeDefined();
    });
    it("should unflatten object", () => {
      const input = {
        "user.name": "John",
        "user.age": 30,
      };
      const output = unFlattenObject(input);
      expect(output).toBeDefined();
      expect(output).toEqual({
        user: {
          name: "John",
          age: 30,
        },
      });
    });
  });

  describe("convertBracketNotationToDotNotation", () => {
    it("should be defined", () => {
      expect(convertBracketNotationToDotNotation).toBeDefined();
    });
    it("should convert bracket notation to dot notation", () => {
      const input = {
        "user[name]": "John",
        "user[age]": 30,
      };
      const output = convertBracketNotationToDotNotation(input);
      expect(output).toBeDefined();
      expect(output).toEqual({
        "user.name": "John",
        "user.age": 30,
      });
    });
  });

  describe("serializeObjectToQueryString", () => {
    it("should be defined", () => {
      expect(serializeObjectToQueryString).toBeDefined();
    });
    it("should serialize object to query string", () => {
      const input = {
        "user.name": "John",
        "user.age": 30,
      };
      const output = serializeObjectToQueryString(input);
      expect(output).toBeDefined();
      expect(output).toEqual("user.name=John&user.age=30");
    });
  });

  describe("flattenObjectWithBracketNotation", () => {
    it("should be defined", () => {
      expect(flattenObjectWithBracketNotation).toBeDefined();
    });

    it("should flatten object with bracket notation", () => {
      const input = {
        user: {
          name: "John",
          age: 30,
          address: {
            city: "Paris",
            street: "123 Main St",
          },
        },
      };
      const output = flattenObjectWithBracketNotation(input);
      expect(output).toBeDefined();
      expect(output).toEqual({
        "user[name]": "John",
        "user[age]": 30,
        "user[address][city]": "Paris",
        "user[address][street]": "123 Main St",
      });
    });
  });

  describe("convertDotNotationToBracketNotation", () => {
    it("should be defined", () => {
      expect(convertDotNotationToBracketNotation).toBeDefined();
    });
    it("should convert dot notation to bracket notation", () => {
      const input = {
        "user.name": "John",
        "user.age": 30,
      };
      const output = convertDotNotationToBracketNotation(input);
      expect(output).toBeDefined();
      expect(output).toEqual({
        "user[name]": "John",
        "user[age]": 30,
      });
    });
  });

  describe("flattenObject", () => {
    it("should be defined", () => {
      expect(flattenObject).toBeDefined();
    });

    it("should flatten object", () => {
      const input = {
        user: {
          name: "John",
          age: 30,
          address: {
            city: "Paris",
            street: "123 Main St",
          },
        },
      };
      const output = flattenObject(input);
      expect(output).toBeDefined();
      expect(output).toEqual({
        "user.name": "John",
        "user.age": 30,
        "user.address.city": "Paris",
        "user.address.street": "123 Main St",
      });
    });
  });
});
