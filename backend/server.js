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
  origin: ['https://crud-api-deployment.vercel.app', 'http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const itemRoutes = require('../src/routes/items');

// Use routes
app.use('/api/items', itemRoutes);

// API info route
app.get('/api', (req, res) => {
  res.send('Welcome to the CRUD API! Go to /api/items to see all items.');
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://Zecru:Redzone12@crudapi.8k8ldbq.mongodb.net/?retryWrites=true&w=majority&appName=Crudapi');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// Connect to the database
connectDB().catch(err => console.error('MongoDB connection error:', err));

// Export the Express API
module.exports = app;
