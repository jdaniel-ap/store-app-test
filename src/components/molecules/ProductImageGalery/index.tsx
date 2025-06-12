import type { PublishProductFormData } from '@/components/pages/PublishProduct/schemas';
import { Button } from '@/components/ui/button';
import { t } from 'i18next';
import { Plus, X } from 'lucide-react';
import React from 'react';
import type { FieldErrors } from 'react-hook-form';

interface ProductImageGaleryProps {
  images: string[];
  tempImageUrl: string;
  setTempImageUrl: React.Dispatch<React.SetStateAction<string>>;
  handleAddImage: () => void;
  setImagePreview: React.Dispatch<React.SetStateAction<string>>;
  handleRemoveImage: (index: number) => void;
  errors: FieldErrors<PublishProductFormData>;
}

function ProductImageGalery({
  images,
  tempImageUrl,
  setTempImageUrl,
  handleAddImage,
  setImagePreview,
  handleRemoveImage,
  errors,
}: ProductImageGaleryProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-white">
        {t('pages.publishProduct.images')} ({images.length}/5)
      </label>

      <div className="mb-4 flex gap-2">
        <input
          type="url"
          value={tempImageUrl}
          onChange={(e) => setTempImageUrl(e.target.value)}
          className="text-foreground flex-1 rounded-md border border-gray-300 px-3 py-2"
          placeholder={t('pages.publishProduct.imageUrlPlaceholder')}
        />
        <Button
          type="button"
          onClick={handleAddImage}
          disabled={!tempImageUrl || images.length >= 5}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          {t('pages.publishProduct.addImage')}
        </Button>
      </div>

      {images.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {images.map((url, index) => (
            <div key={index} className="relative">
              <img
                src={url}
                alt={`Preview ${index + 1}`}
                className="h-16 w-16 cursor-pointer rounded border object-cover"
                onClick={() => setImagePreview(url)}
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute -top-1 -right-1 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {errors.images && (
        <p className="text-sm text-red-600">{errors.images.message}</p>
      )}
    </div>
  );
}

export default ProductImageGalery;
