import { EyeFeaturesResource } from "./eye-features.resource";

export class WebgazerResource {
    constructor(public elapsedTime?: number, public eyeFeatures?: EyeFeaturesResource, public x?: number, public y?: number) { }
}