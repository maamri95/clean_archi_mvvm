import {Response} from "#contracts/Response"
import { FeatureFlag } from "#domaine/feature-flag/entities/FeatureFlag.entity";


export interface GetFeatureFlagResponse extends Response {
    featureFlag: FeatureFlag
  }