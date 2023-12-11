import { container } from "tsyringe";
import { Validator } from "#contracts/Validator.ts";

export function validate<T extends Validator<TSchema>, TSchema>(
  validatorClass: new () => T,
) {
  return function (
    _target: any,
    _propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (request: TSchema) {
      const validator = container.resolve(validatorClass);
      const validationResult = validator.validate(request);

      if (!validationResult.isValid) {
        throw new Error(validationResult.errors?.join("\n"));
      }
      const data = validationResult.data;
      return originalMethod.apply(this, [data]);
    };
  };
}
