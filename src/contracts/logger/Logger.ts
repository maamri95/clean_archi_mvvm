import type { DateProvider } from "#contracts/DateProvider";
import type { Parser } from "#contracts/Parser";
/**
 * Provides abstraction for logging functionalities.
 */
export abstract class Logger {
  protected prefix: string = "";

  /**
   * @param dateProvider - Provider for generating timestamps.
   * @param parser - Parser for serialize error.
   * @param prefix - Optional prefix to prepend before each log message.
   */
  constructor(
     private readonly dateProvider: DateProvider,
    private readonly parser: Parser<string, unknown>,
    prefix?: string
  ) {
    if (prefix) this.prefix = `[${prefix}]`;
  }

  /**
   * Logs a generic message.
   * @param message - The message to log.
   */
  abstract log(message: string): void;

  /**
   * Logs an error.
   * @param message - The error message.
   * @param error - The error object or related data.
   */
  abstract error(message: string, error: unknown): void;

  /**
   * Logs an informational message.
   * @param message - The informational message.
   */
  abstract info(message: string): void;

  /**
   * Logs a warning message.
   * @param message - The warning message.
   */
  abstract warn(message: string): void;

  /**
   * Formats a log message with timestamp and log level.
   * @param level - The log level.
   * @param message - The message to format.
   * @returns The formatted log message.
   */
  protected formatMessage(level: LogLevel, message: string): string {
    const timestamp = this.dateProvider.now().toISOString();
    return `${this.prefix}[${timestamp} - ${level}]: ${message}`;
  }

  /**
   * Serializes an error into a string format.
   * @param error - The error to serialize.
   * @returns The serialized error string.
   */
  protected serializeError(error: unknown): string {
    if (error instanceof Error) {
      return `${error.name}: ${error.message}\n${error.stack}`;
    }
    return typeof error === "object" ? this.parser.serialize(error) : String(error);
  }
}

/**
 * Enumeration of log levels.
 */
export enum LogLevel {
  LOG = "LOG",
  ERROR = "ERROR",
  INFO = "INFO",
  WARNING = "WARNING",
}
