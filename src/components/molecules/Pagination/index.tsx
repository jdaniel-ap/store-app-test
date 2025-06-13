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

const MAX_PAGES = 5;

function ProductPagination({
  page,
  onPageChange,
  itemCount,
  itemsPerPage,
  totalPages = MAX_PAGES,
}: ProductPaginationProps) {
  const { t } = useTranslation();

  return (
    <div
      className="mt-8 flex flex-col items-center space-y-4"
      data-testid="pagination"
    >
      <ShadcnPagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page <= 1 ? '#' : `?page=${page - 1}`}
              onClick={(e) => {
                if (page <= 1) return;
                e.preventDefault();
                onPageChange(Math.max(0, page - 1));
              }}
              className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <PaginationLink
                href={`?page=${i + 1}`}
                isActive={page === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href={`?page=${page + 1}`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page + 1);
              }}
            />
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
