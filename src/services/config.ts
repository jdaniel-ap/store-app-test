export const API_CONFIG = {
  baseURL:
    import.meta.env.VITE_API_BASE_URL || 'https://api.escuelajs.co/api/v1',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
};

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    profile: '/auth/profile',
    refresh: '/auth/refresh-token',
  },
  products: {
    list: '/products',
    byId: (id: string | number) => `/products/${id}`,
    create: '/products',
    update: (id: string | number) => `/products/${id}`,
    delete: (id: string | number) => `/products/${id}`,
    byCategory: (categoryId: string | number) =>
      `/products/?categoryId=${categoryId}`,
    search: (title: string) => `/products/?title=${title}`,
    paginated: (offset: number, limit: number) =>
      `/products?offset=${offset}&limit=${limit}`,
  },
  categories: {
    list: '/categories',
    byId: (id: string | number) => `/categories/${id}`,
    create: '/categories',
    update: (id: string | number) => `/categories/${id}`,
    delete: (id: string | number) => `/categories/${id}`,
    products: (id: string | number) => `/categories/${id}/products`,
  },
  users: {
    list: '/users',
    byId: (id: string | number) => `/users/${id}`,
    create: '/users',
    update: (id: string | number) => `/users/${id}`,
    delete: (id: string | number) => `/users/${id}`,
    isAvailable: '/users/is-available',
  },
  files: {
    upload: '/files/upload',
  },
} as const;

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;
