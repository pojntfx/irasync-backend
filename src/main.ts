// Use the express framework
import * as express from 'express';
// Enable query parsing
import * as bodyParser from 'body-parser';
// Use the apollo server for graphql
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';

// Use the schema
import { Schema } from './data/schema';

/**
 * Main config parameters
 */
interface Params {
  api: ApiConfig,
  debug: DebugConfig,
}

/**
 * The API's config parameters
 */
interface ApiConfig {
  // The port that the API should use (i.e. '3000')
  port: String;
  // The enpoint that the API should use (i.e. '/graphql')
  endpoint: String;
}

/**
 * GraphiQL's config parameters (debugging and testing)
 */
interface DebugConfig {
  // Whether graphiql (for debugging) should be enabled
  enabled: Boolean,
  // The graphiql (debugging) endpoint
  endpoint: String
}

/**
 * All of the available endpoints
 */
interface Endpoints {
  api: String,
  debugEnabled: Boolean,
  debug: String
}

/**
 * Root of a new Irasync instance
 */
class IrasyncBackend {

  readonly app: any;
  EXPRESS_PORT: String;
  schema: any;

  constructor(Params: Params) {
    // Create new express instance
    this.app = express();
    // Config the server
    this.config(Params.api.port);
    // Create a new instance of the schema
    this.schema = new Schema()
    // Setup the endpoints
    this.setupEndpoints({
      api: Params.api.endpoint,
      debugEnabled: Params.debug.enabled,
      debug: Params.debug.endpoint
    }, this.schema.executableSchema);
    // Listen at EXPRESS_PORT
    this.listen(this.EXPRESS_PORT);
  }

  /**
   * Setup endpoints.
   */
  setupEndpoints(endpoints: Endpoints, schema: any): void {
    // Default endpoint to guid the user to the right ones
    this.app.get('/', (req, res) => {
      res.send(`
You\'ve reached an Irasync API server.
Point your browser to <a href="${endpoints.debug}">${endpoints.debug}</a> to debug or <a href="${endpoints.api}">${endpoints.api}</a> to use it.`);
    });

    // The API endpoint
    this.app.use(endpoints.api, bodyParser.json(), graphqlExpress({
      schema
    }));

    // The debug (GraphiQL) endpoint should only be created if it was enabled
    if (endpoints.debugEnabled) {
      this.app.use(endpoints.debug, graphiqlExpress({
        // Pass the api's endpoint
        endpointURL: endpoints.api.toString()
      }))
    }
  }

  /**
   * Config the server.
   */
  config(apiPort: String): void {
    // The port that express will run at
    this.EXPRESS_PORT = apiPort;
  }

  /**
   * Listen at the configurated ports.
   */
  listen(port: String): void {
    this.app.listen(port, () => {
      console.log(`
SUCCESS >>> IRASYNC API ONLINE <<< SUCCESS
API URL: http://localhost:${this.EXPRESS_PORT}
      `);
    })
  }
}

export default IrasyncBackend;