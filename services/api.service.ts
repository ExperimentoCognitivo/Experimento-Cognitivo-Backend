import { ServiceSchema } from "moleculer";
import ApiGateway from "moleculer-web";

const ApiService: ServiceSchema = {

	name: "api",
	mixins: [ApiGateway],
	// More info about settings: https://moleculer.services/docs/0.14/moleculer-web.html
	settings: {
		port: process.env.PORT || 3000,

		routes: [{
			path: "/v1",

			// The auto-alias feature allows you to declare your route alias directly in your services.
			// The gateway will dynamically build the full routes from service schema.
			autoAliases: false,

			aliases: {
				"GET /experiment": "experiment-service.getAll",
				"GET /experiment/:id": "experiment-service.findById",
				"GET /experiment/heatmap/:page": "experiment-service.getHeatMap",
				"POST /experiment": "experiment-service.create",
				"PUT /experiment/:id": "experiment-service.update",
				"PATCH /experiment/questions-1/:id": "experiment-service.memoryQuestions",
				"PATCH /experiment/questions-2/:id": "experiment-service.frammingQuestions",
				"PATCH /experiment/questions-3/:id": "experiment-service.nasaQuestions",
				"PATCH /experiment/webgazer/:id": "experiment-service.webgazer",
				"GET /experiment/start-count": "experiment-service.startCount"
			},

			cors: {
				credentials: true,
				methods: ["GET", "POST", "PUT", "PATCH", "OPTIONS"],
				origin: ["*"],
			},

			whitelist: [
				// Access to any actions in all services under "/v1" URL
				"**",
			],
			authorization: false,
			authentication: false,
			bodyParsers: {
				json: {
					strict: false,
					limit: "1MB",
				},
				urlencoded: {
					extended: true,
					limit: "1MB",
				},
			},

			// Enable/disable logging
			logging: true
		}],
		assets: {
			folder: "public",
		},
	}
};

export = ApiService;
