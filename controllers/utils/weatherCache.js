const NodeCache = require('node-cache'); // Import Node.js caching library

// Initialize a new cache instance with a default TTL (time-to-live) of 10 minutes
const weatherCache = new NodeCache();

module.exports = {weatherCache};