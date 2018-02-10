import { IrasyncBackend, IStartParams } from "./start";

const irasyncBackend = new IrasyncBackend({
  apiEndpoint: "/graphql",
  apiPort: 3000,
  graphiqlEnabled: true,
  graphiqlEndpoint: "/graphiql",
});
