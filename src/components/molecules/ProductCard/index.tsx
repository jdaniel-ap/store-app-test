import { useTranslation } from 'react-i18next';
import { ProductImage } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/stores';
import type { Product } from '@/services';
import { Check, Minus, Plus } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const { addItem, items, updateQuantity, removeItem } = useCartStore();

  // Verificar si el producto está en el carrito
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

  return (
    <article
      key={product.id}
      className="bg-accent overflow-hidden rounded-lg shadow-md transition-shadow duration-300 hover:shadow-lg"
    >
      <figure className="relative aspect-square">
        <ProductImage
          src={product.images[0]}
          alt={`${product.title} - Product image`}
          className="h-full w-full object-cover"
        />
        {product.category && (
          <span className="bg-primary absolute top-2 left-2 rounded-md px-2 py-1 text-xs text-white">
            {product.category.name}
          </span>
        )}
      </figure>

      <div className="p-4">
        <header>
          <h3 className="text-foreground mb-2 line-clamp-1 text-lg font-semibold">
            {product.title}
          </h3>
        </header>

        <p className="mb-3 line-clamp-1 text-sm text-gray-200">
          {product.description}
        </p>

        <footer className="flex flex-col gap-3">
          <span className="text-xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>

          {!isInCart ? (
            <Button
              type="button"
              className="w-full gap-2 rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
              onClick={handleAddToCart}
              aria-label={`Add ${product.title} to cart`}
            >
              {t('products.addToCart')}
            </Button>
          ) : (
            <div className="flex justify-between">
              <div className="flex items-center justify-center gap-1 text-xs text-green-600">
                <Check className="h-3 w-3" />
                <span>{t('products.inCart')}</span>
              </div>
              <div className="flex items-center gap-1 rounded-md border bg-white">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  aria-label={`Decrease quantity of ${product.title}`}
                  className="h-8 w-8 p-0 text-gray-600"
                >
                  <Minus className="h-4 w-4" />
                </Button>

                <span className="min-w-[2rem] text-center text-sm font-medium text-gray-900">
                  {quantity}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  aria-label={`Increase quantity of ${product.title}`}
                  className="h-8 w-8 p-0 text-gray-600"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </footer>
      </div>
    </article>
  );
}

export default ProductCard;
