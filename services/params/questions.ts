import Moleculer from "moleculer";

export const QuestionsParams: Moleculer.ActionParams = {
    first: { type: "number", integer: true, min: 0, max: 21 },
    second: { type: "number", integer: true, min: 0, max: 21 },
    third: { type: "number", integer: true, min: 0, max: 21 },
    fourth: { type: "number", integer: true, min: 0, max: 21 },
    fifth: { type: "number", integer: true, min: 0, max: 21 },
    sixth: { type: "number", integer: true, min: 0, max: 21, optional: true }
}