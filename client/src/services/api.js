import axios from 'axios';

// Create an axios instance with a base URL
let baseURL;

if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
  // Development on localhost - use proxy set up in vite.config.js
  baseURL = '/api';
} else if (window.location.hostname === '192.168.68.69') {
  // Development on mobile/network - direct API URL
  baseURL = 'http://192.168.68.69:3456/api';
} else {
  // Production - use relative API path since both frontend and backend are on same domain
  baseURL = '/api';
}

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Item API services
export const itemService = {
  // Get all items
  getAllItems: async () => {
    try {
      const response = await api.get('/items');
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get a single item by ID
  getItemById: async (id) => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new item
  createItem: async (itemData) => {
    try {
      const response = await api.post('/items', itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update an existing item
  updateItem: async (id, itemData) => {
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete an item
  deleteItem: async (id) => {
    try {
      const response = await api.delete(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api;
