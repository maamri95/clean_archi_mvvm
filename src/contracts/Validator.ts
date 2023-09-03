export interface Validator<T> {
  validate(input: T): ValidationResult;
}

interface ValidationResult {
  isValid: boolean;
  errors?: ValidationError[];
}

interface ValidationError {
  field: string;
  message: string;
}
