import { describe, it, beforeAll, expect } from "vitest";
import { FeatureFlag } from "#domain/feature-flag/entities/FeatureFlag.entity";
import {LocalFeatureFlagDatasource} from "#infrastructure/data/datasources/local/localFeatureFlag.datasource.ts";

describe('LocalFeatureFlagDatasource', () => {
    let datasource: LocalFeatureFlagDatasource;

    beforeAll(async () => {
        datasource = new LocalFeatureFlagDatasource([]);
    });
    it('should add item after create one', async () => {
        const feature = new FeatureFlag('test', true);
        await datasource.create(feature);
        expect(await datasource.getByUuid(feature.name)).toBe(feature);
    });
    it('should remove item from source after delete it', async () => {
        const feature = new FeatureFlag('test', true);
        await datasource.create(feature);
        await datasource.delete(feature.name);
        expect(await datasource.getByUuid(feature.name)).toBe(null);
    });
    it('should update status after call update', async () => {
        const feature = new FeatureFlag('test', true);
        await datasource.create(feature);
        await datasource.update(feature.name, new FeatureFlag('test', false));
        expect((await datasource.getByUuid(feature.name))?.isEnabled).toBe(false);
    });
    it('should return all items', async () => {
        const feature = new FeatureFlag('test', true);
        await datasource.create(feature);
        expect((await datasource.getAll()).data).toContain(feature);
    });
});
