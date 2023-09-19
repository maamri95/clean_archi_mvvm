import {ValidationResult, Validator} from "#contracts/Validator.ts";
import z from "zod";
import {GetFeatureFlagRequest} from "#domaine/feature-flag/dto/getFeatureFlagResponse.dto.ts";

export class FeatureFlagValidator implements Validator<GetFeatureFlagRequest>{
    validate(input: GetFeatureFlagRequest): ValidationResult {
        const schema = z.object({
            featureName: z.string().min(3)
        });
        const parse = schema.safeParse(input);
        return {
            isValid: parse.success
        };
    }

}