import { IrasyncBackend, IStartParams } from "./start";

// Parameters are configured in the .env file
// Will be passed in here in the future
const irasyncBackend = new IrasyncBackend({
  apiEndpoint: process.env.PRISMA_ENDPOINT,
  secret: process.env.PRISMA_SECRET,
});
