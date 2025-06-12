import { api } from './api';
import { API_ENDPOINTS } from './config';

export interface Category {
  id: number;
  name: string;
  image: string;
  creationAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  creationAt: string;
  updatedAt: string;
  category: Category;
}

export interface User {
  id: number;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'customer';
  avatar: string;
  creationAt: string;
  updatedAt: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
}

export interface CreateProductRequest {
  title: string;
  price: number;
  description: string;
  categoryId: number;
  images: string[];
}

export interface UpdateProductRequest {
  title?: string;
  price?: number;
  description?: string;
  categoryId?: number;
  images?: string[];
}

export interface CreateCategoryRequest {
  name: string;
  image: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role?: 'admin' | 'customer';
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>(
      API_ENDPOINTS.auth.login,
      credentials
    );

    localStorage.setItem('access_token', response.access_token);
    localStorage.setItem('refresh_token', response.refresh_token);

    return response;
  },

  getProfile: async (): Promise<User> => {
    return api.get<User>(API_ENDPOINTS.auth.profile);
  },

  refreshToken: async (refreshToken: string): Promise<AuthResponse> => {
    return api.post<AuthResponse>(API_ENDPOINTS.auth.refresh, {
      refreshToken,
    });
  },

  logout: (): void => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  },
};

export const productService = {
  getProducts: async (offset?: number, limit?: number): Promise<Product[]> => {
    const endpoint =
      offset !== undefined && limit !== undefined
        ? API_ENDPOINTS.products.paginated(offset, limit)
        : API_ENDPOINTS.products.list;

    return api.get<Product[]>(endpoint);
  },

  getProductById: async (id: number): Promise<Product> => {
    return api.get<Product>(API_ENDPOINTS.products.byId(id));
  },

  getProductsByCategory: async (categoryId: number): Promise<Product[]> => {
    return api.get<Product[]>(API_ENDPOINTS.products.byCategory(categoryId));
  },

  searchProducts: async (title: string): Promise<Product[]> => {
    return api.get<Product[]>(API_ENDPOINTS.products.search(title));
  },

  createProduct: async (product: CreateProductRequest): Promise<Product> => {
    return api.post<Product>(API_ENDPOINTS.products.create, product);
  },

  updateProduct: async (
    id: number,
    product: UpdateProductRequest
  ): Promise<Product> => {
    return api.put<Product>(API_ENDPOINTS.products.update(id), product);
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    return api.delete<boolean>(API_ENDPOINTS.products.delete(id));
  },
};

export const categoryService = {
  getCategories: async (): Promise<Category[]> => {
    return api.get<Category[]>(API_ENDPOINTS.categories.list);
  },

  getCategoryById: async (id: number): Promise<Category> => {
    return api.get<Category>(API_ENDPOINTS.categories.byId(id));
  },

  getCategoryProducts: async (id: number): Promise<Product[]> => {
    return api.get<Product[]>(API_ENDPOINTS.categories.products(id));
  },

  createCategory: async (
    category: CreateCategoryRequest
  ): Promise<Category> => {
    return api.post<Category>(API_ENDPOINTS.categories.create, category);
  },

  updateCategory: async (
    id: number,
    category: Partial<CreateCategoryRequest>
  ): Promise<Category> => {
    return api.put<Category>(API_ENDPOINTS.categories.update(id), category);
  },

  deleteCategory: async (id: number): Promise<boolean> => {
    return api.delete<boolean>(API_ENDPOINTS.categories.delete(id));
  },
};

export const userService = {
  getUsers: async (): Promise<User[]> => {
    return api.get<User[]>(API_ENDPOINTS.users.list);
  },

  getUserById: async (id: number): Promise<User> => {
    return api.get<User>(API_ENDPOINTS.users.byId(id));
  },

  createUser: async (user: CreateUserRequest): Promise<User> => {
    return api.post<User>(API_ENDPOINTS.users.create, user);
  },

  updateUser: async (
    id: number,
    user: Partial<CreateUserRequest>
  ): Promise<User> => {
    return api.put<User>(API_ENDPOINTS.users.update(id), user);
  },

  deleteUser: async (id: number): Promise<boolean> => {
    return api.delete<boolean>(API_ENDPOINTS.users.delete(id));
  },

  checkEmailAvailability: async (
    email: string
  ): Promise<{ isAvailable: boolean }> => {
    return api.post<{ isAvailable: boolean }>(API_ENDPOINTS.users.isAvailable, {
      email,
    });
  },
};

export const fileService = {
  uploadFile: async (
    file: File
  ): Promise<{ originalname: string; filename: string; location: string }> => {
    return api.upload<{
      originalname: string;
      filename: string;
      location: string;
    }>(API_ENDPOINTS.files.upload, file);
  },
};
