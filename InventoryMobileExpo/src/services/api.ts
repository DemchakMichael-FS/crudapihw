import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// API Configuration
const API_BASE_URL = 'http://192.168.68.69:3456/api'; // Your computer's IP address
// This allows your iPhone to connect to your local API server

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting auth token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      await AsyncStorage.multiRemove(['authToken', 'user']);
      // You can add navigation to login screen here if needed
    }
    return Promise.reject(error);
  }
);

// Types
export interface User {
  id: string;
  username: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface Item {
  _id: string;
  name: string;
  description: string;
  quantity: number;
  price: number;
  category: string;
  createdBy?: {
    _id: string;
    username: string;
    email: string;
  };
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

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Authentication Service
export const authService = {
  // Register new user
  register: async (userData: RegisterData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/users/register', userData);
      if (response.data.success) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  },

  // Login user
  login: async (credentials: LoginData): Promise<AuthResponse> => {
    try {
      const response = await api.post('/users/login', credentials);
      if (response.data.success) {
        await AsyncStorage.setItem('authToken', response.data.data.token);
        await AsyncStorage.setItem('user', JSON.stringify(response.data.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Logout user
  logout: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove(['authToken', 'user']);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  },

  // Get current user
  getCurrentUser: async (): Promise<User | null> => {
    try {
      const userString = await AsyncStorage.getItem('user');
      return userString ? JSON.parse(userString) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  },

  // Check if user is authenticated
  isAuthenticated: async (): Promise<boolean> => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return !!token;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  },

  // Get user profile
  getProfile: async (): Promise<ApiResponse<{ user: User }>> => {
    try {
      const response = await api.get('/users/profile');
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  },
};

// Item Service
export const itemService = {
  // Get all items
  getAllItems: async (): Promise<Item[]> => {
    try {
      const response = await api.get('/items');
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error('Error fetching items:', error);
      throw error;
    }
  },

  // Get a single item by ID
  getItemById: async (id: string): Promise<Item> => {
    try {
      const response = await api.get(`/items/${id}`);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error(`Error fetching item with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new item
  createItem: async (itemData: CreateItemData): Promise<Item> => {
    try {
      const response = await api.post('/items', itemData);
      return response.data.success ? response.data.data : response.data;
    } catch (error) {
      console.error('Error creating item:', error);
      throw error;
    }
  },

  // Update an existing item
  updateItem: async (id: string, itemData: UpdateItemData): Promise<Item> => {
    try {
      const response = await api.put(`/items/${id}`, itemData);
      return response.data.success ? response.data.data : response.data;
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
