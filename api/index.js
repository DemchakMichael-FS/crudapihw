// Root API endpoint
module.exports = (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // Handle OPTIONS request (preflight)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Return API info
  res.status(200).json({
    message: 'Welcome to the CRUD API!',
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
};
