import axios from 'axios';

// API Configuration
const API_BASE_URL = 'http://10.0.2.2:3456/api'; // Android emulator localhost
// For iOS simulator, use: 'http://localhost:3456/api'
// For physical device, use your computer's IP address: 'http://192.168.1.XXX:3456/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  createdAt: string;
}

export interface CreateItemData {
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
}

export interface UpdateItemData extends Partial<CreateItemData> {}

// API Service
export const itemService = {
  // Get all items
  getAllItems: async (): Promise<Item[]> => {
    try {
      const response = await api.get('/items');
      return response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get a single item by ID
  getItemById: async (id: string): Promise<Item> => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new item
  createItem: async (itemData: CreateItemData): Promise<Item> => {
    try {
      const response = await api.post('/items', itemData);
      return response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update an existing item
  updateItem: async (id: string, itemData: UpdateItemData): Promise<Item> => {
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data;
    } catch (error) {
      console.error(`Error updating item with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete an item
  deleteItem: async (id: string): Promise<void> => {
    try {
      await api.delete(`/items/${id}`);
    } catch (error) {
      console.error(`Error deleting item with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api;
