import Govee from "./apis/Govee";
import {MissingApiKeyError, NotSupportedLightTypeError} from "@utils/Exceptions";

export const LIGHTTYPES = Object.freeze({
    GOVEE: Govee,
    // add more light types here when we implement more
});

export class LightApi {
    constructor({lightType, apiKey}) {
        if (!LIGHTTYPES.includes(lightType)) {
            throw new NotSupportedLightTypeError();
        }

        if (!apiKey) {
            throw new MissingApiKeyError();
        }

        this.api = new LIGHTTYPES[lightType]();
        this.api.apiKey = apiKey;
    }

    getLights() {
        return this.api.getLights();
    }
}

export default LightApi;