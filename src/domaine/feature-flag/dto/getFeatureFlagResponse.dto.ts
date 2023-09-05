import {Request} from "#contracts/Request"

export interface GetFeatureFlagRequest extends Request {
    featureName: string
}