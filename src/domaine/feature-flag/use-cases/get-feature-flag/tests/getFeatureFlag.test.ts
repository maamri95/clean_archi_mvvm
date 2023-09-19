import {describe, beforeEach, vi, expect, it, Mocked} from 'vitest'
import { GetFeatureFlag } from '../getFeatureFlag.usecase';
import { FeatureFlagRepository } from '#domaine/feature-flag/repositories/featureFlagRepository.repository';
import { Logger } from '#contracts/logger';
import { GetFeatureFlagRequest } from '#domaine/feature-flag/dto/getFeatureFlagResponse.dto';
import {FeatureFlagValidator} from "#domaine/feature-flag/validator/featureFlag.validator.ts";

class Request implements GetFeatureFlagRequest {
    constructor(public featureName: string){
    }
    isValid(): boolean {
        return true
    }
}
describe('GetFeatureFlag', () => {
    let getFeatureFlag: GetFeatureFlag;
    let mockRepo: Mocked<FeatureFlagRepository>;
    let mockLogger: Mocked<Logger>;
    let mockValidator: Mocked<FeatureFlagValidator>;

    beforeEach(() => {
        // Créez des moqueries pour les dépendances
        mockRepo = {
            getFeatureFlag: vi.fn(),
        };

        mockLogger = {
            log: vi.fn(),
            error: vi.fn(),
            info: vi.fn(),
            warn: vi.fn(),
        } as any;

        mockValidator = {
            validate: vi.fn(),
        }

        getFeatureFlag = new GetFeatureFlag(mockRepo, mockLogger, mockValidator);
    });

    it('should return feature flag and log the status', async () => {
        const expectedFeatureFlag = { name: 'testFeature', isEnabled: true };
        mockRepo.getFeatureFlag.mockReturnValueOnce(expectedFeatureFlag);
        mockValidator.validate.mockReturnValueOnce({isValid: true});
        const request = new Request('testFeature');
        const result = await getFeatureFlag.execute(request);
        
        // Vérifiez si le drapeau de fonction est correctement renvoyé
        expect(result?.featureFlag).toEqual(expectedFeatureFlag);
        
        // Vérifiez si le journal a été appelé avec le bon message
        expect(mockLogger.info).toHaveBeenCalledWith('testFeature is : enable');
    });

    it('should log the status as "disable" when the feature is not enabled', async () => {
        const disabledFeatureFlag = { name: 'disabledFeature', isEnabled: false };
        mockRepo.getFeatureFlag.mockReturnValueOnce(disabledFeatureFlag);
        mockValidator.validate.mockReturnValueOnce({isValid: true});
        const request = new Request('disabledFeature');
        const result = await getFeatureFlag.execute(request);
    
        // Vérifiez si le drapeau de fonction est correctement renvoyé
        expect(result?.featureFlag).toEqual(disabledFeatureFlag);
    
        // Vérifiez si le journal a été appelé avec le bon message
        expect(mockLogger.info).toHaveBeenCalledWith('disabledFeature is : disable');
    });
    
});