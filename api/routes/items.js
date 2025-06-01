const express = require('express');
const router = express.Router();
const { authenticateToken, optionalAuth } = require('../middleware/auth');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// GET all items (public, but can show user-specific data if authenticated)
router.get('/', optionalAuth, getAllItems);

// GET a single item by ID (public)
router.get('/:id', optionalAuth, getItemById);

// POST a new item (protected)
router.post('/', authenticateToken, createItem);

// PUT update an item (protected)
router.put('/:id', authenticateToken, updateItem);

// DELETE an item (protected)
router.delete('/:id', authenticateToken, deleteItem);

module.exports = router;
