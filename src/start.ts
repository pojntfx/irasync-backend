import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
import * as bodyParser from "body-parser";
import * as express from "express";
import { makeExecutableSchema } from "graphql-tools";
import { catStartup } from "./logging";

import resolvers from "./resolvers";
import typeDefs from "./schema";

export interface IStartParams {
  apiEndpoint: string;
  apiPort: number;
  graphiqlEnabled: boolean;
  graphiqlEndpoint?: string;
}

/**
 * Startup an Irasync backend server.
 */
export class IrasyncBackend {

  private app: express.Application;

  constructor({ apiEndpoint, apiPort, graphiqlEnabled, graphiqlEndpoint }: IStartParams) {
    try {
      // Create new express instance
      this.app = express();
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
      // Listen on port
      this.startExpress({
        apiPort,
      });
      // Log status message
      this.logStatus({ apiPort, apiEndpoint, graphiqlEndpoint, graphiqlEnabled });
    } catch (e) {
      throw new Error(e);
    }
  }

  private startExpress({ apiPort }) {
    this.app.listen(apiPort);
  }

  private makeSchemaExecutable() {
    return makeExecutableSchema({
      // The resolvers and typeDefs come from the imports
      resolvers,
      typeDefs,
    });
  }

  private connectGraphQl({ apiEndpoint, schema }) {
    this.app.use(apiEndpoint, bodyParser.json(), graphqlExpress({
      schema,
    }));
  }

  private connectGraphiQl({ graphiqlEndpoint, apiEndpoint }) {
    this.app.get(graphiqlEndpoint, graphiqlExpress({ endpointURL: apiEndpoint }));
  }

  private logStatus({ apiPort, apiEndpoint, graphiqlEnabled, graphiqlEndpoint }) {
    catStartup.info(() => `Irasync API Server listening on port ${apiPort}.`);
    catStartup.info(() => `GraphQL Endpoint: ${apiEndpoint}`);
    if (graphiqlEnabled) {
      catStartup.info(() => `GraphiQL Endpoint: ${graphiqlEndpoint}`);
    }
  }
}
