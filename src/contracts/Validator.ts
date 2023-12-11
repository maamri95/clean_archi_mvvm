import z from "zod";

export abstract class Validator<T> {
  protected abstract schema: z.ZodType<any, any, any>;
  validate(input: T | null | undefined): ValidationResult<T> {
    const parse = this.schema.safeParse(input);
    if (!parse.success) {
      return {
        isValid: false,
        errors: parse.error.issues.map((issue) => {
          return {
            field: issue.path.join("."),
            message: issue.message,
          };
        }),
      };
    }
    return {
      isValid: parse.success,
      data: parse.data,
    };
  }
}

export type ValidationResultValid<T> = {
  isValid: true;
  data: T;
};
export type ValidationResult<T> =
  | {
      isValid: false;
      errors: ValidationError[];
    }
  | ValidationResultValid<T>;

export type ValidationResultData<T> = ValidationResultValid<T>["data"];
export interface ValidationError {
  field: string;
  message: string;
}
