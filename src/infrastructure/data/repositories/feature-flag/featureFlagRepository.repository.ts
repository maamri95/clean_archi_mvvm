import { FeatureFlag } from "#domain/feature-flag/entities/FeatureFlag.entity";
import { FeatureFlagRepository } from "#domain/feature-flag/repositories/featureFlagRepository.repository";
import {inject, injectable} from "tsyringe";
import {LocalFeatureFlagDatasource} from "#infrastructure/data/datasources/local/localFeatureFlag.datasource.ts";


@injectable()
export class LocalFeatureFlagRepository implements FeatureFlagRepository {
    constructor(@inject(LocalFeatureFlagDatasource) private readonly localFeatureFlagDatasource: LocalFeatureFlagDatasource){}
    async getFeatureFlag(name: string): Promise<FeatureFlag> {
        const feature =  await this.localFeatureFlagDatasource.getByUuid(name)
        return feature ? feature : new FeatureFlag(name, false)
      }
}