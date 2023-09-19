import { GetFeatureFlag } from "#domaine/feature-flag/use-cases/get-feature-flag/getFeatureFlag.usecase";
import { ImpGetFeatureFlagRequest } from "#infrastructure/data/request/feature-flag/getFeatureFlagRequest.dto";
import { inject, injectable } from "tsyringe";

@injectable()
export class FeatureFlagViewModel {
    constructor(@inject(GetFeatureFlag) private getFeatureFlag: GetFeatureFlag) {}
    /**
     * Checks if a specific feature is enabled.
     * @param featureName - The name of the feature.
     * @returns True if the feature is enabled; otherwise, false.
     */
    async isFeatureEnabled(featureName: string): Promise<boolean> {
      const request = new ImpGetFeatureFlagRequest(featureName)
        const response = await this.getFeatureFlag.execute(request);
        if(response){
          return response.featureFlag.isEnabled;
        }
      return false      
    }
  }
  