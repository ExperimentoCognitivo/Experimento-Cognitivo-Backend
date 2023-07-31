import Moleculer from "moleculer";

export const GeneralQuestionsParams: Moleculer.ActionParams = {
    first: { type: "number", integer: true },
    second: { type: "number", integer: true },
    third: { type: "number", integer: true },
    fourth: { type: "number", integer: true },
    fifth: { type: "number", integer: true }
}