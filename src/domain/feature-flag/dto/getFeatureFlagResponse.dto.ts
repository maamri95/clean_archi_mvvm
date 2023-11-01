import {Response} from "#contracts/Response.ts";
import {FeatureFlag} from "#domain/feature-flag/entities/FeatureFlag.entity.ts";

export interface GetFeatureFlagResponse extends Response {
    featureFlag: FeatureFlag
}