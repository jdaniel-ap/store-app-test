import { useState } from 'react';
import EmptyImage from '@/assets/images/empty.svg?react';

const ProductImage = ({
  src,
  alt,
  className,
}: {
  src?: string;
  alt: string;
  className?: string;
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!src || hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 ${className || ''}`}
      >
        <EmptyImage />
      </div>
    );
  }

  return (
    <div className="relative size-full">
      <img
        src={src}
        alt={alt}
        className={className}
        loading="lazy"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </div>
  );
};
export default ProductImage;
