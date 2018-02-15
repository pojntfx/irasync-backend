import { GraphQLServer } from 'graphql-yoga'
import { Prisma } from './generated/prisma'
import resolvers from './resolvers'

export interface IStartParams { }

/**
 * Startup an Irasync backend server.
 */
export class IrasyncBackend {

  private server;

  constructor({ }: IStartParams) {
    try {
      // Create a new prisma instance
      this.createServer();
      // Log the status message to the console
      this.logStatus();
    } catch (e) {
      throw new Error(e);
    }
  }

  private createServer(): void {
    this.server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers,
      context: req => ({
        ...req,
        // Use the .env file to set secrets, endpoints etc.
        db: new Prisma({
          endpoint: process.env.PRISMA_ENDPOINT,
          secret: process.env.PRISMA_SECRET,
          debug: true,
        }),
      }),
    })
  }

  private logStatus(): void {
    this.server.start(() => console.log(`Server is running on http://localhost:4000`));
  }

}