// GET, PUT, DELETE item by ID endpoint
const dbConnect = require('../dbConnect');
const Item = require('../Item');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Get the item ID from the URL
  const { id } = req.query;

  // Connect to the database
  await dbConnect();

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }
        return res.status(200).json(item);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'PUT':
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }

        if (req.body.name) item.name = req.body.name;
        if (req.body.description) item.description = req.body.description;
        if (req.body.quantity != null) item.quantity = req.body.quantity;
        if (req.body.price != null) item.price = req.body.price;
        if (req.body.category) item.category = req.body.category;

        const updatedItem = await item.save();
        return res.status(200).json(updatedItem);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    case 'DELETE':
      try {
        const item = await Item.findById(id);
        if (!item) {
          return res.status(404).json({ message: 'Item not found' });
        }

        await Item.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Item deleted successfully' });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};
