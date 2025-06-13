import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@/test/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import ProductDetails from './index';

vi.mock('@/services', () => ({
  productService: {
    getProductById: vi.fn(),
    deleteProduct: vi.fn(),
  },
}));

vi.mock('@/stores', () => ({
  useAuthStore: vi.fn(),
  useCartStore: vi.fn(),
}));

const mockUseParams = vi.fn();

vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useParams: () => mockUseParams(),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
    useNavigate: () => vi.fn(),
  };
});

const mockProduct = {
  id: 1,
  title: 'Test Product',
  description: 'Test Description',
  price: 99.99,
  images: ['image1.jpg', 'image2.jpg'],
  category: {
    id: 1,
    name: 'Electronics',
    image: 'category.jpg',
    creationAt: '2023-01-01',
    updatedAt: '2023-01-01',
  },
  creationAt: '2023-01-01',
  updatedAt: '2023-01-01',
};

describe('ProductDetails Component', () => {
  let queryClient: QueryClient;
  const user = userEvent.setup();

  const renderWithProviders = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/product/1']}>{component}</MemoryRouter>
      </QueryClientProvider>
    );
  };

  beforeEach(async () => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();

    const { useAuthStore, useCartStore } = await import('@/stores');

    vi.mocked(useAuthStore).mockReturnValue({
      isAuthenticated: false,
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
      isLoading: false,
      initializeAuth: vi.fn(),
    });

    vi.mocked(useCartStore).mockReturnValue({
      addItem: vi.fn(),
      items: [],
      updateQuantity: vi.fn(),
      removeItem: vi.fn(),
      clearCart: vi.fn(),
      getTotalPrice: vi.fn(() => 0),
      getTotalItems: vi.fn(() => 0),
    });

    mockUseParams.mockReturnValue({ id: '1' });
  });

  describe('No ID provided', () => {
    it('should render error message when no product ID is provided', async () => {
      mockUseParams.mockReturnValue({});

      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('no-id-error')).toBeInTheDocument();
        expect(screen.getByText('Product not found')).toBeInTheDocument();
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
      });
    });
  });

  describe('Loading State', () => {
    it('should render loading state when fetching product', async () => {
      const { productService } = await import('@/services');
      vi.mocked(productService.getProductById).mockImplementation(
        () =>
          new Promise((resolve) => {
            setTimeout(() => resolve(mockProduct), 100);
          })
      );

      renderWithProviders(<ProductDetails />);

      expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });
  });

  describe('Error State', () => {
    it('should render ProductNotFound when product fetch fails', async () => {
      const { productService } = await import('@/services');
      vi.mocked(productService.getProductById).mockRejectedValue(
        new Error('Product not found')
      );

      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('product-not-found')).toBeInTheDocument();
      });
    });
  });

  describe('Product Found', () => {
    beforeEach(async () => {
      const { productService } = await import('@/services');
      vi.mocked(productService.getProductById).mockResolvedValue(mockProduct);
    });

    it('should render AppLayoutHeader with correct props', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByText('Product Details')).toBeInTheDocument();
        expect(
          screen.getByText('View and manage product information')
        ).toBeInTheDocument();
        expect(screen.getByText('Back to Home')).toBeInTheDocument();
      });
    });

    it('should render product information', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('Test Description')).toBeInTheDocument();
        expect(screen.getByText('$99.99')).toBeInTheDocument();
        expect(screen.getByText('Electronics')).toBeInTheDocument();
      });
    });

    it('should render add to cart button', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('add-to-cart-button')).toBeInTheDocument();
      });
    });

    it('should render go to cart button', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('go-to-cart-button')).toBeInTheDocument();
      });
    });
  });

  describe('Authenticated User Actions', () => {
    beforeEach(async () => {
      const { productService } = await import('@/services');
      const { useAuthStore } = await import('@/stores');

      vi.mocked(productService.getProductById).mockResolvedValue(mockProduct);
      vi.mocked(useAuthStore).mockReturnValue({
        isAuthenticated: true,
        user: { id: 1, name: 'Test User', email: 'test@test.com' },
        login: vi.fn(),
        logout: vi.fn(),
        isLoading: false,
        initializeAuth: vi.fn(),
      });
    });

    it('should render edit and delete buttons for authenticated users', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('edit-product-button')).toBeInTheDocument();
        expect(screen.getByTestId('delete-product-button')).toBeInTheDocument();
      });
    });

    it('should open ConfirmDialog when delete button is clicked', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('delete-product-button')).toBeInTheDocument();
      });

      const deleteButton = screen.getByTestId('delete-product-button');
      await user.click(deleteButton);

      await waitFor(() => {
        expect(screen.getByTestId('confirm-dialog-title')).toBeInTheDocument();
        expect(
          screen.getByText(
            'Are you sure you want to delete this product? This action cannot be undone.'
          )
        ).toBeInTheDocument();
        expect(screen.getByText('Confirm')).toBeInTheDocument();
        expect(screen.getByText('Cancel')).toBeInTheDocument();
      });
    });

    it('should open ProductEditSheet when edit button is clicked', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(screen.getByTestId('edit-product-button')).toBeInTheDocument();
      });

      const editButton = screen.getByTestId('edit-product-button');
      await user.click(editButton);

      await waitFor(() => {
        expect(screen.getByTestId('edit-sheet-title')).toBeInTheDocument();
        expect(
          screen.getByText('Update product information')
        ).toBeInTheDocument();
      });
    });
  });

  describe('Component Integration', () => {
    beforeEach(async () => {
      const { productService } = await import('@/services');
      vi.mocked(productService.getProductById).mockResolvedValue(mockProduct);
    });

    it('should call productService.getProductById with correct ID', async () => {
      const { productService } = await import('@/services');

      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        expect(vi.mocked(productService.getProductById)).toHaveBeenCalledWith(
          1
        );
      });
    });

    it('should render main container with correct classes', async () => {
      renderWithProviders(<ProductDetails />);

      await waitFor(() => {
        const container = screen.getByText('Test Product').closest('main');
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass('container', 'mx-auto', 'px-4', 'py-8');
      });
    });
  });
});
