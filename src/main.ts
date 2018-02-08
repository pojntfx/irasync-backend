// Use the express framework
import * as express from 'express';
// Enable query parsing
import bodyParser from 'body-parser';
// Use the apollo server for graphql
import { graphqlExpress } from 'apollo-server-express';

/**
 * Root of a new Irasync instance
 */
class IrasyncBackend {

  app: any;
  EXPRESS_PORT: String;

  constructor() {
    // Create new express instance
    this.app = express();
    // Config the server
    this.config();
    // Setup the routes
    this.routes();
    // Listen at EXPRESS_PORT
    this.listen();
  }

  /**
   * Config the server.
   */
  config(): void {
    // The port that express will run at
    this.EXPRESS_PORT = '3000';
  }

  /**
   * Setup routes.
   */
  routes(): void {
    this.app.get('/', (req, res) => {
      res.send('Hello, world!');
    })
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