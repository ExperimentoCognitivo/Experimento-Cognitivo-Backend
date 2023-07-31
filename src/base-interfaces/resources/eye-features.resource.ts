import { EyeDataResource } from "./eye-data.resource";

export class EyeFeaturesResource {
    constructor(public left?: EyeDataResource, public right?: EyeDataResource) { }
}