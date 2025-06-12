import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';
import { useCartStore } from '@/stores';
import { AppLayout } from '@/components/templates';
import { CartItemCard } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

function Cart() {
  const { t } = useTranslation();
  const { items, totalPrice, totalItems, clearCart } = useCartStore();

  const isEmpty = items.length === 0;

  return (
    <AppLayout>
      <main className="container mx-auto px-8 py-8 md:px-20">
        <header className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-white">
            {t('pages.cart.title')}
          </h1>
          <p className="text-lg text-gray-300">{t('pages.cart.subtitle')}</p>

          {!isEmpty && (
            <p className="mt-2 text-sm text-gray-400">
              {t('pages.cart.itemsInCart', { count: totalItems })}
            </p>
          )}
        </header>

        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-20">
            <div className="max-w-md text-center">
              <ShoppingBag className="mx-auto mb-4 h-16 w-16 text-gray-400" />
              <h2 className="mb-2 text-2xl font-semibold text-white">
                {t('pages.cart.empty')}
              </h2>
              <p className="mb-6 text-gray-300">
                {t('pages.cart.emptySubtitle')}
              </p>
              <Link to="/">
                <Button className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  {t('pages.cart.continueShopping')}
                </Button>
              </Link>
            </div>
          </section>
        ) : (
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            {/* Lista de productos */}
            <section className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </section>

            {/* Resumen del carrito */}
            <aside className="lg:col-span-1">
              <div className="sticky top-8 rounded-lg bg-white p-6 shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-gray-900">
                  Order Summary
                </h3>

                <div className="mb-6 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      Subtotal ({totalItems} items)
                    </span>
                    <span className="font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">Free</span>
                  </div>
                  <hr />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>{t('pages.cart.total')}</span>
                    <span className="text-green-600">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button className="w-full" size="lg">
                    {t('pages.cart.checkout')}
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        )}
      </main>
    </AppLayout>
  );
}

export default Cart;
