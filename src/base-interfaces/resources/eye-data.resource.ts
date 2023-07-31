import { DataResource } from "./data.resource";

export class EyeDataResource {
    constructor(public height?: number, public imagex?: number, public imagey?: number, public patch?: DataResource) { }
}