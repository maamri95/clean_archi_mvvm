import { Parser, ParserError } from "#contracts/Parser";
import { injectable } from "tsyringe";

@injectable()
export class JsonParser implements Parser<string, unknown> {
    parse(input: string): unknown {
      try {
        return JSON.parse(input, (key, value) =>
        key === "__proto__" ? undefined : value);
      } catch (error) {
        const err = error as Error
        throw new ParserError(`Failed to parse JSON: ${err.message}`);
      }
    }
  
    serialize(obj: unknown): string {
      return JSON.stringify(obj);
    }
  }