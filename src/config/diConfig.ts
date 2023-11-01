import "reflect-metadata";
import { DateProvider } from "#contracts/DateProvider";
import { HttpClient } from "#contracts/HttpClient";
import { DateFnsDateProvider } from "#infrastructure/dateProvider/DateFnsDateProvider";
import { KyHttpClient } from "#infrastructure/httpClient/ky/KyHttpClient";
import { ConsoleLogger } from "#infrastructure/logger/ConsoleLogger";
import { container } from "tsyringe";
import ky from "ky";
import { KyFactory } from "#infrastructure/httpClient/ky/kyFactory";
import { LocalFeatureFlagRepository } from "#infrastructure/data/repositories/feature-flag/featureFlagRepository.repository";
import { FeatureFlagRepository } from "#domain/feature-flag/repositories/featureFlagRepository.repository";
import { Parser } from "#contracts/Parser";
import { JsonParser } from "#infrastructure/parser/JsonParser";
import { Logger } from "#contracts/logger";
import {LocalFeatureFlagDatasource} from "#infrastructure/data/datasources/local/localFeatureFlag.datasource.ts";
import {FeatureFlag} from "#domain/feature-flag/entities/FeatureFlag.entity.ts";
import {DI_TOKENS} from "#config/diTokens.ts";
import {GlobalErrorHandler} from "#infrastructure/errorHandler/globalErrorHandler.ts";


export function setupDependencyInjection() {
  container.registerSingleton<Logger>(DI_TOKENS.logger, ConsoleLogger);
  container.registerSingleton<DateProvider>(
    DI_TOKENS.dateProvider,
    DateFnsDateProvider
  );
  container.registerSingleton<HttpClient>(DI_TOKENS.httpClient, KyHttpClient);
  container.register<typeof ky>(DI_TOKENS.httpClientConfig, {
    useValue: KyFactory.createInstance(new JsonParser()),
  });
  container.register<FeatureFlagRepository>(DI_TOKENS.featureFlagRepository, {
    useValue: new LocalFeatureFlagRepository(
        new LocalFeatureFlagDatasource([
            new FeatureFlag('test', true)
        ])
    )
  })
  container.registerSingleton<Parser<string, unknown>>(DI_TOKENS.parser, JsonParser)
  container.registerSingleton<GlobalErrorHandler>(GlobalErrorHandler, GlobalErrorHandler)
  return container;
}
