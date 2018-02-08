// Use the Irasync backend server
import IrasyncBackend from './main'

// Create the root instance
// The express port, mongodb port etc. will be passed in here in the future as a configuration object
let irasyncBackend = new IrasyncBackend();