const Item = require('../models/Item');
const mongoose = require('mongoose');

// Get all items
const getAllItems = async (req, res) => {
  try {
    console.log('Attempting to fetch items...');
    console.log('Mongoose connection state:', mongoose.connection.readyState);
    
    // Test the connection
    await mongoose.connection.db.admin().ping();
    console.log('MongoDB ping successful');
    
    const items = await Item.find().sort({ createdAt: -1 });
    console.log('Successfully fetched items:', items.length);
    res.status(200).json(items);
  } catch (error) {
    console.error('Error in GET /api/items:', error);
    res.status(500).json({ 
      message: 'Failed to fetch items',
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      connectionState: mongoose.connection.readyState
    });
  }
};

// Get a single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new item
const createItem = async (req, res) => {
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
};

// Update an existing item
const updateItem = async (req, res) => {
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
};

// Delete an item
const deleteItem = async (req, res) => {
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
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
