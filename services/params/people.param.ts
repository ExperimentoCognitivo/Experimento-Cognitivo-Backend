import Moleculer from "moleculer";

export const PeopleParams: Moleculer.ActionParams = {
    gender: { type: "string", optional: true },
    age: { type: "number", optional: true },
    title: { type: "number", integer: true, optional: true },
    performance: { type: "number", integer: true, optional: true },
    titration: { type: "string", optional: true },
    university: { type: "string", optional: true },
    experience: { type: "number", integer: true, optional: true }
}