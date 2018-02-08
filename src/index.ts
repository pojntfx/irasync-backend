// Import the main class
import { IrasyncBackend } from "./main";

// Create the root instance with a configuration object
const irasyncBackend = new IrasyncBackend({
  // API connection details
  api: {
    endpoint: "/api",
    port: "3000",
  },
  // Debugging interface configuration
  debug: {
    enabled: true,
    endpoint: "/debug",
  },
  // Database config
  // dbHost: 'http://localhost',
  // dbName: 'irasync'
  // dbPort: '21070'
});
