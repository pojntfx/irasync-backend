// Use the express framework
import * as express from 'express';
// Enable query parsing
import * as bodyParser from 'body-parser';
// Use the apollo server for graphql
import { graphqlExpress } from 'apollo-server-express';

/**
 * Configuration object interface
 */
interface ConfigObject {
  // The port that the API should use (i.e. '3000')
  apiPort: String,
  // The enpoint that the API should use (i.e. '/graphql')
  apiEndpoint: String
}

/**
 * Root of a new Irasync instance
 */
class IrasyncBackend {

  app: any;
  EXPRESS_PORT: String;

  constructor(configObject: ConfigObject) {
    // Create new express instance
    this.app = express();
    // Config the server
    this.config(configObject.apiPort);
    // Setup the endpoints
    this.endpoints(configObject.apiEndpoint);
    // Listen at EXPRESS_PORT
    this.listen();
  }

  /**
   * Config the server.
   */
  config(apiPort: String): void {
    // The port that express will run at
    this.EXPRESS_PORT = apiPort;
  }

  /**
   * Setup endpoints.
   */
  endpoints(apiEndpoint: String): void {
    // Default endpoint to guid the user to the right ones
    this.app.get('/', (req, res) => {
      res.send(`
You\'ve reached an Irasync API server.
Point your browser to <a href="/graphiql">/graphiql</a> to debug or <a href="/graphql">/graphql</a> to use it.`);
    });
    // The API endpoint
    this.app.use(apiEndpoint, bodyParser.json(), graphqlExpress({}));
  }

  /**
   * Listen at the configured ports.
   */
  listen(): void {
    this.app.listen(this.EXPRESS_PORT, () => {
      console.log(`
SUCCESS >>> IRASYNC API ONLINE <<< SUCCESS
API URL: http://localhost:${this.EXPRESS_PORT}
      `);
    })
  }
}

export default IrasyncBackend;