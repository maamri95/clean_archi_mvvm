import { FeatureFlag } from "#domain/feature-flag/entities/FeatureFlag.entity";

export interface FeatureFlagRepository {
  /**
   * Gets a specific feature flag.
   * @param name - The name of the feature flag.
   * @returns The retrieved feature flag.
   */
    getFeatureFlag(name: string): Promise<FeatureFlag>;
}