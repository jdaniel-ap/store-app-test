import { useTranslation } from 'react-i18next';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface ProductPaginationProps {
  page: number;
  onPageChange: (page: number) => void;
  itemCount: number;
  itemsPerPage: number;
  totalPages?: number;
}

function ProductPagination({
  page,
  onPageChange,
  itemCount,
  itemsPerPage,
  totalPages = 5,
}: ProductPaginationProps) {
  const { t } = useTranslation();

  return (
    <div className="mt-8 flex flex-col items-center space-y-4">
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange(Math.max(0, page - 1))}
              className={page === 0 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                isActive={page - 1 === i}
                onClick={() => onPageChange(i)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext onClick={() => onPageChange(page + 1)} />
          </PaginationItem>
        </PaginationContent>
      </ShadcnPagination>
      <p className="text-sm text-gray-400">
        {t('pages.home.showingPage', {
          page: page + 1,
          products: itemCount,
          offset: page * itemsPerPage + 1,
          to: page * itemsPerPage + itemCount,
        })}
      </p>
    </div>
  );
}

export default ProductPagination;
