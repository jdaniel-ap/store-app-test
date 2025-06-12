import { use } from 'react';

import { ProductCard } from '@/components/molecules';
import type { Product } from '@/services';

interface ProductListProps {
  promiseList: Promise<Product[]>;
}
function ProductList({ promiseList }: ProductListProps) {
  const products = use(promiseList);
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
}

export default ProductList;
