import { Logger, LogLevel } from "#contracts/logger/Logger";
import { injectable } from "tsyringe";

@injectable()
export class ConsoleLogger extends Logger {
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
