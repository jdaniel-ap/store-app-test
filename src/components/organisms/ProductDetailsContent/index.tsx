import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router';
import { ShoppingCart, Edit, Trash, ShoppingBag } from 'lucide-react';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

import { Button } from '@/components/ui/button';
import { ImageGallery } from '@/components/molecules';
import { ConfirmDialog, ProductEditSheet } from '@/components/organisms';
import type { Product } from '@/services';
import { productService } from '@/services';
import { useAuthStore, useCartStore } from '@/stores';

interface ProductDetailsContentProps {
  product: Product;
}

function ProductDetailsContent({ product }: ProductDetailsContentProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isAuthenticated } = useAuthStore();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  const cartItem = items.find((item) => item.id === product.id);
  const isInCart = !!cartItem;
  const quantity = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images[0],
      category: product.category,
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, newQuantity);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      await productService.deleteProduct(product.id);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success(t('pages.productDetails.productDeleted'));
      navigate('/');
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error(t('pages.productDetails.productDeleteFailed'));
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 px-8 md:grid-cols-2 md:px-20">
      <div className="overflow-hidden rounded-lg">
        <ImageGallery images={product.images} title={product.title} />
      </div>
      <div className="flex flex-col">
        {product.category && (
          <span className="bg-primary mb-2 inline-block w-fit rounded-md px-2 py-1 text-xs text-white">
            {product.category.name}
          </span>
        )}
        <h1 className="mb-4 text-3xl font-bold text-white">{product.title}</h1>
        <div className="mb-6">
          <span className="text-2xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <div className="mb-8">
          <h2 className="mb-2 text-xl font-semibold text-white">
            {t('pages.productDetails.description')}
          </h2>
          <p className="text-gray-300">{product.description}</p>
        </div>
        <div className="mb-4 space-y-3">
          {!isInCart ? (
            <Button
              type="button"
              className="w-full gap-2"
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
              data-testid="add-to-cart-button"
            >
              <ShoppingCart className="h-5 w-5" />
              {t('products.addToCart')}
            </Button>
          ) : (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-green-500">
                  {t('products.inCart')}
                </span>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="bg-primary/20 hover:bg-primary/30 flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors"
                    aria-label={`Decrease quantity of ${product.title}`}
                  >
                    -
                  </button>
                  <span className="text-white">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="bg-primary/20 hover:bg-primary/30 flex h-8 w-8 items-center justify-center rounded-md text-white transition-colors"
                    aria-label={`Increase quantity of ${product.title}`}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          )}
          <Link to="/cart">
            <Button
              type="button"
              variant="outline"
              className="w-full gap-2"
              aria-label="Go to shopping cart"
              data-testid="go-to-cart-button"
            >
              <ShoppingBag className="h-5 w-5" />
              {t('products.goToCart')}
            </Button>
          </Link>
        </div>
        {isAuthenticated && (
          <div className="mt-6 space-y-4">
            <ConfirmDialog
              title={t('pages.productDetails.deleteConfirmTitle')}
              description={t('pages.productDetails.deleteConfirmDescription')}
              confirmLabel={t('common.confirm')}
              cancelLabel={t('common.cancel')}
              variant="destructive"
              mainAction={handleDeleteProduct}
            >
              <Button
                type="button"
                variant="destructive"
                className="w-full gap-2"
                aria-label={`Delete ${product.title}`}
                data-testid="delete-product-button"
              >
                <Trash className="h-5 w-5" />
                {t('products.delete')}
              </Button>
            </ConfirmDialog>
            <ProductEditSheet
              product={product}
              onUpdate={() => {
                queryClient.invalidateQueries({
                  queryKey: ['product', product.id.toString()],
                });
              }}
            >
              <Button
                type="button"
                className="w-full gap-2"
                aria-label={`Edit ${product.title}`}
                data-testid="edit-product-button"
              >
                <Edit className="h-5 w-5" />
                {t('products.edit')}
              </Button>
            </ProductEditSheet>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductDetailsContent;
