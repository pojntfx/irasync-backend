// Use the express framework
import * as express from 'express'

/**
 * Root of a new Irasync instance
 */
class IrasyncBackend {

  app: express.Application;
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
  config() {
    // The port that express will run at
    this.EXPRESS_PORT = '3000';
  }

  /**
   * Setup routes.
   */
  routes() {
    this.app.get('/', (req, res) => {
      res.send('Hello, world!');
    })
  }

  /**
   * Listen at the configured ports.
   */
  listen() {
    this.app.listen(this.EXPRESS_PORT, () => {
      console.log(`
      SUCCESS >>> IRASYNC API ONLINE <<< SUCCESS
      Point your browser to http://localhost:${this.EXPRESS_PORT}
      `);
    })
  }
}

let irasyncBackend = new IrasyncBackend();