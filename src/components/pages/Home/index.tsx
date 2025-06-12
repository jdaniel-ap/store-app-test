import { useAuthStore } from '@/stores';
import { useTranslation } from 'react-i18next';
import { AppLayout } from '@/components/templates';
import { productService } from '@/services';
import { Suspense } from 'react';
import ProductList from '@/components/organisms/ProductList';
import { AppLayoutHeader } from '@/components/organisms';
import Loader from '@/components/atoms/Loader';

const productsReq = productService.getProducts(10, 10);

function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();
  return (
    <AppLayout>
      <main className="container mx-auto px-4 py-8">
        <AppLayoutHeader
          title={t('pages.home.welcome')}
          subtitle={
            isAuthenticated && user
              ? t('auth.welcome', { name: user.name || 'User' })
              : undefined
          }
          className="mb-12"
          center
        />

        <section aria-labelledby="products-heading" className="px-4 md:px-20">
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
              <div className="flex flex-col items-center justify-center py-20">
                <Loader />
                <h1 className="mt-4 text-white">
                  {t('pages.home.loadingProducts')}
                </h1>
              </div>
            }
          >
            <ProductList promiseList={productsReq} />
          </Suspense>
        </section>
      </main>
    </AppLayout>
  );
}

export default Home;
