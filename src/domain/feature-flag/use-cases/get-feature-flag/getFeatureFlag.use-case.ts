import {UseCase} from "#contracts/UseCase"
import type { FeatureFlagRepository } from "#domain/feature-flag/repositories/featureFlagRepository.repository";
import { inject, injectable } from "tsyringe";
import { DI_TOKENS } from "#config/diTokens.ts";
import { Logger } from "#contracts/logger";
import {FeatureFlagValidator} from "#domain/feature-flag/validator/featureFlag.validator.ts";
import {GetFeatureFlagResponse} from "#domain/feature-flag/dto/getFeatureFlagResponse.dto.ts";
import type {GetFeatureFlagRequest} from "#domain/feature-flag/dto/getFeatureFlagRequest.dto.ts";
import {validate} from "#src/decorator/validate.ts";

@injectable()
export class GetFeatureFlag implements UseCase<GetFeatureFlagRequest, GetFeatureFlagResponse> {

    constructor(
      @inject(DI_TOKENS.featureFlagRepository) private featureFlagRepository: FeatureFlagRepository, 
      @inject(DI_TOKENS.logger) private logger: Logger) {}
    @validate(FeatureFlagValidator)
    async execute(request: GetFeatureFlagRequest): Promise<GetFeatureFlagResponse | undefined> {
      const featureFlag = await this.featureFlagRepository.getFeatureFlag(request.featureName)
      this.logger.info(`${featureFlag.name} is : ${featureFlag.isEnabled ? 'enable' : 'disable'}`)
      return {
          featureFlag
      }
    }
  }
  



  