import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import { makeExecutableSchema } from "graphql-tools";
import { catStartup } from "./logging";

import Database from "./models";
import resolvers from "./resolvers";
import typeDefs from "./schema";

export interface IStartParams {
  apiEndpoint: string;
  apiPort: number;
  graphiqlEnabled: boolean;
  graphiqlEndpoint?: string;
  dbName: string;
  dbUserName: string;
  dbPassword: string;
}

/**
 * Startup an Irasync backend server.
 */
export class IrasyncBackend {

  private server: express.Application;
  private database: any;

  constructor({
    apiEndpoint,
    dbName,
    dbUserName,
    dbPassword,
    apiPort,
    graphiqlEnabled,
    graphiqlEndpoint,
  }: IStartParams) {
    try {
      // Create new express instance
      this.server = express();
      // Enable graphql middleware
      this.connectGraphQl({
        apiEndpoint,
        schema: this.makeSchemaExecutable(),
      });
      // Enable graphiql middleware if needed
      if (graphiqlEnabled) {
        this.connectGraphiQl({
          apiEndpoint,
          graphiqlEndpoint,
        });
      }
      // Connect to database, then tell express to listen
      this.startServers({
        apiPort,
        dbName,
        dbPassword,
        dbUserName,
      });
      // Log status message
      this.logStatus({ apiPort, apiEndpoint, graphiqlEndpoint, graphiqlEnabled });
    } catch (e) {
      throw new Error(e);
    }
  }

  private connectGraphQl({ apiEndpoint, schema }) {
    this.server.use(apiEndpoint, bodyParser.json(), graphqlExpress({
      schema,
    }));
  }

  private makeSchemaExecutable() {
    return makeExecutableSchema({
      // The resolvers and typeDefs come from the imports
      resolvers,
      typeDefs,
    });
  }

  private connectGraphiQl({ graphiqlEndpoint, apiEndpoint }) {
    this.server.get(graphiqlEndpoint, graphiqlExpress({ endpointURL: apiEndpoint }));
  }

  private startServers({
    apiPort,
    dbName,
    dbPassword,
    dbUserName,
  }) {
    // Create new database instance
    this.database = new Database({
      dbName,
      dbPassword,
      dbUserName,
    });
    // Sync with the database, then start the express server
    // Use "{ force: true }" if you want to delete all existing db tables
    this.database.sequelize.sync({ force: true }).then(() => {
      // Listen on port apiPort
      this.startExpress({
        apiPort,
      });
    });
  }

  private startExpress({ apiPort }) {
    this.server.listen(apiPort);
  }

  private logStatus({
    apiPort,
    apiEndpoint,
    graphiqlEnabled,
    graphiqlEndpoint,
  }) {
    catStartup.info(() => `Irasync API Server listening on port ${apiPort}.`);
    catStartup.info(() => `GraphQL Endpoint: ${apiEndpoint}`);
    if (graphiqlEnabled) {
      catStartup.info(() => `GraphiQL Endpoint: ${graphiqlEndpoint}`);
    }
  }
}
