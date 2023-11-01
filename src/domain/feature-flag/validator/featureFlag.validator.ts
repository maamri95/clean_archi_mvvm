import {Validator} from "#contracts/Validator.ts";
import z from "zod";
import {GetFeatureFlagRequest} from "#domain/feature-flag/dto/getFeatureFlagRequest.dto.ts";

export class FeatureFlagValidator extends Validator<GetFeatureFlagRequest>{
    protected schema = z.object({
        featureName: z.string().min(3)
    })
}