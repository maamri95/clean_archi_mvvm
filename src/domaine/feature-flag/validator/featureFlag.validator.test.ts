import {
    describe,
    beforeEach,
    it,
    expect,
} from 'vitest'
import { FeatureFlagValidator } from './featureFlag.validator'


describe('FeatureFlagValidator', () => {
    let validator: FeatureFlagValidator

    beforeEach(() => {
        validator = new FeatureFlagValidator()
    })

    it('should validate feature name', () => {
        const result = validator.validate({ featureName: 'test' })
        expect(result.isValid).toBe(true)
    })

    it('should not validate feature name', () => {
        const result = validator.validate({ featureName: 'te' })
        expect(result.isValid).toBe(false)
        expect(result.errors?.length).toEqual(1)
    })
});