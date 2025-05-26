const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the Item model with correct capitalization
const Item = require('./Item');

// Initialize express app
const app = express();

// Configure CORS for all routes
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Enable CORS middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Origin']
}));

app.use(express.json());

// Connect to MongoDB - optimized for serverless environment
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Zecru:Redzone12@crudapi.8k8ldbq.mongodb.net/?retryWrites=true&w=majority&appName=Crudapi';

// Cache the database connection
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    return cachedDb;
  }

  // Set the connection options
  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    const conn = await mongoose.connect(MONGODB_URI, opts);
    cachedDb = conn;
    console.log('MongoDB connected');
    return conn;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

// Connect to the database immediately
connectToDatabase().catch(console.error);

// API Routes

// GET all items
app.get('/api/items', async (req, res) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single item
app.get('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new item
app.post('/api/items', async (req, res) => {
  try {
    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      quantity: req.body.quantity,
      price: req.body.price,
      category: req.body.category
    });

    const newItem = await item.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update an item
app.put('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (req.body.name) item.name = req.body.name;
    if (req.body.description) item.description = req.body.description;
    if (req.body.quantity != null) item.quantity = req.body.quantity;
    if (req.body.price != null) item.price = req.body.price;
    if (req.body.category) item.category = req.body.category;

    const updatedItem = await item.save();
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE an item
app.delete('/api/items/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

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

// Handle OPTIONS requests
app.options('*', (req, res) => {
  res.status(200).end();
});

// Default route
app.get('/', (req, res) => {
  res.status(200).send('Inventory API is running');
});

// For local development
const PORT = process.env.PORT || 3456;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export the Express API for Vercel
module.exports = app;
