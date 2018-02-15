import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "./generated/prisma";
import resolvers from "./resolvers";

import { catStartup } from "./utils/logging";

export interface IStartParams {
  apiEndpoint: string;
  secret: string;
}

/**
 * Startup an Irasync backend server.
 */
export class IrasyncBackend {

  private server;

  constructor({ apiEndpoint, secret }: IStartParams) {
    try {
      // Create a new prisma instance
      this.createServer({
        apiEndpoint,
        secret,
      });
      // Connect the server to the new prisma instance
      this.startServer();
      // Log the status message to the console
      this.logStatus({
        apiEndpoint,
      });
    } catch (e) {
      throw new Error(e);
    }
  }

  private createServer({ apiEndpoint, secret }): void {
    this.server = new GraphQLServer({
      context: (req) => ({
        ...req,
        // Use the .env file to set secrets, endpoints etc.
        db: new Prisma({
          debug: true,
          endpoint: apiEndpoint,
          secret,
        }),
      }),
      resolvers,
      typeDefs: "./src/schema.graphql",
    });
  }

  private startServer() {
    this.server.start();
  }

  private logStatus({
    apiEndpoint,
  }): void {
    catStartup.info(() => `Irasync API Server listening on port ${apiEndpoint}.`);
    catStartup.info(() => `GraphQL Endpoint: ${apiEndpoint}`);
    catStartup.info(() => `GraphiQL URL: http://localhost:3000/playground`);
  }

}
