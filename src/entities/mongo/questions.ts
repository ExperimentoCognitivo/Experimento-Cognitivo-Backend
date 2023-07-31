import { Column } from "typeorm";

export class Questions {

    @Column({ type: "number" })
    public first: number;

    @Column({ type: "number" })
    public second: number;

    @Column({ type: "number" })
    public third: number;

    @Column({ type: "number" })
    public fourth: number;

    @Column({ type: "number" })
    public fifth: number;

    @Column({ type: "number" })
    public sixth?: number;

    constructor(first: number, second: number, third: number, fourth: number, fifth: number, sixth?: number) {
        this.first = first;
        this.second = second;
        this.third = third;
        this.fourth = fourth;
        this.fifth = fifth;
        this.sixth = sixth;
    }
}