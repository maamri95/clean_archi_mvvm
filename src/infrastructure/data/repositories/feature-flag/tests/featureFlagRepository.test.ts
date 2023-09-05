import { describe, it, beforeAll, expect } from "vitest";
import { LocalFeatureFlagRepository } from "../featureFlagRepository.repository";
import { FeatureFlag } from "#domaine/feature-flag/entities/FeatureFlag.entity";


describe('LocalFeatureFlagRepository', () => {
    let repo: LocalFeatureFlagRepository;
    const activeFlags = ['testFeature', 'anotherFeature'];

    beforeAll(() => {
        repo = new LocalFeatureFlagRepository(activeFlags);
    });

    it('should return a FeatureFlag object with isEnabled true for active features', () => {
        for (const name of activeFlags) {
            const result = repo.getFeatureFlag(name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(name);
            expect(result.isEnabled).toBe(true);
        }
    });

    it('should return a FeatureFlag object with isEnabled false for inactive features', () => {
        const inactiveFeatures = ['inactiveFeature', 'yetAnotherInactiveFeature'];

        for (const name of inactiveFeatures) {
            const result = repo.getFeatureFlag(name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(name);
            expect(result.isEnabled).toBe(false);
        }
    });

    it('should return all features as inactive when no active flags are provided', () => {
        const repoWithoutActiveFlags = new LocalFeatureFlagRepository([]);

        const featuresToCheck = ['testFeature', 'anotherFeature', 'inactiveFeature'];

        for (const name of featuresToCheck) {
            const result = repoWithoutActiveFlags.getFeatureFlag(name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(name);
            expect(result.isEnabled).toBe(false);
        }
    });
});