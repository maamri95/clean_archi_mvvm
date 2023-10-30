import { GetFeatureFlag } from "#domaine/feature-flag/use-cases/get-feature-flag/getFeatureFlag.usecase";
import {useQuery} from "@tanstack/react-query";
import useDi from "#presentation/hook/useDi.ts";

/**
 * Checks if a specific feature is enabled.
 * @param featureName - The name of the feature.
 * @returns True if the feature is enabled, false otherwise.
 */
export const useFeatureFlagViewModel = (featureName: string)=> {
    const getFeatureFlag = useDi<GetFeatureFlag>(GetFeatureFlag);
    const {data: isFeatureEnabled} = useQuery({
        queryKey: ['featureFlag', featureName],
        queryFn: async () => {
            const response = await getFeatureFlag.execute({
                featureName: featureName
            });
            return response?.featureFlag.isEnabled;
        }
    });

    return {
        isFeatureEnabled
    }
  }
  