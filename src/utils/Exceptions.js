export class NotImplementedError extends Error {
    constructor() {
        super("Not implemented");
    }
}

export class NotSupportedLightTypeError extends Error {
    constructor() {
        super("Not supported light type");
    }
}

export class MissingApiKeyError extends Error {
    constructor() {
        super("Missing API key");
    }
}

export default {
    NotImplementedError,
    NotSupportedLightTypeError
};

