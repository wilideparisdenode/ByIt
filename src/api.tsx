import axios from 'axios';
import type { AxiosInstance, AxiosRequestHeaders,InternalAxiosRequestConfig, AxiosResponse, AxiosError ,AxiosRequestConfig}  from "axios"
// Define your API base URL from environment variables
const API_URL =  'http://localhost:9000/api';

// Type definitions
interface User {
  id: number;
  full_name: string;
  email: string;
  phone_number?: string;
  address?: string;
  is_active: boolean;
  is_admin: boolean | true;
  created_at: string;
  updated_at: string;
}

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  image_url?: string;
  stock: number;
  category_id?: number;
  created_at: string;
}

interface Category {
  id: number;
  name: string;
  slug: string;
}

interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  CartItems?: CartItem[];
}

interface CartItem {
  id: number;
  cart_id: number;
  product_id: number;
  quantity: number;
  Product?: Product;
}

interface Order {
  id: number;
  user_id: number;
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'canceled';
  created_at: string;
  OrderItems?: OrderItem[];
}

interface OrderItem {
  id: number;
  order_id: number;
  product_id: number;
  quantity: number;
  price: number;
  name: string;
}

interface Review {
  id: number;
  user_id: number;
  product_id: number;
  rating: number;
  comment?: string;
  created_at: string;
  User?: Pick<User, 'id' | 'full_name'>;
}

interface Payment {
  id: number;
  order_id: number;
  payment_method: string;
  payment_status: string;
  transaction_id?: string;
  amount: number;
  paid_at?: string;
}

interface AuthResponse {
  token: string;
  user: Omit<User, 'password_hash' | 'google_id'>;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}

// Create axios instance
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        } as AxiosRequestHeaders;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
            window.location.href='/log-in';
          break;
        case 403:
          console.error('Forbidden:', error.response.data);
          break;
        case 404:
          console.error('Not Found:', error.response.data);
          break;
        default:
          console.error('API Error:', error.response.data);
      }
    } else {
      console.error('Network Error:', error.message);
    }
    return Promise.reject(error);
  }
);

// Auth Services
export const authService = {
  register: (userData: Omit<User, 'id' | 'is_active' | 'is_admin' | 'created_at' | 'updated_at'>): Promise<ApiResponse<AuthResponse>> =>
    api.post('/users/register', userData),
  
  login: (credentials: { email: string; password: string }): Promise<ApiResponse<AuthResponse>> =>
    api.post('/users/login', credentials),
  
  getProfile: (): Promise<ApiResponse<Omit<User, 'password_hash' | 'google_id'>>> =>
    api.get('/users/profile'),
};

// Product Services
export const productService = {
  getAllProducts: (params?: Record<string, unknown>): Promise<ApiResponse<Product[]>> =>
    api.get('/products', { params }),
  
  getProductById: (id: number): Promise<ApiResponse<Product & { Reviews?: Review[] }>> =>
    api.get(`/products/${id}`),
  
  createProduct: (productData: Omit<Product, 'id' | 'created_at'>): Promise<ApiResponse<Product>> =>
    api.post('/products', productData),
  
  updateProduct: (id: number, productData: Partial<Omit<Product, 'id' | 'created_at'>>): Promise<ApiResponse<Product>> =>
    api.put(`/products/${id}`, productData),
  
  deleteProduct: (id: number): Promise<ApiResponse<{ message: string }>> =>
    api.delete(`/products/${id}`),
  
  getProductReviews: (productId: number): Promise<ApiResponse<Review[]>> =>
    api.get(`/products/${productId}/reviews`),
  
  createProductReview: (productId: number, reviewData: { rating: number; comment?: string }): Promise<ApiResponse<Review>> =>
    api.post(`/products/${productId}/reviews`, reviewData),
};

// Category Services
export const categoryService = {
  getAllCategories: (): Promise<ApiResponse<Category[]>> =>
    api.get('/categories'),
  
  createCategory: (categoryData: Omit<Category, 'id'>): Promise<ApiResponse<Category>> =>
    api.post('/categories', categoryData),
  
  updateCategory: (id: number, categoryData: Partial<Omit<Category, 'id'>>): Promise<ApiResponse<Category>> =>
    api.put(`/categories/${id}`, categoryData),
  
  deleteCategory: (id: number): Promise<ApiResponse<{ message: string }>> =>
    api.delete(`/categories/${id}`),
};

// Cart Services
export const cartService = {
  getCart: (): Promise<ApiResponse<Cart>> =>
    api.get('/cart'),
  
  addCartItem: (itemData: { product_id: number; quantity: number }): Promise<ApiResponse<CartItem>> =>
    api.post('/cart/items', itemData),
  
  removeCartItem: (id: number): Promise<ApiResponse<{ message: string }>> =>
    api.delete(`/cart/items/${id}`),
};

// Order Services
export const orderService = {
  createOrder: (orderData: { shipping_address: string }): Promise<ApiResponse<Order>> =>
    api.post('/orders', orderData),
  
  getOrderById: (id: number): Promise<ApiResponse<Order>> =>
    api.get(`/orders/${id}`),
  
  getMyOrders: (): Promise<ApiResponse<Order[]>> =>
    api.get('/orders/myorders'),
  
  processPayment: (orderId: number, paymentData: { payment_method: string; transaction_id?: string }): Promise<ApiResponse<Payment>> =>
    api.post(`/orders/${orderId}/payments`, paymentData),
};

// Content Services (for static pages)
export const contentService = {
  getFAQs: (): Promise<ApiResponse<{ questions: { question: string; answer: string }[] }>> =>
    api.get('/content/faqs'),
  
  getAboutContent: (): Promise<ApiResponse<{ content: string }>> =>
    api.get('/content/about'),
};
// Add to your existing api.ts
export const fetchWithAxios = async <T = unknown>(
    url: string, 
    method: "GET" | "POST" = "GET",
    data?: unknown,
    signal?: AbortSignal
  ): Promise<ApiResponse<T>> => {
    try {
      const config: AxiosRequestConfig = { signal };
      let response: AxiosResponse<T>;
      
      if (method === "GET") {
        response = await api.get<T>(url, config);
      } else {
        response = await api.post<T>(url, data, config);
      }
      
      return response;
    } catch (error) {
      throw error;
    }
  };

export default api;