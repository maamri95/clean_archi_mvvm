import { LogLevel } from "#contracts/logger/Logger";
import { DefaultDateProvider } from "#infrastructure/dateProvider/DefaultDateProvider";
import { ConsoleLogger } from "#infrastructure/logger/ConsoleLogger";
import {
  vi,
  describe,
  beforeEach,
  afterEach,
  expect,
  it,
  SpyInstance,
} from "vitest";
describe("ConsoleLogger", () => {
  let logger: ConsoleLogger;
  let logSpy: SpyInstance;
  let errorSpy: SpyInstance;
  let infoSpy: SpyInstance;
  let warnSpy: SpyInstance;

  beforeEach(() => {
    logger = new ConsoleLogger(new DefaultDateProvider());
    logSpy = vi.spyOn(console, "log");
    errorSpy = vi.spyOn(console, "error");
    infoSpy = vi.spyOn(console, "info");
    warnSpy = vi.spyOn(console, "warn");
  });

  afterEach(() => {
    logSpy.mockRestore();
    errorSpy.mockRestore();
    infoSpy.mockRestore();
    warnSpy.mockRestore();
  });

  it("should log messages correctly", () => {
    logger.log("test log");
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(LogLevel.LOG));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining("test log"));
  });

  it("should log errors correctly", () => {
    const error = new Error("test error");
    logger.error("an error occurred", error);
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining(LogLevel.ERROR)
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining("an error occurred")
    );
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining(error.stack!)
    );
  });

  it("should log info correctly", () => {
    logger.info("test info");
    expect(infoSpy).toHaveBeenCalledWith(
      expect.stringContaining(LogLevel.INFO)
    );
    expect(infoSpy).toHaveBeenCalledWith(expect.stringContaining("test info"));
  });

  it("should log warnings correctly", () => {
    logger.warn("test warning");
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining(LogLevel.WARNING)
    );
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining("test warning")
    );
  });
});
