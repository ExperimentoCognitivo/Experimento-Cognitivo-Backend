import Moleculer from "moleculer";

export const FilterParams: Moleculer.ActionParams = {
    page: { type: "number", convert: true, optional: false },
    popupCentral: { type: "boolean", convert: true, optional: true },
    popupEmail: { type: "boolean", convert: true, optional: true }
}