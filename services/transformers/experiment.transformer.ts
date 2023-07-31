import { People } from "@Entities/mongo";
import { Experiment } from "@Entities/mongo/experiment";
import { ExperimentResource } from "@Interfaces/resources/experiment.resource";
import { ExperimentRepository } from "@Repositories/mongo/experiment.repository";
import JsonMapUtils from "@Utils/JsonMapUtils";
import { ObjectUtils } from "@Utils/object-utils";

export const experimentToResource = (experiment: Experiment): ExperimentResource => {
    const resource = JsonMapUtils.deserialize(ExperimentResource, experiment);
    resource.id = experiment._id?.toString();
    return resource;
}

export const resourceToExperiment = async (resource: ExperimentResource, experimentEntity?: Experiment): Promise<Experiment> => {
    const experiment: Experiment = JsonMapUtils.deserialize(Experiment, resource);
    if (!ObjectUtils.isDefined(experimentEntity)) {
        ExperimentRepository.COUNT_EXP++
        const count = ExperimentRepository.COUNT_EXP;
        const countPopupCental = ExperimentRepository.COUNT_POPUP_CENTRAL;
        const countPopupEmail = ExperimentRepository.COUNT_POPUP_EMAIL;
        const half = parseInt((count / 3).toFixed(0));
        const haveHalf = (countPopupCental + countPopupEmail) >= half;
        experiment.userCount = count;
        experiment.page = count % 4;
        if (!haveHalf) {
            if (countPopupCental <= countPopupEmail) {
                experiment.popupCentral = Math.random() < 0.5;
                if (experiment.popupCentral === true) {
                    ExperimentRepository.COUNT_POPUP_CENTRAL++;
                }
                experiment.popupEmail = false;
            } else if (countPopupEmail < countPopupCental) {
                experiment.popupCentral = false;
                experiment.popupEmail = Math.random() < 0.5;
                if (experiment.popupEmail === true) {
                    ExperimentRepository.COUNT_POPUP_EMAIL++;
                }
            }
        } else {
            experiment.popupCentral = false;
            experiment.popupEmail = false;
        }
        return experiment;
    } else {
        experimentEntity!.people = JsonMapUtils.deserialize(People, resource.people);
        return experimentEntity!;
    }

}
