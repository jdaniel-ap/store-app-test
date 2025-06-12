import { ProductImage } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import type { Product } from '@/services';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
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

        <footer className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">
            ${product.price.toFixed(2)}
          </span>
          <Button
            type="button"
            className="rounded-md px-4 py-2 text-sm font-medium text-white transition-colors duration-200"
            aria-label={`Add ${product.title} to cart`}
          >
            Add to Cart
          </Button>
        </footer>
      </div>
    </article>
  );
}

export default ProductCard;
