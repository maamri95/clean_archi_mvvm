import { describe, it, beforeAll, expect } from "vitest";
import { LocalFeatureFlagRepository } from "../featureFlagRepository.repository";
import { FeatureFlag } from "#domaine/feature-flag/entities/FeatureFlag.entity";
import {LocalFeatureFlagDatasource} from "#infrastructure/data/datasources/local/localFeatureFlag.datasource.ts";


describe('LocalFeatureFlagRepository', () => {
    let repo: LocalFeatureFlagRepository;
    const activeFlags = [
        new FeatureFlag('testFeature', true),
        new FeatureFlag('anotherFeature', true)
    ];

    beforeAll(async () => {
        const localFeatureFlagDatasource = new LocalFeatureFlagDatasource(activeFlags);
        repo = new LocalFeatureFlagRepository(localFeatureFlagDatasource);
    });

    it('should return a FeatureFlag object with isEnabled true for active features', async () => {
        for (const feature of activeFlags) {
            const result = await repo.getFeatureFlag(feature.name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(feature.uuid);
            expect(result.isEnabled).toBe(true);
        }
    });

    it('should return a FeatureFlag object with isEnabled false for inactive features', async () => {
        const inactiveFeatures = ['inactiveFeature', 'yetAnotherInactiveFeature'];

        for (const name of inactiveFeatures) {
            const result = await repo.getFeatureFlag(name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(name);
            expect(result.isEnabled).toBe(false);
        }
    });

    it('should return all features as inactive when no active flags are provided', async () => {
        const repoWithoutActiveFlags = new LocalFeatureFlagRepository(new LocalFeatureFlagDatasource([]));

        const featuresToCheck = ['testFeature', 'anotherFeature', 'inactiveFeature'];

        for (const name of featuresToCheck) {
            const result = await repoWithoutActiveFlags.getFeatureFlag(name);
            expect(result).toBeInstanceOf(FeatureFlag);
            expect(result.name).toBe(name);
            expect(result.isEnabled).toBe(false);
        }
    });
});