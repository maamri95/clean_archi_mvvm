import { describe, it, expect } from 'vitest';
import { ImpGetFeatureFlagRequest } from '../getFeatureFlagRequest.dto';

describe('ImpGetFeatureFlagRequest', () => {

    it('should find in featureName same sting send in constructor', () => {
        const request = new ImpGetFeatureFlagRequest('testFeature');
        expect(request.featureName).toEqual('testFeature');
    });
});