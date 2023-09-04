import { DateProvider } from "#contracts/DateProvider";
import { Logger, LogLevel } from "#contracts/logger/Logger";
import { expect, it, describe, beforeEach } from "vitest";

describe("Logger abstract class", () => {
  let logger: MockLogger;

  beforeEach(() => {
    logger = new MockLogger(new MockDateProvider());
  });

  it("should format message correctly", () => {
    const formattedMessage = logger["formatMessage"](LogLevel.LOG, "test log");
    expect(formattedMessage).toContain(LogLevel.LOG);
    expect(formattedMessage).toContain("test log");
    expect(formattedMessage).toContain(
      new Date("2023-09-03 19:10").toISOString()
    );
  });

  it("should serialize errors correctly", () => {
    const error = new Error("test error");
    const serializedError = logger["serializeError"](error);
    expect(serializedError).toContain("Error: test error");
  });
});

class MockLogger extends Logger {
  // eslint-disable-next-line
  log(message: string): void {}
  // eslint-disable-next-line
  error(message: string, error: unknown): void {}
  // eslint-disable-next-line
  info(message: string): void {}
  // eslint-disable-next-line
  warn(message: string): void {}
}

class MockDateProvider implements DateProvider {
  now(): Date {
    return new Date("2023-09-03 19:10");
  }
  // eslint-disable-next-line
  addDays(date: Date, days: number): Date {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line
  isBefore(date1: Date, date2: Date): boolean {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line
  differenceInDays(date1: Date, date2: Date): number {
    throw new Error("Method not implemented.");
  }
  // eslint-disable-next-line
  differenceInHours(date1: Date, date2: Date): number {
    throw new Error("Method not implemented.");
  }
}