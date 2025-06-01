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

    // If user is authenticated, show all items with creator info
    // If not authenticated, show all items without creator info
    let query = Item.find();

    if (req.user) {
      query = query.populate('createdBy', 'username email');
    }

    const items = await query.sort({ createdAt: -1 });
    console.log('Successfully fetched items:', items.length);
    res.status(200).json({
      success: true,
      data: items
    });
  } catch (error) {
    console.error('Error in GET /api/items:', error);
    res.status(500).json({
      success: false,
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
    let query = Item.findById(req.params.id);

    if (req.user) {
      query = query.populate('createdBy', 'username email');
    }

    const item = await query;
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
      category: req.body.category,
      createdBy: req.user._id
    });

    const newItem = await item.save();
    await newItem.populate('createdBy', 'username email');

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: newItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update an existing item
const updateItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item or is admin
    if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this item'
      });
    }

    if (req.body.name) item.name = req.body.name;
    if (req.body.description) item.description = req.body.description;
    if (req.body.quantity != null) item.quantity = req.body.quantity;
    if (req.body.price != null) item.price = req.body.price;
    if (req.body.category) item.category = req.body.category;

    const updatedItem = await item.save();
    await updatedItem.populate('createdBy', 'username email');

    res.status(200).json({
      success: true,
      message: 'Item updated successfully',
      data: updatedItem
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete an item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    // Check if user owns the item or is admin
    if (item.createdBy.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this item'
      });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
};
