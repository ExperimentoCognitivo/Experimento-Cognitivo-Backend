import { Column } from "typeorm";

export class People {

    @Column({ type: "string" })
    public gender: string;

    @Column({ type: "number" })
    public age: number;

    @Column({ type: "number" })
    public title: number;

    @Column({ type: "number" })
    public performance: number;

    @Column({ type: "string" })
    public titration: string;

    @Column({ type: "string" })
    public university: string;

    @Column({ type: "number" })
    public experience: number;

    constructor(gender: string, age: number, title: number, performance: number, titration: string, university: string, experience: number) {
        this.gender = gender;
        this.age = age;
        this.title = title;
        this.performance = performance;
        this.titration = titration;
        this.university = university;
        this.experience = experience;
    }

}
