import {Request} from "#contracts/Request.ts";



export interface GetFeatureFlagRequest extends Request {
    featureName: string
}