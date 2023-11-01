import { Logger, LogLevel } from "#contracts/logger/Logger";
import {inject, injectable} from "tsyringe";
import type {Parser} from "#contracts/Parser.ts";
import {DI_TOKENS} from "#config/diTokens.ts";
import type {DateProvider} from "#contracts/DateProvider.ts";

@injectable()
export class ConsoleLogger extends Logger {
  constructor(
      @inject(DI_TOKENS.dateProvider) dateProvider: DateProvider,
      @inject(DI_TOKENS.parser) parser: Parser<string, unknown>,
      prefix?: string
  ) {
    super(dateProvider, parser, prefix)
  }
  log(message: string): void {
    console.log(this.formatMessage(LogLevel.LOG, message));
  }

  error(message: string, error: unknown): void {
    const errorDetails = this.serializeError(error);
    console.error(
      this.formatMessage(LogLevel.ERROR, `${message}. Détails: ${errorDetails}`)
    );
  }

  info(message: string): void {
    console.info(this.formatMessage(LogLevel.INFO, message));
  }

  warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARNING, message));
  }

}
