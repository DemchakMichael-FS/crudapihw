// This file is specifically for Vercel serverless functions
const app = require('../src/server');

// Export the Express app as a serverless function
module.exports = app;
