import { describe, it, expect } from 'vitest';
import { ImpGetFeatureFlagRequest } from '../getFeatureFlagRequest.dto';

describe('ImpGetFeatureFlagRequest', () => {

    describe('isValid', () => {

        it('should return true if featureName is non-empty', () => {
            const request = new ImpGetFeatureFlagRequest('testFeature');
            expect(request.isValid()).toBe(true);
        });

        it('should return false if featureName is empty', () => {
            const request = new ImpGetFeatureFlagRequest('');
            expect(request.isValid()).toBe(false);
        });

    });

});