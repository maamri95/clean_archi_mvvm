import { DateProvider } from "#contracts/DateProvider";
/**
 * Abstract base class for loggers.
 */
export abstract class Logger {
  protected prefix: string = "";

  constructor(
    private readonly dateProvider: DateProvider,
    prefix?: string
  ) {
    if (prefix) this.prefix = `[${prefix}]`;
  }

  abstract log(message: string): void;
  abstract error(message: string, error: unknown): void;
  abstract info(message: string): void;
  abstract warn(message: string): void;

  protected formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.dateProvider.now().toISOString();
    return `${this.prefix}[${timestamp} - ${level}]: ${message}`;
  }

  protected serializeError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    }
    return typeof error === "object" ? JSON.stringify(error) : String(error);
  }
}

export enum LogLevel {
  LOG = "LOG",
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING",
}
