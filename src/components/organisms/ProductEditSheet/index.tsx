import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Loader2, Save } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules/FormField';
import { FormFieldSelect } from '@/components/molecules/FormFieldSelect';
import {
  type Category,
  categoryService,
  productService,
  type Product,
} from '@/services';
import { editProductSchema, type EditProductFormData } from './schemas';

interface ProductEditSheetProps {
  product: Product;
  onUpdate: () => void;
  children: React.ReactNode;
}

function ProductEditSheet({
  product,
  onUpdate,
  children,
}: ProductEditSheetProps) {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<EditProductFormData>({
    resolver: zodResolver(editProductSchema),
    defaultValues: {
      title: product.title,
      description: product.description,
      price: product.price,
      categoryId: product.category?.id,
      images: product.images,
    },
  });

  const watchImages = watch('images');

  useEffect(() => {
    reset({
      title: product.title,
      description: product.description,
      price: product.price,
      categoryId: product.category?.id,
      images: product.images,
    });

    const loadCategories = async () => {
      try {
        const data = await categoryService.getCategories();
        setCategories(data);
      } catch (error) {
        console.error('Error loading categories:', error);
        toast.error(t('errors.generic'));
      }
    };

    if (isOpen) {
      loadCategories();
    }
  }, [product, reset, isOpen, t]);

  const onSubmit = async (data: EditProductFormData) => {
    try {
      setIsSubmitting(true);
      await productService.updateProduct(product.id, data);
      toast.success(t('pages.productDetails.productUpdated'));
      onUpdate();
      setIsOpen(false);
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(t('pages.productDetails.productUpdateFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const addImageField = () => {
    const currentImages = [...(watchImages || [])];
    setValue('images', [...currentImages, '']);
  };

  const removeImageField = (index: number) => {
    const currentImages = [...(watchImages || [])];
    currentImages.splice(index, 1);
    setValue('images', currentImages);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-white">
            {t('pages.productDetails.editProduct')}
          </SheetTitle>
          <SheetDescription>
            {t('pages.productDetails.editProductDescription')}
          </SheetDescription>
        </SheetHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-6">
          <FormField
            id="title"
            label={t('pages.publishProduct.productTitle')}
            placeholder={t('pages.publishProduct.titlePlaceholder')}
            register={register('title')}
            error={errors.title}
            required
          />

          <FormField
            id="description"
            label={t('pages.publishProduct.description')}
            placeholder={t('pages.publishProduct.descriptionPlaceholder')}
            register={register('description')}
            error={errors.description}
            required
          />

          <FormField
            id="price"
            label={t('pages.publishProduct.price')}
            type="number"
            register={register('price', { valueAsNumber: true })}
            error={errors.price}
            required
          />

          <FormFieldSelect
            id="categoryId"
            label={t('pages.publishProduct.category')}
            options={categories.map((category) => ({
              value: category.id,
              label: category.name,
            }))}
            register={register('categoryId', { valueAsNumber: true })}
            error={errors.categoryId}
            required
          />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">
                {t('pages.publishProduct.images')}
                <span className="text-destructive ml-1">*</span>
              </label>
              {watchImages && watchImages.length < 5 && (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addImageField}
                  className="text-xs"
                >
                  {t('pages.publishProduct.addImage')}
                </Button>
              )}
            </div>

            {watchImages?.map((_url, index) => (
              <div key={index} className="flex gap-2">
                <div className="flex-1">
                  <input
                    id={`image-${index}`}
                    type="url"
                    placeholder={t('pages.publishProduct.imageUrlPlaceholder')}
                    className="border-input bg-background text-foreground placeholder:text-muted-foreground h-9 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none"
                    {...register(`images.${index}`)}
                  />
                  {errors.images &&
                    Array.isArray(errors.images) &&
                    errors.images[index] && (
                      <p className="text-destructive mt-1 text-sm">
                        {errors.images[index]?.message}
                      </p>
                    )}
                </div>
                {watchImages.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="mt-0 h-9 px-2"
                    onClick={() => removeImageField(index)}
                    aria-label="Remove image field"
                  >
                    &times;
                  </Button>
                )}
              </div>
            ))}
            {errors.images && !Array.isArray(errors.images) && (
              <p className="text-destructive text-sm">
                {errors.images.message}
              </p>
            )}
          </div>

          <SheetFooter>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {t('pages.productDetails.saving')}
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  {t('pages.productDetails.saveChanges')}
                </>
              )}
            </Button>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export default ProductEditSheet;
