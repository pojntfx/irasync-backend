import { GraphQLServer } from "graphql-yoga";
import { Prisma } from "./generated/prisma";
import resolvers from "./resolvers";

import { catStartup } from "./utils/logging";

/**
 * Configuration data for the Prisma server, should be passed from the .env file
 */
export interface IStartParams {
  apiEndpoint: string;
  secret: string;
}

/**
 * Startup an Irasync backend server
 */
export class IrasyncBackend {
  // Holds the Prisma serve
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

  /**
   * Create a new instance of the GraphQL yoga server
   * This also generates the db models etc. from typeDefs and resolvers
   * @param param0 API Endpoint and the server's secret for creating passwords etc.
   */
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

  /**
   * Connect to the Prisma server
   */
  private startServer() {

    // Use credentials from cross-origin
    const options = {
      cors: { credentials: true },
    };

    this.server.start(options);
  }

  /**
   * Log a status message after the server has been started
   * @param param0 The endpoint of the Prisma server
   */
  private logStatus({
    apiEndpoint,
  }): void {
    catStartup.info(() => `Irasync API Server listening on port ${apiEndpoint}.`);
    catStartup.info(() => `GraphQL Endpoint: ${apiEndpoint}`);
    catStartup.info(() => `GraphiQL URL: http://localhost:3000/playground`);
  }

}
