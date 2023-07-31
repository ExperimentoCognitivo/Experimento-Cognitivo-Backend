import { JsonProperty } from "@Utils/JsonMetaData";
import { Column } from "typeorm";
import { EyeData } from "./eye-data";

export class EyeFeatures {

    @Column()
    @JsonProperty({ clazz: EyeData })
    public left?: EyeData;

    @Column()
    @JsonProperty({ clazz: EyeData })
    public right?: EyeData;

    constructor(left?: EyeData, right?: EyeData) {
        this.left = left;
        this.right = right;
    }
}