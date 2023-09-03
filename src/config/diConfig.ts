import "reflect-metadata";
import { DateProvider } from "#contracts/DateProvider";
import { HttpClient } from "#contracts/HttpClient";
import { Logger } from "#contracts/logger/Logger";
import { DateFnsDateProvider } from "#infrastructure/dateProvider/DateFnsDateProvider";
import { KyHttpClient } from "#infrastructure/httpClient/ky/KyHttpClient";
import { ConsoleLogger } from "#infrastructure/logger/ConsoleLogger";
import { container } from "tsyringe";
import ky from "ky";
import { KyFactory } from "#infrastructure/httpClient/ky/kyFactory";

export const DI_TOKENS = {
  logger: "Logger",
  dateProvider: "DateProvider",
  httpClient: "HttpClient",
  httpClientConfig: "httpClientConfig",
} as const;

export function setupDependencyInjection() {
  container.registerSingleton<Logger>(DI_TOKENS.logger, ConsoleLogger);
  container.registerSingleton<DateProvider>(
    DI_TOKENS.dateProvider,
    DateFnsDateProvider
  );
  container.registerSingleton<HttpClient>(DI_TOKENS.httpClient, KyHttpClient);
  container.register<typeof ky>(DI_TOKENS.httpClientConfig, {
    useValue: KyFactory.createInstance(),
  });
}
