import { useParams, Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';

import { AppLayout } from '@/components/templates';
import { AppLayoutHeader, ProductDetailsContent } from '@/components/organisms';
import Loader from '@/components/atoms/Loader';
import { ProductNotFound } from '@/components/molecules';
import { productService } from '@/services';

function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', id],
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
          <div className="text-center">
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
      <AppLayoutHeader
        title={t('pages.productDetails.title')}
        subtitle={t('pages.productDetails.subtitle')}
        backLabel={t('common.backToHome')}
        backTo="/"
      />
      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader />
            <h1 className="mt-4 text-white">
              {t('pages.productDetails.loading')}
            </h1>
          </div>
        ) : isError ? (
          <ProductNotFound />
        ) : product ? (
          <ProductDetailsContent product={product} />
        ) : (
          <ProductNotFound />
        )}
      </main>
    </AppLayout>
  );
}

export default ProductDetails;
