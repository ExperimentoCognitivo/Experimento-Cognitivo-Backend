import { ConnectionType } from '@Shared/domain/connection-type';
import { Connection, createConnection } from 'typeorm';
import { MongoConnectionOptions } from "typeorm/driver/mongodb/MongoConnectionOptions";
import { Experiment } from './experiment';


export default async (): Promise<Connection | undefined> => {
	const mongoDatabase: string = process.env.MONGO_DATABASE || "experimento_db";
	const mongoUsername: string | undefined = process.env.MONGO_USERNAME || "mongodbadmin";
	const mongoPassword: string | undefined = process.env.MONGO_PASSWORD || "nQxDXd1gccsWJ69i";
	const cluster: string | undefined = process.env.CLUSTER || "cluster0.hddemge.mongodb.net";

	const options: MongoConnectionOptions = {
		name: ConnectionType.MONGO_DB_CONNECTION,
		entities: [Experiment],
		synchronize: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		type: "mongodb",
		url: `mongodb+srv://${mongoUsername}:${mongoPassword}@${cluster}/${mongoDatabase}?retryWrites=true&w=majority`
	};

	try {
		const conn = await createConnection(options);
		console.log("MongoDB Connected");
		return conn;
	} catch (error) {
		console.log(error)
		return undefined;
	}
};
