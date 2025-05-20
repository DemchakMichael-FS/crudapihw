const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'https://crud-api-deployment.vercel.app', 'https://*.vercel.app'], // Allow React dev server and Vercel domains
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const itemRoutes = require('./routes/items');

// Use routes
app.use('/api/items', itemRoutes);

// API info route
app.get('/api', (req, res) => {
  res.send('Welcome to the CRUD API! Go to /api/items to see all items.');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  // Set static folder
  app.use(express.static(path.join(__dirname, '../client/dist')));

  // Any route that is not an API route will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

// For local development, start the server
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  });
} else {
  // For Vercel, just connect to the database
  connectDB().catch(err => console.error('MongoDB connection error:', err));
}

module.exports = app; // For testing purposes
