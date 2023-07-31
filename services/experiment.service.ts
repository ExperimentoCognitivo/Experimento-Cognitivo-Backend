import { ConnectionType } from "@Shared/domain/connection-type";
import { Context, Service as MoleculerService } from "moleculer";
import { Action, Service } from "moleculer-decorators";
import { getConnection, getManager } from "typeorm";
import connectionInstance from "@Entities/mongo/mongo.connection";
import { experimentToResource, resourceToExperiment } from "@Transformers/experiment.transformer";
import { ExperimentResource } from "@Interfaces/resources/experiment.resource";
import { ExperimentRepository } from "@Repositories/mongo/experiment.repository";
import { Experiment } from "@Entities/mongo/experiment";
import { QuestionsResource } from "@Interfaces/resources/questions.resource";
import JsonMapUtils from "@Utils/JsonMapUtils";
import { Questions } from "@Entities/mongo/questions";
import { WebgazerResource } from "@Interfaces/resources/webgazer.resource";
import { ObjectUtils } from "@Utils/object-utils";
import { PeopleParams } from "./params/people.param";
import { QuestionsParams } from "./params/questions";
import { GeneralQuestionsParams } from "./params/general-questions";
import { flatMap } from "@Utils/array-utils";
import { FilterResource } from "@Interfaces/resources/filter.resource";
import { FilterParams } from "./params/filter.param";


@Service({
    name: "experiment-service",
})
class ExperimentService extends MoleculerService {

    public async started() {
        try {
            return getManager(ConnectionType.MONGO_DB_CONNECTION).connection;
        } catch (error) {
            return await connectionInstance();
        } finally {
            this.startCountMethod();
        }
    }
    public async stopped() {
        return await getConnection(ConnectionType.MONGO_DB_CONNECTION).close();
    }

    @Action()
    public async startCount(): Promise<void> {
        return this.startCountMethod();
    }

    @Action()
    public async getAll(): Promise<ExperimentResource[]> {
        return this.findAllMethod();
    }

    @Action()
    public async findById(ctx: Context<{ id: string }>): Promise<ExperimentResource> {
        return this.findByIdMethod(ctx.params.id);
    }

    @Action({
        params: FilterParams
    })
    public async getHeatMap(ctx: Context<FilterResource>): Promise<WebgazerResource[]> {
        return this.getHeatMapMethod(ctx.params);
    }

    @Action({
        params: {
            people: { type: "object", props: PeopleParams }
        }
    })
    public async create(ctx: Context<ExperimentResource>): Promise<{ id: string, page: number, popupCentral: boolean, popupEmail: boolean }> {
        ctx.meta = { $statusCode: 201 };
        return this.createMethod(ctx);
    }

    @Action({
        params: {
            people: { type: "object", props: PeopleParams }
        }
    })
    public async update(ctx: Context<ExperimentResource>): Promise<void> {
        const id = (<any>ctx.params).id;
        ctx.meta = { $statusCode: 204 };
        return this.updateMethod(id, ctx);
    }

    @Action({
        params: GeneralQuestionsParams
    })
    public async memoryQuestions(ctx: Context<QuestionsResource>): Promise<void> {
        const id = (<any>ctx.params).id;
        ctx.meta = { $statusCode: 204 };
        return this.questionsMethod(id, ctx, "memory");
    }

    @Action({
        params: QuestionsParams
    })
    public async frammingQuestions(ctx: Context<QuestionsResource>): Promise<void> {
        const id = (<any>ctx.params).id;
        ctx.meta = { $statusCode: 204 };
        return this.questionsMethod(id, ctx, "framming");
    }

    @Action({
        params: QuestionsParams
    })
    public async nasaQuestions(ctx: Context<QuestionsResource>): Promise<void> {
        const id = (<any>ctx.params).id;
        ctx.meta = { $statusCode: 204 };
        return this.questionsMethod(id, ctx, "nasa");
    }

    @Action()
    public async webgazer(ctx: Context<{ webgazer: WebgazerResource[] }>): Promise<void> {
        const id = (<any>ctx.params).id;
        ctx.meta = { $statusCode: 204 };
        return this.webgazerMethod(id, ctx);
    }

    private async findAllMethod(): Promise<ExperimentResource[]> {
        const result = await ExperimentRepository.findAll();
        return result.map((experiment: Experiment) => experimentToResource(experiment));
    }

    private async getHeatMapMethod(filter: FilterResource): Promise<WebgazerResource[]> {
        const result = await ExperimentRepository.getDataForHeatMap(filter);
        const dataResult = result.map((experiment: Experiment) => experimentToResource(experiment)).filter( data => data);
        return flatMap(dataResult, data => data.webgazer!);
    }

    private async findByIdMethod(id: string): Promise<ExperimentResource> {
        const experiment = await ExperimentRepository.findById(id);
        return experimentToResource(experiment);
    }

    private async createMethod(ctx: Context<ExperimentResource>): Promise<{ id: string, page: number, popupCentral: boolean, popupEmail: boolean }> {
        const experiment = await ExperimentRepository.upsert(await resourceToExperiment(ctx.params));
        return {
            id: experiment._id!.toString(),
            page: experiment.page,
            popupCentral: experiment.popupCentral,
            popupEmail: experiment.popupEmail
        };
    }

    private async updateMethod(id: string, ctx: Context<ExperimentResource>): Promise<void> {
        const experiment = await ExperimentRepository.findById(id);
        await ExperimentRepository.upsert(await resourceToExperiment(ctx.params, experiment));
    }

    private async questionsMethod(id: string, ctx: Context<QuestionsResource>, type: string): Promise<void> {
        const experiment = await ExperimentRepository.findById(id);
        if (type === "memory") {
            experiment.memoryQuestions = JsonMapUtils.deserialize(Questions, ctx.params);
        } else if (type === "framming") {
            experiment.frammingQuestions = JsonMapUtils.deserialize(Questions, ctx.params);
        } else if (type === "nasa") {
            experiment.nasaQuestions = JsonMapUtils.deserialize(Questions, ctx.params);
        }
        await ExperimentRepository.upsert(experiment);
    }

    private async webgazerMethod(id: string, ctx: Context<{ webgazer: WebgazerResource[] }>): Promise<void> {
        const experiment = await ExperimentRepository.findById(id);
        if (ObjectUtils.isDefined(experiment.webgazer)) {
            experiment.webgazer = experiment.webgazer!.concat(ctx.params.webgazer);
        } else {
            experiment.webgazer = ctx.params.webgazer;
        }
        await ExperimentRepository.upsert(experiment);
    }

    private async startCountMethod(): Promise<void> {
        ExperimentRepository.COUNT_EXP = await ExperimentRepository.countAll();
        ExperimentRepository.COUNT_POPUP_CENTRAL = await ExperimentRepository.countAll(true);
        ExperimentRepository.COUNT_POPUP_EMAIL = await ExperimentRepository.countAll(undefined, true);
    }

}

module.exports = ExperimentService;
