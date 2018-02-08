// Use the Irasync backend server
import IrasyncBackend from './main'

// Create the root instance with a configuration object
let irasyncBackend = new IrasyncBackend({
  // API connection details
  api: {
    port: '3000',
    endpoint: '/api'
  },
  // Debugging interface definition
  debug: {
    enabled: true,
    endpoint: '/debug'
  }
  // Database config
  // dbHost: 'http://localhost',
  // dbName: 'irasync'
  // dbPort: '21070'
});