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

export class MissingPathError extends Error {
    constructor() {
        super("Missing api path");
    }
}

export class ResponseNotSetError extends Error {
    constructor() {
        super("Response not set in lastResponse property");
    }
}

export default {
    NotImplementedError,
    NotSupportedLightTypeError,
    MissingApiKeyError,
    MissingPathError,
    ResponseNotSetError
};

