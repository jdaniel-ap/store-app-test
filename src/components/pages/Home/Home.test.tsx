import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '../../../test/test-utils';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './index';
import type { Product } from '@/services';

vi.mock('@/assets/images/logos/colorfull-logo.svg?react', () => ({
  default: () => <div data-testid="logo">Logo</div>,
}));

vi.mock('@/hooks', () => ({
  useProductFilters: vi.fn(),
}));

vi.mock('@/services', () => ({
  productService: {
    getProducts: vi.fn(),
  },
}));

import { useProductFilters } from '@/hooks';

const mockUseProductFilters = vi.mocked(useProductFilters);

const mockCategory = {
  id: 1,
  name: 'Electronics',
  image: 'electronics.jpg',
  creationAt: '2024-01-01',
  updatedAt: '2024-01-01',
};

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Test Product 1',
    description: 'Description 1',
    price: 29.99,
    category: mockCategory,
    images: ['image1.jpg'],
    creationAt: '2024-01-01',
    updatedAt: '2024-01-01',
  },
  {
    id: 2,
    title: 'Test Product 2',
    description: 'Description 2',
    price: 49.99,
    category: mockCategory,
    images: ['image2.jpg'],
    creationAt: '2024-01-02',
    updatedAt: '2024-01-02',
  },
];

describe('Home Component', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const renderWithQueryClient = (component: React.ReactElement) => {
    return render(
      <QueryClientProvider client={queryClient}>
        {component}
      </QueryClientProvider>
    );
  };

  describe('when products are loading', () => {
    it('shows loading state with loader and loading message', () => {
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: undefined,
        isLoading: true,
        isError: false,
        totalPages: 0,
        handlePageChange: vi.fn(),
        handleFilterChange: vi.fn(),
      });

      renderWithQueryClient(<Home />);

      expect(
        screen.getByText('Loading awesome products...')
      ).toBeInTheDocument();

      const loaders = screen.getAllByTestId('loader');
      expect(loaders.length).toBeGreaterThan(0);
    });
  });

  describe('when there is an error loading products', () => {
    it('shows error message', () => {
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: undefined,
        isLoading: false,
        isError: true,
        totalPages: 0,
        handlePageChange: vi.fn(),
        handleFilterChange: vi.fn(),
      });

      renderWithQueryClient(<Home />);

      expect(
        screen.getByText('Something went wrong. Please try again.')
      ).toBeInTheDocument();
    });
  });

  describe('when products are loaded successfully', () => {
    beforeEach(() => {
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: mockProducts,
        isLoading: false,
        isError: false,
        totalPages: 3,
        handlePageChange: vi.fn(),
        handleFilterChange: vi.fn(),
      });
    });

    it('renders the featured products heading and subtitle', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
          '🌟 Discover Our Amazing Collection'
        );
      });

      expect(
        screen.getByText('Handpicked products just for you')
      ).toBeInTheDocument();
    });

    it('renders product filters component', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Filters')).toBeInTheDocument();
      });
    });

    it('renders product list with products', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        expect(screen.getByText('Test Product 1')).toBeInTheDocument();
        expect(screen.getByText('Test Product 2')).toBeInTheDocument();

        expect(screen.getByText('$29.99')).toBeInTheDocument();
        expect(screen.getByText('$49.99')).toBeInTheDocument();
      });
    });

    it('renders pagination component', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        expect(screen.getByTestId('pagination')).toBeInTheDocument();
      });
    });

    it('calls handleFilterChange when filters are applied', async () => {
      const mockHandleFilterChange = vi.fn();
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: mockProducts,
        isLoading: false,
        isError: false,
        totalPages: 3,
        handlePageChange: vi.fn(),
        handleFilterChange: mockHandleFilterChange,
      });

      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const filterButton = screen.getByText('Apply Filters');
        filterButton.click();
      });

      expect(mockHandleFilterChange).toHaveBeenCalled();
    });

    it('renders product cards that are clickable', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const productCards = screen.getAllByTestId('product-card');
        expect(productCards.length).toBeGreaterThan(0);
        expect(productCards[0]).toBeInTheDocument();
        expect(productCards[0]).toHaveAttribute('data-testid', 'product-card');
      });
    });
  });

  describe('component structure', () => {
    beforeEach(() => {
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: mockProducts,
        isLoading: false,
        isError: false,
        totalPages: 3,
        handlePageChange: vi.fn(),
        handleFilterChange: vi.fn(),
      });
    });

    it('renders within AppLayout', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const banners = screen.getAllByRole('banner');
        expect(banners.length).toBeGreaterThan(0);

        expect(screen.getByRole('main')).toBeInTheDocument();

        const footers = screen.getAllByRole('contentinfo');
        expect(footers.length).toBeGreaterThan(0);
      });
    });

    it('has proper semantic structure with section and heading', async () => {
      renderWithQueryClient(<Home />);

      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toBeInTheDocument();
        expect(heading).toHaveAttribute('id', 'products-heading');
        expect(heading).toHaveTextContent('🌟 Discover Our Amazing Collection');

        const section = heading.closest('section');
        expect(section).toBeInTheDocument();
        expect(section?.tagName).toBe('SECTION');
        expect(section).toHaveAttribute('aria-labelledby', 'products-heading');
      });
    });
  });

  describe('URL persistence', () => {
    it('correctly parses URL query parameters', () => {
      const testURL = '?title=laptop&price_min=200&price_max=800&page=2';
      const params = new URLSearchParams(testURL);

      expect(params.get('title')).toBe('laptop');
      expect(params.get('price_min')).toBe('200');
      expect(params.get('price_max')).toBe('800');
      expect(params.get('page')).toBe('2');
    });
  });

  describe('empty state', () => {
    it('renders nothing when products is null', () => {
      mockUseProductFilters.mockReturnValue({
        page: 1,
        setPage: vi.fn(),
        filters: {},
        setFilters: vi.fn(),
        products: undefined,
        isLoading: false,
        isError: false,
        totalPages: 0,
        handlePageChange: vi.fn(),
        handleFilterChange: vi.fn(),
      });

      renderWithQueryClient(<Home />);

      expect(screen.queryByText('Test Product 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Test Product 2')).not.toBeInTheDocument();
    });
  });
});
