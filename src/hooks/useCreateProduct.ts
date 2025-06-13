import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  productService,
  type CreateProductRequest,
  type Product,
} from '@/services';
import { QUERY_KEYS } from '@/lib/queryKeys';

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, Error, CreateProductRequest>({
    mutationFn: (productData: CreateProductRequest) =>
      productService.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.PRODUCTS],
      });
    },
  });
};
