import LightController from "../cores/LightController";
import GoveeAPIResponse from "./Govee/GoveeAPIResponse";

export default class Govee extends LightController {
    constructor() {
        super();
        this.endpointUrl = "https://openapi.api.govee.com";
        this.baseHeaders = {
            'Content-Type': 'application/json',
            'Govee-API-Key': this.apiKey
        };
    }

    async parseResponse(response) {
        const parsedResponse = new GoveeAPIResponse(response);
        if (!parsedResponse.ok) {
            throw new Error(`Error: ${parsedResponse.status}`);
        }

        this.lastResponse = parsedResponse;
        return parsedResponse.json;
    }
    getLights() {
        return this.lights;
    }

    addLight(light) {
        this.lights.push(light);
    }
}