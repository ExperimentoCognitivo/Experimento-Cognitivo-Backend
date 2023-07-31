import { PeopleResource } from "./people.resource";
import { QuestionsResource } from "./questions.resource";
import { WebgazerResource } from "./webgazer.resource";

export class ExperimentResource {
    constructor(public people: PeopleResource, public memoryQuestions?: QuestionsResource, public frammingQuestions?: QuestionsResource,
        public nasaQuestions?: QuestionsResource, public webgazer?: WebgazerResource[], public page?: number, public popupCentral?: boolean,
        public popupEmail?: boolean, public userCount?: number, public id?: string) { }
}
