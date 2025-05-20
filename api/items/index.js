// GET all items endpoint
const dbConnect = require('../dbConnect');
const Item = require('../Item');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Connect to the database
  await dbConnect();

  // Handle different HTTP methods
  switch (req.method) {
    case 'GET':
      try {
        const items = await Item.find().sort({ createdAt: -1 });
        return res.status(200).json(items);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }

    case 'POST':
      try {
        const item = new Item({
          name: req.body.name,
          description: req.body.description,
          quantity: req.body.quantity,
          price: req.body.price,
          category: req.body.category
        });

        const newItem = await item.save();
        return res.status(201).json(newItem);
      } catch (error) {
        return res.status(400).json({ message: error.message });
      }

    default:
      return res.status(405).json({ message: 'Method not allowed' });
  }
};
