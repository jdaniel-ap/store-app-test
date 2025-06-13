import { useQuery } from '@tanstack/react-query';
import { categoryService, type Category } from '@/services';
import { QUERY_KEYS } from '@/lib/queryKeys';

const FIVE_MINUTES_IN_MS = 5 * 60 * 1000;
const TEN_MINUTES_IN_MS = 10 * 60 * 1000;

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: () => categoryService.getCategories(),
    staleTime: FIVE_MINUTES_IN_MS,
    gcTime: TEN_MINUTES_IN_MS,
  });
};
