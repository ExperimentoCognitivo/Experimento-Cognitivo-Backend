import { Column } from "typeorm";

export class EyeData {

    @Column({ type: "number" })
    public height?: number;

    @Column({ type: "number" })
    public imagex?: number;

    @Column({ type: "number" })
    public imagey?: number;

    constructor(height?: number, imagex?: number, imagey?: number) {
        this.height = height;
        this.imagex = imagex;
        this.imagey = imagey;
    }
}