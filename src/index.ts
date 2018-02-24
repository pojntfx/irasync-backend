import { IrasyncBackend, IStartParams } from "./start";

/**
 * Creates a new instance of the Irasync Backend GraphQL API Server. Takes the config parameters from the .env file
 */
const irasyncBackend = new IrasyncBackend({
  apiEndpoint: process.env.PRISMA_ENDPOINT,
  frontendEndpoint: process.env.FRONTEND_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
});
