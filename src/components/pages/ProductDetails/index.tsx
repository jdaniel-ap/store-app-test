import { lazy } from 'react';
import { useParams, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { AppLayout } from '@/components/templates';
import { SuspenseWrapper } from '@/components/atoms';
import Loader from '@/components/atoms/Loader';
import { productService } from '@/services';
import { QUERY_KEYS } from '@/lib/queryKeys';

const AppLayoutHeader = lazy(
  () => import('@/components/organisms/AppLayoutHeader')
);
const ProductDetailsContent = lazy(
  () => import('@/components/organisms/ProductDetailsContent')
);
const ProductNotFound = lazy(
  () => import('@/components/molecules/ProductNotFound')
);

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PRODUCT, id],
    queryFn: () =>
      id
        ? productService.getProductById(parseInt(id))
        : Promise.reject('No ID provided'),
    enabled: !!id,
  });

  if (!id) {
    return (
      <AppLayout>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center" data-testid="no-id-error">
            <h1 className="text-2xl font-bold text-white">
              {t('errors.productNotFound')}
            </h1>
            <Link to="/" className="text-primary mt-4 inline-block">
              {t('common.backToHome')}
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <SuspenseWrapper fallbackHeight="h-20">
        <AppLayoutHeader
          title={t('pages.productDetails.title')}
          subtitle={t('pages.productDetails.subtitle')}
          backLabel={t('common.backToHome')}
          backTo="/"
        />
      </SuspenseWrapper>
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <h1 className="mt-4 text-white">
              {t('pages.productDetails.loading')}
            </h1>
          </div>
        ) : isError ? (
          <SuspenseWrapper fallbackHeight="h-64">
            <ProductNotFound />
          </SuspenseWrapper>
        ) : product ? (
          <SuspenseWrapper fallbackHeight="h-96">
            <ProductDetailsContent product={product} />
          </SuspenseWrapper>
        ) : (
          <SuspenseWrapper fallbackHeight="h-64">
            <ProductNotFound />
          </SuspenseWrapper>
        )}
      </main>
    </AppLayout>
  );
}

export default ProductDetails;
