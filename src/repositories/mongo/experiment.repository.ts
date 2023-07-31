import { FindManyOptions } from "typeorm";
import { ObjectId } from 'bson';
import { Experiment } from "@Entities/mongo/experiment";
import { getAll, getResource, saveResource, count } from "./shared.mongo";
import { ObjectUtils } from "@Utils/object-utils";
import { FilterResource } from "@Interfaces/resources/filter.resource";

export namespace ExperimentRepository {

    export var COUNT_EXP = 0;
    export var COUNT_POPUP_CENTRAL = 0;
    export var COUNT_POPUP_EMAIL = 0;

    export const findById = async (id: string): Promise<Experiment> => {
        return await getResource(Experiment, { _id: new ObjectId(id) });
    }

    export const findAll = async (): Promise<Experiment[]> => {
        const options: FindManyOptions<Experiment> = { order: { updatedAt: "DESC" } };
        return await getAll(Experiment, options);
    }

    export const getDataForHeatMap = async (filter: FilterResource): Promise<Experiment[]> => {
        const options: FindManyOptions<Experiment> = { order: { updatedAt: "DESC" } };

        options.where = { page: filter.page };

        if (ObjectUtils.isDefined(filter!.popupCentral)) {
            options.where!.popupCentral = filter!.popupCentral;
        }

        if (ObjectUtils.isDefined(filter!.popupEmail)) {
            options.where.popupEmail = filter!.popupEmail;
        }
        
        return await getAll(Experiment, options);
    }

    export const countAll = async (popupCentral?: boolean, popupEmail?: boolean): Promise<number> => {
        const options: FindManyOptions<Experiment> = {};
        if (ObjectUtils.isDefined(popupCentral)) {
            options.where = { popupCentral: true };
        }

        if (ObjectUtils.isDefined(popupEmail)) {
            options.where = { popupEmail: true };
        }

        return await count(Experiment, options);
    }

    export const upsert = async (experiment: Experiment): Promise<Experiment> => {
        return await saveResource(experiment);
    }

}
