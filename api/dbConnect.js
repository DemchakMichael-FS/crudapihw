const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGO_URI || 'mongodb+srv://Zecru:Redzone12@crudapi.8k8ldbq.mongodb.net/?retryWrites=true&w=majority&appName=Crudapi';

// Global variable to track connection status
let isConnected = false;

const dbConnect = async () => {
  // If already connected, return
  if (isConnected) {
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = db.connections[0].readyState;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
};

module.exports = dbConnect;
