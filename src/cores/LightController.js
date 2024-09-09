import {NotImplementedError} from "../Exceptions";

export default class LightController {
    #apiKey = null;
    #endpointUrl = null;
    constructor() {
        this.lights = [];
    }

    /**
     * Basic getters & setters
     */
    get apiKey() {
        return this.#apiKey;
    }

    set apiKey(value) {
        this.#apiKey = value;
    }

    get endpointUrl() {
        return new URL(this.#endpointUrl);
    }

    set endpointUrl(value) {
        if (value instanceof URL) {
            value = value.toString();
        }

        this.#endpointUrl = value;
    }

    /**
     * abstract methods, throws error if not implemented
     */
    getLights() {
        throw new NotImplementedError();
    }

    addLight(light) {
        throw new NotImplementedError();
    }

    turnOnAll() {
        throw new NotImplementedError();
    }

    turnOffAll() {
        throw new NotImplementedError();
    }
}
