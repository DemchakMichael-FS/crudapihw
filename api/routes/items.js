const express = require('express');
const router = express.Router();
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem
} = require('../controllers/itemController');

// GET all items
router.get('/', getAllItems);

// GET a single item by ID
router.get('/:id', getItemById);

// POST a new item
router.post('/', createItem);

// PUT update an item
router.put('/:id', updateItem);

// DELETE an item
router.delete('/:id', deleteItem);

module.exports = router;
