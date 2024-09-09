import LightController from "../cores/LightController";

export default class Govee extends LightController {
    constructor() {
        super();
    }

    getLights() {
        return this.lights;
    }

    addLight(light) {
        this.lights.push(light);
    }
}