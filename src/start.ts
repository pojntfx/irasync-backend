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
  frontendEndpoint: string;
}

/**
 * Startup an Irasync backend server
 */
export class IrasyncBackend {
  // Holds the Prisma server
  private server;

  constructor({ apiEndpoint, secret, frontendEndpoint }: IStartParams) {
    try {
      // Create a new prisma instance
      this.createServer({
        apiEndpoint,
        secret,
      });
      // Connect the server to the new prisma instance
      this.startServer({ frontendEndpoint });
      // Log the status message to the console
      this.logStatus({
        apiEndpoint,
        frontendEndpoint,
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
  private startServer({ frontendEndpoint }) {

    // Use credentials from cross-origin
    const options = {
      cors: { credentials: true, origin: frontendEndpoint },
    };

    this.server.start(options);
  }

  /**
   * Log a status message after the server has been started
   * @param param0 The endpoint of the Prisma server
   */
  private logStatus({
    apiEndpoint,
    frontendEndpoint,
  }): void {
    catStartup.info(() => `Irasync Backend Server is listening!`);
    catStartup.info(() => `API Endpoint: ${apiEndpoint}`);
    catStartup.info(() => `Frontend Endpoint: ${frontendEndpoint}`);
    catStartup.info(() => `GraphiQL Endpoint: http://localhost:3000/playground`);
  }

}
