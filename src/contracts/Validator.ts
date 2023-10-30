import z from "zod";

export abstract class Validator<T> {
  protected abstract schema:  z.ZodObject<any, any>;
  validate(input: T): ValidationResult {
    const parse = this.schema.safeParse(input);
    if (!parse.success) {
      return {
        isValid: false,
        errors: parse.error.issues.map((issue) => {
            return {
                field: issue.path.join("."),
                message: issue.message
            };
        })
      };
    }
    return {
      isValid: parse.success
    };
  }
}

interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}
