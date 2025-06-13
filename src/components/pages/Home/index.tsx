import { lazy } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/templates';
import { SuspenseWrapper } from '@/components/atoms';
import Loader from '@/components/atoms/Loader';
import { useProductFilters } from '@/hooks';

const ProductList = lazy(() => import('@/components/organisms/ProductList'));
const ProductPagination = lazy(
  () => import('@/components/molecules/Pagination')
);
const FilterProducts = lazy(
  () => import('@/components/molecules/ProductFilters')
);
const NoProductsMessage = lazy(
  () => import('@/components/molecules/NoProductsMessage')
);

const MAX_PRODUCTS = 10;

function Home() {
  const { t } = useTranslation();
  const {
    page,
    filters,
    products,
    isLoading,
    isError,
    totalPages,
    handleFilterChange,
    handlePageChange,
  } = useProductFilters({ itemsPerPage: MAX_PRODUCTS });

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <section aria-labelledby="products-heading" className="px-4 md:px-20">
          <div>
            <div className="mb-8 text-left">
              <h2
                id="products-heading"
                className="mb-2 text-3xl font-bold text-white"
              >
                {t('pages.home.featuredProducts')}
              </h2>
              <p className="text-lg text-gray-300">
                {t('pages.home.featuredProductsSubtitle')}
              </p>
            </div>
            <SuspenseWrapper>
              <FilterProducts
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </SuspenseWrapper>
          </div>
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader />
              <h1 className="mt-4 text-white">
                {t('pages.home.loadingProducts')}
              </h1>
            </div>
          ) : isError ? (
            <div className="flex flex-col items-center justify-center py-20">
              <h1 className="text-destructive text-xl">
                {t('errors.generic')}
              </h1>
            </div>
          ) : products && products.length > 0 ? (
            <>
              <SuspenseWrapper fallbackHeight="h-64">
                <ProductList products={products} />
              </SuspenseWrapper>

              <SuspenseWrapper fallbackHeight="h-16" className="mt-4">
                <ProductPagination
                  page={page}
                  onPageChange={handlePageChange}
                  itemCount={products.length}
                  itemsPerPage={MAX_PRODUCTS}
                  totalPages={totalPages}
                />
              </SuspenseWrapper>
            </>
          ) : (
            <SuspenseWrapper>
              <NoProductsMessage />
            </SuspenseWrapper>
          )}
        </section>
      </div>
    </AppLayout>
  );
}

export default Home;
