export interface Parser<Input, Output> {
    /**
     * Parse the input and return the resulting object.
     * @param input The data to parse.
     * @throws {ParserError} If the parsing fails.
     * @returns The parsed object.
     */
    parse(input: Input): Output;
  
    /**
     * Serialize or convert an object back to the original format.
     * @param obj The object to convert.
     * @returns The serialized or converted representation of the object.
     */
    serialize(obj: Output): Input;
  }
  
  export class ParserError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "ParserError";
    }
  }