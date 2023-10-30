import {Response} from "#contracts/Response.ts";
import {FeatureFlag} from "#domaine/feature-flag/entities/FeatureFlag.entity.ts";

export interface GetFeatureFlagResponse extends Response {
    featureFlag: FeatureFlag
}