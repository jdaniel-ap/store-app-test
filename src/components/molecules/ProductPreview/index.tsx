import { ProductImage } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import type { Product } from '@/services';
import { t } from 'i18next';

interface ProductPreviewProps {
  product: Omit<
    Product,
    'id' | 'createdAt' | 'updatedAt' | 'creationAt' | 'category'
  >;
}

function ProductPreview({ product }: ProductPreviewProps) {
  const { title, description, price, images } = product;
  const imagePreview = images.length > 0 ? images[images.length - 1] : '';

  return (
    <aside className="hidden lg:block">
      <h2 className="mb-6 text-2xl font-semibold text-white">
        {t('pages.publishProduct.preview')}
      </h2>

      <div className="bg-accent rounded-lg p-6 shadow-lg">
        <div className="mb-4 aspect-auto overflow-hidden rounded-lg bg-gray-100">
          {imagePreview ? (
            <ProductImage
              src={imagePreview}
              alt="Product preview"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              {t('pages.publishProduct.noImagePreview')}
            </div>
          )}
        </div>

        <h3 className="text-foreground mb-2 text-lg font-semibold">
          {title || t('pages.publishProduct.productTitlePreview')}
        </h3>

        <p className="mb-4 text-sm text-gray-600">
          {description || t('pages.publishProduct.descriptionPreview')}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-primary text-xl font-bold">
            ${(price || 0).toFixed(2)}
          </span>
          <Button disabled className="cursor-not-allowed opacity-50">
            {t('products.addToCart')}
          </Button>
        </div>
      </div>
    </aside>
  );
}

export default ProductPreview;
