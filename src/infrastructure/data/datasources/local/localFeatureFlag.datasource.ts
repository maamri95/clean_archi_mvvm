import {FeatureFlag} from "#domain/feature-flag/entities/FeatureFlag.entity.ts";
import {AbstractLocalDatasource} from "#infrastructure/data/datasources/local/abstractLocal.datasource.ts";

export class LocalFeatureFlagDatasource extends AbstractLocalDatasource<FeatureFlag>{
}