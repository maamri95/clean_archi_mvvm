import { DateProvider } from "#contracts/DateProvider";
import { Parser } from "#contracts/Parser";
import { Logger, LogLevel } from "#contracts/logger/Logger";
import { expect, it, describe, beforeEach } from "vitest";

describe("Logger abstract class", () => {
  let logger: MockLogger;
  let dateProvider: MockDateProvider;
  let parser: MockParser

  beforeEach(() => {
    dateProvider = new MockDateProvider();
    parser = new MockParser()
    logger = new MockLogger(dateProvider, parser);
  });

  it("should format message correctly", () => {
    const formattedMessage = logger["formatMessage"](LogLevel.LOG, "test log");
    expect(formattedMessage).toContain(LogLevel.LOG);
    expect(formattedMessage).toContain("test log");
    expect(formattedMessage).toContain(
      dateProvider.now().toISOString()
    );
  });

  it("should serialize errors correctly", () => {
    const error = new Error("test error");
    const serializedError = logger["serializeError"](error);
    expect(serializedError).toContain("Error: test error");
  });

  it("should serialize message errors correctly", () => {
    const message = "test error";
    const serializedError = logger["serializeError"](message);
    expect(serializedError).toContain("test error");
  });

  it("should serialize object errors correctly", () => {
    const objectError = {
      error: "test error"
    };
    const serializedError = logger["serializeError"](objectError);
    expect(serializedError).toContain(JSON.stringify(objectError));
  });

  it("should serialize errors correctly", () => {
    const error = new Error("test error");
    const serializedError = logger["serializeError"](error);
    expect(serializedError).toContain("Error: test error");
  });

  it("should has correct prefix", () => {
    const newLogger = new MockLogger(dateProvider, parser, 'test-prefix');
    const formattedMessage = newLogger["formatMessage"](LogLevel.LOG, "test log");
    expect(formattedMessage).toContain("test-prefix");
  })
});

class MockLogger extends Logger {
  // eslint-disable-next-line
  log(message: string): void {
    console.log(message)
  }
  // eslint-disable-next-line
  error(message: string, error: unknown): void {
    console.error(message, error)
  }
  // eslint-disable-next-line
  info(message: string): void {
    console.info(message)
  }
  // eslint-disable-next-line
  warn(message: string): void {
    console.warn(message)
  }
}

class MockDateProvider implements DateProvider {
  now(): Date {
    return new Date("2023-09-03 19:10");
  }
  // eslint-disable-next-line
  addDays(date: Date, days: number): Date {
    console.log(date, days)
    return date
  }
  // eslint-disable-next-line
  isBefore(date1: Date, date2: Date): boolean {
    console.log(date1, date2)
    return true
  }
  // eslint-disable-next-line
  differenceInDays(date1: Date, date2: Date): number {
    console.log(date1, date2)
    return 1
  }
  // eslint-disable-next-line
  differenceInHours(date1: Date, date2: Date): number {
    console.log(date1, date2)
    return 1
  }
}

class MockParser implements Parser<string, unknown> {
  parse(input: string): unknown {
    return JSON.parse(input);
  }
  serialize(obj: unknown): string {
    return JSON.stringify(obj)
  }

}