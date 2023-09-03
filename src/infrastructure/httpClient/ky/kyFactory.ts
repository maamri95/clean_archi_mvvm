import { injectable } from "tsyringe";
import ky, { Options } from "ky";
import { Env } from "#utils/env";
@injectable()
export class KyFactory {
  static createInstance(kyConfig?: Options): typeof ky {
    return ky.create({
      prefixUrl: Env("apiUrl"),
      parseJson: (response) =>
        JSON.parse(response, (key, value) =>
          key === "__proto__" ? undefined : value
        ),
      ...(kyConfig || {}),
    });
  }
}
