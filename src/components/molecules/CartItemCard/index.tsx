import { useCartStore } from '@/stores';
import type { CartItem } from '@/stores';
import { ProductImage } from '@/components/atoms';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { updateQuantity, removeItem } = useCartStore();

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(item.id);
    } else {
      updateQuantity(item.id, newQuantity);
    }
  };

  return (
    <article className="flex gap-4 rounded-lg bg-white p-4 shadow-md transition-shadow duration-300 hover:shadow-lg">
      {/* Imagen del producto */}
      <figure className="h-24 w-24 flex-shrink-0">
        <ProductImage
          src={item.image}
          alt={`${item.title} - Product image`}
          className="h-full w-full rounded-md object-cover"
        />
      </figure>

      {/* Información del producto */}
      <div className="flex flex-1 flex-col justify-between">
        <header>
          <h3 className="line-clamp-2 text-lg font-semibold text-gray-900">
            {item.title}
          </h3>
          {item.category && (
            <span className="text-sm text-blue-600">{item.category.name}</span>
          )}
        </header>

        {/* Precio y controles */}
        <footer className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xl font-bold text-green-600">
              ${item.price.toFixed(2)}
            </span>
            <span className="text-sm text-gray-500">
              ${(item.price * item.quantity).toFixed(2)} total
            </span>
          </div>

          {/* Controles de cantidad */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-md border">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity - 1)}
                aria-label={`Decrease quantity of ${item.title}`}
                className="h-8 w-8 p-0"
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="min-w-[2rem] text-center text-sm font-medium">
                {item.quantity}
              </span>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleQuantityChange(item.quantity + 1)}
                aria-label={`Increase quantity of ${item.title}`}
                className="h-8 w-8 p-0"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.title} from cart`}
              className="h-8 w-8 p-0"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </footer>
      </div>
    </article>
  );
}
