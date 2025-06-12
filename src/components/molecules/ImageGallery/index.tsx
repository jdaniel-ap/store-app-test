import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ProductImage } from '@/components/atoms';

interface ImageGalleryProps {
  images: string[];
  title: string;
}

function ImageGallery({ images, title }: ImageGalleryProps) {
  const [currentImage, setCurrentImage] = useState(0);

  const handlePrevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative">
      <div className="aspect-square overflow-hidden rounded-lg">
        <ProductImage
          src={images[currentImage]}
          alt={`${title} - Product image ${currentImage + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevImage}
            className="bg-primary/70 hover:bg-primary absolute top-1/2 left-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextImage}
            className="bg-primary/70 hover:bg-primary absolute top-1/2 right-2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-white transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-5 gap-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`overflow-hidden rounded-md border-2 ${
                index === currentImage ? 'border-primary' : 'border-transparent'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <ProductImage
                src={image}
                alt={`${title} - Thumbnail ${index + 1}`}
                className="aspect-square h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
