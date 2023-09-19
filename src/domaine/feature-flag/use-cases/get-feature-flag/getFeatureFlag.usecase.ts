import {UseCase} from "#contracts/UseCase"
import type { FeatureFlagRepository } from "#domaine/feature-flag/repositories/featureFlagRepository.repository";
import {GetFeatureFlagResponse} from "#domaine/feature-flag/dto/getFeatureFlagRequest.dto"
import {GetFeatureFlagRequest} from "#domaine/feature-flag/dto/getFeatureFlagResponse.dto"
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "#config/diConfig";
import { Logger } from "#contracts/logger";
import {FeatureFlagValidator} from "#domaine/feature-flag/validator/featureFlag.validator.ts";

@injectable()
export class GetFeatureFlag implements UseCase<GetFeatureFlagRequest, GetFeatureFlagResponse> {

    constructor(
      @inject(DI_TOKENS.featureFlagRepository) private featureFlagRepository: FeatureFlagRepository, 
      @inject(DI_TOKENS.logger) private logger: Logger,
      @inject(FeatureFlagValidator) private featureFlagValidator: FeatureFlagValidator) {}
    async execute(request: GetFeatureFlagRequest): Promise<GetFeatureFlagResponse | undefined> {
        const validationResult = this.featureFlagValidator.validate(request)
        if(!validationResult.isValid){
            this.logger.error('Invalid request', validationResult.errors)
            return undefined
        }
      const featureFlag = this.featureFlagRepository.getFeatureFlag(request.featureName)
      this.logger.info(`${featureFlag.name} is : ${featureFlag.isEnabled ? 'enable' : 'disable'}`)
      return {
        featureFlag
      }
    }
  
  }
  



  