import { IrasyncBackend, IStartParams } from "./start";

const irasyncBackend = new IrasyncBackend({
  apiEndpoint: "/graphql",
  apiPort: 3000,
  dbName: "irasync_backend",
  dbPassword: "postgres",
  dbUserName: "postgres",
  graphiqlEnabled: true,
  graphiqlEndpoint: "/graphiql",
});
