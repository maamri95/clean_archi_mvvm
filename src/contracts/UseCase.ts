import { Request } from "#contracts/Request";
import { Response } from "#contracts/Response";

/**
 * Represents a use case in the application.
 */
export interface UseCase<
  Req extends Request | undefined,
  Res extends Response | void,
> {
  execute(request?: Req): Promise<Res | undefined>;
}

/**
 * Custom error class for use cases.
 */
export class UseCaseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UseCaseError";
  }
}
