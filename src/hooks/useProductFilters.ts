import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import type { ProductFilters, Product } from '@/services';
import { productService } from '@/services';

interface UseProductFiltersOptions {
  itemsPerPage?: number;
}

interface UseProductFiltersReturn {
  page: number;
  setPage: (page: number) => void;
  filters: ProductFilters;
  setFilters: (filters: ProductFilters) => void;
  products: Product[] | undefined;
  isLoading: boolean;
  isError: boolean;
  totalPages: number;
  handlePageChange: (newPage: number) => void;
  handleFilterChange: (newFilters: ProductFilters) => void;
}

export const useProductFilters = (
  options?: UseProductFiltersOptions
): UseProductFiltersReturn => {
  const MAX_PRODUCTS = options?.itemsPerPage || 10;
  let params = new URLSearchParams(window.location.search);
  const pageParam = params.get('page');
  const [page, setPage] = useState(pageParam ? parseInt(pageParam) : 1);

  const [filters, setFilters] = useState<ProductFilters>(() => {
    params = new URLSearchParams(window.location.search);
    const initialFilters: ProductFilters = {};

    const title = params.get('title');
    const priceMin = params.get('price_min');
    const priceMax = params.get('price_max');

    if (title) initialFilters.title = title;
    if (priceMin) initialFilters.price_min = parseInt(priceMin);
    if (priceMax) initialFilters.price_max = parseInt(priceMax);

    return initialFilters;
  });

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', page, MAX_PRODUCTS, filters],
    queryFn: () => productService.getProducts(page, MAX_PRODUCTS, filters),
  });

  useEffect(() => {
    const currentParams = new URLSearchParams();

    if (filters.title) {
      currentParams.set('title', filters.title);
    }

    if (filters.price_min) {
      currentParams.set('price_min', filters.price_min.toString());
    }

    if (filters.price_max) {
      currentParams.set('price_max', filters.price_max.toString());
    }

    if (page > 0) {
      currentParams.set('page', page.toString());
    }

    const newUrl =
      window.location.pathname +
      (currentParams.toString() ? '?' + currentParams.toString() : '');

    window.history.pushState({}, '', newUrl);
  }, [page, filters]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleFilterChange = (newFilters: ProductFilters) => {
    setFilters(newFilters);
    setPage(0);
  };

  const totalPages = 5;

  return {
    page,
    setPage,
    filters,
    setFilters,
    products,
    isLoading,
    isError,
    totalPages,
    handlePageChange,
    handleFilterChange,
  };
};
