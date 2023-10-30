import { renderHook } from '@testing-library/react';
import { useQuery } from '@tanstack/react-query';
import useDi from '#presentation/hook/useDi.ts';
import { useFeatureFlagViewModel } from '../featureFlag.viewModel';
import {vi, it, describe, beforeEach, expect, Mock } from 'vitest'
import {GetFeatureFlag} from "#domaine/feature-flag/use-cases/get-feature-flag/getFeatureFlag.usecase.ts";

// You'd import this mock or mock the real useDi function depending on your project structure.
vi.mock('#presentation/hook/useDi.ts');
// Mocking useQuery
vi.mock('@tanstack/react-query', () => ({
  useQuery: vi.fn()
}));

// Mocking useDi
const mockGetFeatureFlag = {
  execute: vi.fn()
};


describe('useFeatureFlagViewModel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches feature flag status based on feature name and return false if it\'s not enable', async () => {
    const featureName = 'disableFeature';
    const mockData = { featureFlag: { isEnabled: false } };

    mockGetFeatureFlag.execute.mockResolvedValue(mockData);
    (useDi as Mock).mockReturnValue(mockGetFeatureFlag);
    (useQuery as Mock).mockReturnValue({
      data: mockData.featureFlag.isEnabled
    });
    const { result } = renderHook(() => useFeatureFlagViewModel(featureName));
    expect(useDi).toHaveBeenCalledWith(GetFeatureFlag);
    expect(result.current.isFeatureEnabled).toBeFalsy();
  });

  it('fetches feature flag status based on feature name and return true if it\'s enable', async () => {
    const featureName = 'enableFeature';
    const mockData = { featureFlag: { isEnabled: true } };

    mockGetFeatureFlag.execute.mockResolvedValue(mockData);
    (useDi as Mock).mockReturnValue(mockGetFeatureFlag);
    (useQuery as Mock).mockReturnValue({
      data: mockData.featureFlag.isEnabled
    });
    const { result } = renderHook(() => useFeatureFlagViewModel(featureName));
    expect(useDi).toHaveBeenCalledWith(GetFeatureFlag);
    expect(result.current.isFeatureEnabled).toBeTruthy();
  });
});
