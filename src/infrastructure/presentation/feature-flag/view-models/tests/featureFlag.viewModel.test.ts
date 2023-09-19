import { describe, it, beforeEach, vi, expect, Mocked } from "vitest";
import {FeatureFlagViewModel} from "../featureFlag.viewModel"
import { GetFeatureFlag } from "#domaine/feature-flag/use-cases/get-feature-flag/getFeatureFlag.usecase";

describe('FeatureFlagViewModel', () => {
  let getFeatureFlagMock: Mocked<GetFeatureFlag>;
  let viewModel: FeatureFlagViewModel;

  beforeEach(() => {
    // Initialisation des mocks
    getFeatureFlagMock = {
      execute: vi.fn(),
    } as any;

    viewModel = new FeatureFlagViewModel(getFeatureFlagMock);
  });

  it('should return true if feature is enabled', async () => {
    const featureName = 'some-feature';
    getFeatureFlagMock.execute.mockResolvedValue({ featureFlag: { isEnabled: true, name: "some-feature" } });

    const result = await viewModel.isFeatureEnabled(featureName);

    expect(result).toBe(true);
    expect(getFeatureFlagMock.execute).toHaveBeenCalledWith({ featureName });
  });

  it('should return false if feature is disabled', async () => {
    const featureName = 'some-feature';
    getFeatureFlagMock.execute.mockResolvedValue({ featureFlag: { isEnabled: false, name: "some-feature" } });

    const result = await viewModel.isFeatureEnabled(featureName);

    expect(result).toBe(false);
    expect(getFeatureFlagMock.execute).toHaveBeenCalledWith({ featureName });
  });

  it('should return false if feature name is invalid', async () => {
    const featureName = ''; // assuming this is invalid
    const result = await viewModel.isFeatureEnabled(featureName);
    getFeatureFlagMock.execute.mockResolvedValue(undefined)
    expect(result).toBe(false);
    expect(getFeatureFlagMock.execute).toHaveBeenCalled();
  });
});
