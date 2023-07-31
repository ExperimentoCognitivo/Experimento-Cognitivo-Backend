import { Column, Entity, ObjectIdColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectId } from "bson";
import { People } from "./people";
import { JsonProperty } from "@Utils/JsonMetaData";
import { Questions } from "./questions";
import { Webgazer } from "./webgazer";

@Entity({
    name: "experiment_data",
})
export class Experiment {

    @ObjectIdColumn()
    public _id?: ObjectId;

    @Column({ type: "number" })
    public userCount: number;

    @Column({ type: "number" })
    public page: number;

    @Column({ type: "boolean" })
    public popupCentral: boolean;

    @Column({ type: "boolean" })
    public popupEmail: boolean;

    @Column()
    @JsonProperty({ clazz: People })
    public people?: People | null;

    @Column()
    @JsonProperty({ clazz: Questions })
    public memoryQuestions?: Questions | null;

    @Column()
    @JsonProperty({ clazz: Questions })
    public frammingQuestions?: Questions | null;

    @Column()
    @JsonProperty({ clazz: Questions })
    public nasaQuestions?: Questions | null;

    @Column({ type: "array" })
    public webgazer?: Webgazer[] | null;

    @Column({ type: "timestamp" })
    public createdAt?: Date;

    @Column({ type: "timestamp" })
    public updatedAt?: Date;

    @Column()
    public version?: number;

    @BeforeInsert()
    beforeInsert() {
        this.createdAt = new Date();
        this.updatedAt = this.createdAt;
        this.version = 1;
    }

    @BeforeUpdate()
    beforeUpdate() {
        this.updatedAt = new Date();
        this.version = this.version === undefined ? 1 : this.version + 1;
    }

    constructor(userCount: number, page: number, popupCentral: boolean, popupEmail: boolean, people: People, memoryQuestions: Questions, frammingQuestions: Questions, nasaQuestions: Questions, webgazer: Webgazer[], _id?: ObjectId) {
        this._id = _id;
        this.userCount = userCount;
        this.popupCentral = popupCentral;
        this.popupEmail = popupEmail;
        this.page = page;
        this.people = people;
        this.memoryQuestions = memoryQuestions;
        this.frammingQuestions = frammingQuestions;
        this.nasaQuestions = nasaQuestions;
        this.webgazer = webgazer;
    }
}
