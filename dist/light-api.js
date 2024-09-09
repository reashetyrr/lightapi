/******/ var __webpack_modules__ = ({

/***/ 234:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* unused harmony exports LIGHTTYPES, LightApi */
/* harmony import */ var _apis_Govee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(170);
/* harmony import */ var _utils_Exceptions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(538);



const LIGHTTYPES = Object.freeze({
    GOVEE: _apis_Govee__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A,
    // add more light types here when we implement more
});

class LightApi {
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

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ((/* unused pure expression or super */ null && (LightApi)));

/***/ }),

/***/ 170:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ Govee)
/* harmony export */ });
/* harmony import */ var _cores_LightController__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(711);
/* harmony import */ var _Govee_GoveeAPIResponse__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(940);
/* harmony import */ var _Govee_GoveeAPIResponse__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Govee_GoveeAPIResponse__WEBPACK_IMPORTED_MODULE_1__);



class Govee extends _cores_LightController__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .A {
    constructor() {
        super();
        this.endpointUrl = "https://openapi.api.govee.com";
        this.baseHeaders = {
            'Content-Type': 'application/json',
            'Govee-API-Key': this.apiKey
        };
    }

    async parseResponse(response) {
        const parsedResponse = new (_Govee_GoveeAPIResponse__WEBPACK_IMPORTED_MODULE_1___default())(response);
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

/***/ }),

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

/***/ }),

/***/ 711:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (/* binding */ LightController)
/* harmony export */ });
/* harmony import */ var _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(538);


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
        throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .NotImplementedError */ .EH();
    }

    addLight(light) {
        throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .NotImplementedError */ .EH();
    }

    turnOnAll() {
        throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .NotImplementedError */ .EH();
    }

    turnOffAll() {
        throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .NotImplementedError */ .EH();
    }

    async parseResponse(response) {
        throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .NotImplementedError */ .EH();
    }

    async execute_fetch({path, options= {}} = {}) {
        if (!path) {
            throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .MissingPathError */ ._D();
        }

        const url = new URL(this.endpointUrl, path);
        const headers = options.headers ? {...this.baseHeaders, ...options.headers} : this.baseHeaders;

        const response = await fetch(url, {
            ...options,
            headers
        });

        const response_json = await this.parseResponse(response);

        if (!this.lastResponse) {
            throw new _utils_Exceptions__WEBPACK_IMPORTED_MODULE_0__/* .ResponseNotSetError */ .hW();
        }

        return response_json;
    }
}


/***/ }),

/***/ 538:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EH: () => (/* binding */ NotImplementedError),
/* harmony export */   _D: () => (/* binding */ MissingPathError),
/* harmony export */   hW: () => (/* binding */ ResponseNotSetError)
/* harmony export */ });
/* unused harmony exports NotSupportedLightTypeError, MissingApiKeyError */
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

/* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = ({
    NotImplementedError,
    NotSupportedLightTypeError,
    MissingApiKeyError,
    MissingPathError,
    ResponseNotSetError
});



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
/******/ 
/******/ // startup
/******/ // Load entry module and return exports
/******/ __webpack_require__(234);
/******/ // This entry module is referenced by other modules so it can't be inlined
/******/ __webpack_require__(538);
/******/ __webpack_require__(711);
/******/ __webpack_require__(170);
/******/ var __webpack_exports__ = __webpack_require__(940);
/******/ 
