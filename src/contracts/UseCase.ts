import { Request } from "#contracts/Request";
import { Response } from "#contracts/Response";

export interface UseCase<Req extends Request, Res extends Response> {
  execute(request?: Req): Promise<Res>;
}
