import { injectable } from "tsyringe";
import ky, { Options } from "ky";
import { Env } from "#utils/env";
import type { Parser } from "#contracts/Parser";
@injectable()
export class KyFactory {
  static createInstance(parser:Parser<string, unknown>, kyConfig?: Options): typeof ky {
    return ky.create({
      prefixUrl: Env("apiUrl"),
      parseJson: parser.parse,
      ...(kyConfig || {}),
    });
  }
}
