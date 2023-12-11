import { describe, it, beforeAll, expect } from "vitest";
import { FeatureFlag } from "#domain/feature-flag/entities/FeatureFlag.entity";
import { LocalFeatureFlagDatasource } from "#infrastructure/data/datasources/local/localFeatureFlag.datasource.ts";

describe("LocalFeatureFlagDatasource", () => {
  let datasource: LocalFeatureFlagDatasource;

  beforeAll(async () => {
    datasource = new LocalFeatureFlagDatasource([]);
  });
  it("should add item after create one", async () => {
    const feature = new FeatureFlag("test", true);
    await datasource.create(feature);
    await expect(datasource.getByUuid(feature.name)).resolves.toStrictEqual({
      data: feature,
    });
  });
  it("should remove item from source after delete it", async () => {
    const feature = new FeatureFlag("test", true);
    await datasource.create(feature);
    await datasource.delete(feature.name);
    await expect(datasource.getByUuid(feature.name)).resolves.toBe(null);
  });
  it("should update status after call update", async () => {
    const feature = new FeatureFlag("test", true);
    await datasource.create(feature);
    const featureFlag = new FeatureFlag("test", false);
    await datasource.update(feature.name, featureFlag);
    await expect(datasource.getByUuid(feature.name)).resolves.toStrictEqual({
      data: featureFlag,
    });
  });
  it("should return all items", async () => {
    const feature = new FeatureFlag("test", true);
    await datasource.create(feature);
    expect((await datasource.getAll()).data).toContain(feature);
  });
});
