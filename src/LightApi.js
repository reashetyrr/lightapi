import Govee from "./apis/Govee";
import {MissingApiKeyError, NotSupportedLightTypeError} from "@utils/Exceptions";

const LIGHTTYPESREFERENCES = Object.freeze({
    GOVEE: Govee,
    // add more light types here when we implement more
});

export const LIGHTTYPES = Object.freeze({
    GOVEE: "GOVEE"
});

export class LightApi {
    constructor({lightType, apiKey}) {
        // check if lightType is
        if (!LIGHTTYPESREFERENCES[lightType]) {
            throw new NotSupportedLightTypeError();
        }

        if (!apiKey) {
            throw new MissingApiKeyError();
        }

        this.api = new LIGHTTYPESREFERENCES[lightType]();
        this.api.apiKey = apiKey;
    }

    getLights() {
        return this.api.getLights();
    }
}

export default {LightApi, LIGHTTYPES};