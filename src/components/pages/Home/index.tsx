import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/templates';
import Loader from '@/components/atoms/Loader';
import { useProductFilters } from '@/hooks';

const ProductList = lazy(() => import('@/components/organisms/ProductList'));
const ProductPagination = lazy(
  () => import('@/components/molecules/Pagination')
);
const FilterProducts = lazy(
  () => import('@/components/molecules/ProductFilters')
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
            <Suspense
              fallback={
                <div className="flex h-32 items-center justify-center">
                  <Loader />
                </div>
              }
            >
              <FilterProducts
                onFilterChange={handleFilterChange}
                initialFilters={filters}
              />
            </Suspense>
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
          ) : products ? (
            <>
              <Suspense
                fallback={
                  <div className="flex h-64 items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <ProductList products={products} />
              </Suspense>

              <Suspense
                fallback={
                  <div className="mt-4 flex h-16 items-center justify-center">
                    <Loader />
                  </div>
                }
              >
                <ProductPagination
                  page={page}
                  onPageChange={handlePageChange}
                  itemCount={products.length}
                  itemsPerPage={MAX_PRODUCTS}
                  totalPages={totalPages}
                />
              </Suspense>
            </>
          ) : null}
        </section>
      </div>
    </AppLayout>
  );
}

export default Home;
