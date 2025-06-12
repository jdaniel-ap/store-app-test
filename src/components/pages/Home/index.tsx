import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/templates';
import { productService } from '@/services';
import { useQuery } from '@tanstack/react-query';
import ProductList from '@/components/organisms/ProductList';
import Loader from '@/components/atoms/Loader';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

const MAX_PRODUCTS = 10;

function Home() {
  const { t } = useTranslation();
  const [page, setPage] = useState(0);

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['products', page, MAX_PRODUCTS],
    queryFn: () => productService.getProducts(page, MAX_PRODUCTS),
  });

  return (
    <AppLayout>
      <main className="container mx-auto px-4 py-8">
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
            {/*TODO: aqui van los filtros debjo de esto, campo de texto y categoria */}
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
              <ProductList products={products} />
              <div className="mt-8 flex flex-col items-center space-y-4">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setPage(Math.max(0, page - 1))}
                        className={
                          page === 0 ? 'pointer-events-none opacity-50' : ''
                        }
                      />
                    </PaginationItem>

                    {[...Array(5)].map((_, i) => (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={page === i}
                          onClick={() => setPage(i)}
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext onClick={() => setPage(page + 1)} />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
                <p className="text-sm text-gray-400">
                  {t('pages.home.showingPage', {
                    page: page + 1,
                    products: products.length,
                    offset: page * MAX_PRODUCTS + 1,
                    to: page * MAX_PRODUCTS + products.length,
                  })}
                </p>
              </div>
            </>
          ) : null}
        </section>
      </main>
    </AppLayout>
  );
}

export default Home;
