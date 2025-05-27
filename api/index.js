const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3456;

// Middleware
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3456',
  'http://localhost:5888',
  process.env.FRONTEND_URL || 'https://your-frontend.vercel.app'
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Handle preflight requests
app.options('*', cors());

app.use(express.json());

// Log all requests with detailed information
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Headers:`, req.headers);
  next();
});

// Print registered routes for debugging
function listRoutes() {
  console.log('\n=== REGISTERED ROUTES ===');
  const routes = [];
  app._router.stack.forEach(middleware => {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push(`${Object.keys(middleware.route.methods)[0].toUpperCase()} ${middleware.route.path}`);
    } else if (middleware.name === 'router') {
      // router middleware
      middleware.handle.stack.forEach(handler => {
        if (handler.route) {
          routes.push(`${Object.keys(handler.route.methods)[0].toUpperCase()} ${handler.route.path}`);
        }
      });
    }
  });
  routes.forEach(route => console.log(route));
  console.log('========================\n');
}

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/inventory';

// Add error handler for unhandled promise rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled Promise Rejection:', error);
  process.exit(1);
});

const connectDB = async () => {
  console.log('Connecting to MongoDB...');

  // Set up mongoose connection events
  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('Mongoose connection error:', err);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected from MongoDB');
  });

  // Close the connection when the Node process ends
  process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed through app termination');
    process.exit(0);
  });

  try {
    await mongoose.connect(MONGODB_URI, {
      // Remove deprecated options
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket operations
      family: 4, // Use IPv4, skip trying IPv6
    });

    console.log('Successfully connected to MongoDB');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Connection string used:', MONGODB_URI.replace(/:([^:]+)@/, ':***@'));
    console.error('Please ensure MongoDB is running and accessible');
    throw error;
  }
};

// Connect to DB and then start the server
connectDB().then(() => {
  console.log('MongoDB connection established, starting server...');

  // List all registered routes for debugging
  listRoutes();

  // Start the server
  const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);

    // Print mongoose connection status
    console.log(`MongoDB connection state: ${mongoose.connection.readyState}`);
    console.log(`Available models: ${mongoose.modelNames().join(', ')}`);
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // Handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  });

}).catch(error => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1);
});

// Remove the separate app.listen() at the bottom of the file

// Health check endpoint
app.get('/api/health', async (req, res) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();

    res.status(200).json({
      status: 'ok',
      message: 'API and database are running',
      database: 'connected',
      timestamp: new Date().toISOString(),
      nodeVersion: process.version,
      platform: process.platform
    });
  } catch (error) {
    console.error('Health check failed:', error);
    res.status(500).json({
      status: 'error',
      message: 'API is running but database connection failed',
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Import routes
const itemRoutes = require('./routes/items');

// Routes
app.use('/api/items', itemRoutes);

// API info route
app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Welcome to the Inventory API',
    endpoints: {
      items: {
        get_all: '/api/items',
        get_one: '/api/items/:id',
        create: '/api/items',
        update: '/api/items/:id',
        delete: '/api/items/:id'
      }
    }
  });
});

// Health check endpoints
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Inventory API is running!' });
});



// Handle OPTIONS requests
app.options('*', (req, res) => {
  res.status(200).end();
});

// Server startup is now handled in the connectDB().then() block above

module.exports = app;
