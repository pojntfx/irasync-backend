// Use the Irasync backend server
import IrasyncBackend from './main'

// Create the root instance with a configuration object
let irasyncBackend = new IrasyncBackend({
  // API connection details
  apiPort: '3000',
  apiEndpoint: '/api',

  // Debug config
  // debugEndpoint: '/debug',

  // Database config
  // dbHost: 'http://localhost',
  // dbName: 'irasync'
  // dbPort: '21070'
});