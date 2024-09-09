import {MissingPathError, NotImplementedError, ResponseNotSetError} from "../utils/Exceptions";

export default class LightController {
    #apiKey = null;
    #endpointUrl = null;
    #baseHeaders = null;
    #lastResponse = null;

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

    get baseHeaders() {
        return this.#baseHeaders;
    }

    set baseHeaders(value) {
        this.#baseHeaders = value;
    }

    get lastResponse() {
        return this.#lastResponse;
    }

    set lastResponse(value) {
        this.#lastResponse = value;
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

    async parseResponse(response) {
        throw new NotImplementedError();
    }

    async execute_fetch({path, options= {}} = {}) {
        if (!path) {
            throw new MissingPathError();
        }

        const url = new URL(this.endpointUrl, path);
        const headers = options.headers ? {...this.baseHeaders, ...options.headers} : this.baseHeaders;

        const response = await fetch(url, {
            ...options,
            headers
        });

        const response_json = await this.parseResponse(response);

        if (!this.lastResponse) {
            throw new ResponseNotSetError();
        }

        return response_json;
    }
}
