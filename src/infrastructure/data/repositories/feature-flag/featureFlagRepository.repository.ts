import { FeatureFlag } from "#domaine/feature-flag/entities/FeatureFlag.entity";
import { FeatureFlagRepository } from "#domaine/feature-flag/repositories/featureFlagRepository.repository";
import { injectable } from "tsyringe";


@injectable()
export class LocalFeatureFlagRepository implements FeatureFlagRepository {
    constructor(private activeFlag: string[]){}
    getFeatureFlag(name: string): FeatureFlag {
        const isEnabled = this.activeFlag.includes(name)
        return new FeatureFlag(name, isEnabled);
      }
}