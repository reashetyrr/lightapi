/******/ var __webpack_modules__ = ({

/***/ 940:
/***/ (() => {

class GoveeAPIResponse {
  constructor(response) {
    this.response = response;
  }

    get status() {
        return this.response.status;
    }

    get data() {
        return this.response.data;
    }

    get headers() {
        return this.response.headers;
    }

    get ok() {
        return this.response.ok;
    }

    async json() {
        return this.response.json();
    }



}

/***/ })

/******/ });
/************************************************************************/
/******/ // The module cache
/******/ var __webpack_module_cache__ = {};
/******/ 
/******/ // The require function
/******/ function __webpack_require__(moduleId) {
/******/ 	// Check if module is in cache
/******/ 	var cachedModule = __webpack_module_cache__[moduleId];
/******/ 	if (cachedModule !== undefined) {
/******/ 		return cachedModule.exports;
/******/ 	}
/******/ 	// Create a new module (and put it into the cache)
/******/ 	var module = __webpack_module_cache__[moduleId] = {
/******/ 		// no module.id needed
/******/ 		// no module.loaded needed
/******/ 		exports: {}
/******/ 	};
/******/ 
/******/ 	// Execute the module function
/******/ 	__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 
/******/ 	// Return the exports of the module
/******/ 	return module.exports;
/******/ }
/******/ 
/************************************************************************/
/******/ /* webpack/runtime/compat get default export */
/******/ (() => {
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = (module) => {
/******/ 		var getter = module && module.__esModule ?
/******/ 			() => (module['default']) :
/******/ 			() => (module);
/******/ 		__webpack_require__.d(getter, { a: getter });
/******/ 		return getter;
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/define property getters */
/******/ (() => {
/******/ 	// define getter functions for harmony exports
/******/ 	__webpack_require__.d = (exports, definition) => {
/******/ 		for(var key in definition) {
/******/ 			if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 				Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 			}
/******/ 		}
/******/ 	};
/******/ })();
/******/ 
/******/ /* webpack/runtime/hasOwnProperty shorthand */
/******/ (() => {
/******/ 	__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ })();
/******/ 
/************************************************************************/
var __webpack_exports__ = {};

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  a_: () => (/* binding */ LIGHTTYPES),
  fF: () => (/* binding */ LightApi),
  Ay: () => (/* binding */ LightAPI)
});

;// CONCATENATED MODULE: ./src/utils/Exceptions.js
class NotImplementedError extends Error {
    constructor() {
        super("Not implemented");
    }
}

class NotSupportedLightTypeError extends Error {
    constructor() {
        super("Not supported light type");
    }
}

class MissingApiKeyError extends Error {
    constructor() {
        super("Missing API key");
    }
}

class MissingPathError extends Error {
    constructor() {
        super("Missing api path");
    }
}

class ResponseNotSetError extends Error {
    constructor() {
        super("Response not set in lastResponse property");
    }
}

/* harmony default export */ const Exceptions = ({
    NotImplementedError,
    NotSupportedLightTypeError,
    MissingApiKeyError,
    MissingPathError,
    ResponseNotSetError
});


;// CONCATENATED MODULE: ./src/cores/LightController.js


class LightController {
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

// EXTERNAL MODULE: ./src/apis/Govee/GoveeAPIResponse.js
var GoveeAPIResponse = __webpack_require__(940);
var GoveeAPIResponse_default = /*#__PURE__*/__webpack_require__.n(GoveeAPIResponse);
;// CONCATENATED MODULE: ./src/apis/Govee.js



class Govee extends LightController {
    constructor() {
        super();
        this.endpointUrl = "https://openapi.api.govee.com";
        this.baseHeaders = {
            'Content-Type': 'application/json',
            'Govee-API-Key': this.apiKey
        };
    }

    async parseResponse(response) {
        const parsedResponse = new (GoveeAPIResponse_default())(response);
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
;// CONCATENATED MODULE: ./src/LightAPI.js



const LIGHTTYPESREFERENCES = Object.freeze({
    GOVEE: Govee,
    // add more light types here when we implement more
});

const LIGHTTYPES = Object.freeze({
    GOVEE: "GOVEE"
});

class LightApi {
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

/* harmony default export */ const LightAPI = ({LightApi, LIGHTTYPES});
var __webpack_exports__LIGHTTYPES = __webpack_exports__.a_;
var __webpack_exports__LightApi = __webpack_exports__.fF;
var __webpack_exports__default = __webpack_exports__.Ay;
export { __webpack_exports__LIGHTTYPES as LIGHTTYPES, __webpack_exports__LightApi as LightApi, __webpack_exports__default as default };
