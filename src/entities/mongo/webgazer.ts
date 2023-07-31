import { Column } from "typeorm";
import { EyeFeatures } from "./eye-features";

export class Webgazer {

    @Column({ type: "number" })
    public elapsedTime?: number;

    @Column({ type: "number" })
    public eyeFeatures?: EyeFeatures;

    @Column({ type: "number" })
    public x?: number;

    @Column({ type: "number" })
    public y?: number;

    constructor(elapsedTime?: number, eyeFeatures?: EyeFeatures, x?: number, y?: number) {
        this.elapsedTime = elapsedTime;
        this.eyeFeatures = eyeFeatures;
        this.x = x;
        this.y = y;
    }
}