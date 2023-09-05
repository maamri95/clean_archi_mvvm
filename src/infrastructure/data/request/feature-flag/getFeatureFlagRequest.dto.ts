import { GetFeatureFlagRequest } from "#domaine/feature-flag/dto/getFeatureFlagResponse.dto";
import { injectable } from "tsyringe";

@injectable()
export class ImpGetFeatureFlagRequest implements GetFeatureFlagRequest {
    constructor(public featureName: string){}
    isValid(): boolean {
        return this.featureName.length > 0;
    }
    
}