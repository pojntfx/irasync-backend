// Use the apollo server for graphql in express
import { graphiqlExpress, graphqlExpress } from "apollo-server-express";
// Enable the parsing of requests in express
import * as bodyParser from "body-parser";
// Use the express framework as the foundation
import * as express from "express";
// Use the executable schema
import { Schema } from "./data/schema";

/**
 * Main config parameters from the main configuration object passed at instanciation
 */
interface IConfigParams {
  api: IApiConfig;
  debug: IDebugConfig;
}

/**
 * The API's config parameters
 */
interface IApiConfig {
  // The port that the API should use (i.e. '3000')
  port: string;
  // The enpoint that the API should use (i.e. '/graphql')
  endpoint: string;
}

/**
 * GraphiQL's config parameters (for debugging and testing)
 */
interface IDebugConfig {
  // Whether graphiql (for debugging and testing) should be enabled
  enabled: boolean;
  // The graphiql (debugging and testing) endpoint
  endpoint: string;
}

/**
 * To simplify the passing along of the endpoint to the createEndpoints method
 */
interface IEndpoints {
  api: string;
  apiPort: string;
  debugEnabled: boolean;
  debug: string;
}

/**
 * Root of a new Irasync instance
 */
export class IrasyncBackend {

  // Holds the express instance
  private readonly app: express.Application;
  // Holds the schema object
  private schema: any;

  constructor(configParams: IConfigParams) {
    // Create new express instance
    this.app = express();
    // Create a new instance of the schema
    this.schema = new Schema();
    // Setup and config the endpoints
    this.setupEndpoints({
      api: configParams.api.endpoint,
      apiPort: configParams.api.port,
      debug: configParams.debug.endpoint,
      debugEnabled: configParams.debug.enabled,
    }, this.schema.executableSchema);
    // Start the server by listening at the specified port and display a success message in the console
    this.listen({
      api: configParams.api.endpoint,
      apiPort: configParams.api.port,
      debug: configParams.debug.endpoint,
      debugEnabled: configParams.debug.enabled,
    });
  }
  /**
   * Setup endpoints.
   */
  private setupEndpoints(endpoints: IEndpoints, schema: any): void {
    // Show an index screen if user reached root
    this.app.get("/", (req, res) => {
      res.send(`<h1>You\'ve reached an Irasync API server.</h1>
<p>Point your browser to <a href="${endpoints.debug}">${endpoints.debug}</a> to <b>debug</b> or
<a href="${endpoints.api}">${endpoints.api}</a> to <b>use it with a client</b>.</p>`);
    });

    // The API endpoint
    this.app.use(endpoints.api, bodyParser.json(), graphqlExpress({
      schema,
    }));

    // The debug (GraphiQL) endpoint should only be created if it was enabled
    if (endpoints.debugEnabled) {
      // The debug endpoint
      this.app.use(endpoints.debug, graphiqlExpress({
        // Pass the api's endpoint
        endpointURL: endpoints.api.toString(),
      }));
    }
  }

  /**
   * Listen at the specified port.
   */
  private listen(endpoints: IEndpoints): void {
    this.app.listen(endpoints.apiPort, () => {
      // tslint:disable-next-line:no-console (those are the only ones)
      console.log(`
SUCCESS >>> IRASYNC API ONLINE <<< SUCCESS
API URL: http://localhost:${endpoints.apiPort}${endpoints.api}`);
      if (endpoints.debugEnabled) {
        // tslint:disable-next-line:no-console (those is the only ones)
        console.log(`DEBUG URL: http://localhost:${endpoints.apiPort}${endpoints.debug}
        `);
      } else {
        // tslint:disable-next-line:no-console (those is the only ones)
        console.log("");
      }
    });
  }
}
