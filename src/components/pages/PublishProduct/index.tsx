import { useState, useEffect, use, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';

import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '@/components/templates';
import { FormField, FormFieldSelect } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import ProductPreview from '@/components/molecules/ProductPreview';
import ProductImageGalery from '@/components/molecules/ProductImageGalery';
import { categoryService, productService } from '@/services';

import {
  createPublishProductSchema,
  type PublishProductFormData,
} from './schemas';
import { toast } from 'sonner';
import Loader from '@/components/atoms/Loader';

const LIMIT_IMAGES = 5;

const categoriesReq = categoryService.getCategories();

function PublishProduct() {
  const [isPending, startTransition] = useTransition();
  const { t, i18n } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [tempImageUrl, setTempImageUrl] = useState<string>('');
  const getSchema = () => createPublishProductSchema();
  const categories = use(categoriesReq);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
    reset,
  } = useForm<PublishProductFormData>({
    resolver: zodResolver(getSchema()),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      categoryId: 1,
      images: [],
    },
  });

  const formValues = watch();
  const images = formValues.images || [];

  const handleAddImage = () => {
    if (tempImageUrl && images.length < LIMIT_IMAGES) {
      const newImages = [...images, tempImageUrl];
      setValue('images', newImages);
      setImagePreview(tempImageUrl);
      setTempImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setValue('images', newImages);
    if (newImages.length === 0) {
      setImagePreview('');
    } else if (imagePreview === images[index]) {
      setImagePreview(newImages[0] || '');
    }
  };

  const onSubmit = (data: PublishProductFormData) => {
    startTransition(async () => {
      try {
        await productService.createProduct({
          title: data.title,
          description: data.description,
          price: data.price,
          categoryId: data.categoryId,
          images: data.images,
        });
        reset();
        setImagePreview('');
        toast.success(
          t('pages.publishProduct.productPublished', {
            title: data.title,
          })
        );
      } catch (error) {
        toast.error(
          t('pages.publishProduct.apiError', {
            reason: error instanceof Error ? error.message : 'Unknown error',
          })
        );
      }
    });
    try {
      console.log('Publishing product:', data);
      reset();
      setImagePreview('');
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  };

  useEffect(() => {
    getSchema();
  }, [i18n.language]);

  if (isPending) {
    return (
      <div className="grid size-full place-content-center bg-black">
        <div className="animate-pulse">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <AppLayout>
      <header className="mb-8 px-4 md:px-20">
        <div className="mb-4 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('navigation.home')}
            </Button>
          </Link>
        </div>

        <h1 className="mb-2 text-4xl font-bold text-white">
          {t('pages.publishProduct.title')}
        </h1>
        <p className="text-lg text-gray-300">
          {t('pages.publishProduct.subtitle')}
        </p>
      </header>
      <main className="container mx-auto px-4 py-8 md:px-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-white">
              {t('pages.publishProduct.productDetails')}
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                id="product-title"
                label={t('pages.publishProduct.productTitle')}
                error={errors.title}
                required
                register={register('title')}
                placeholder={t('pages.publishProduct.titlePlaceholder')}
              />

              <FormField
                id="product-title"
                label={t('pages.publishProduct.description')}
                error={errors.description}
                required
                register={register('description')}
                placeholder={t('pages.publishProduct.descriptionPlaceholder')}
              />
              <FormField
                id="product-price"
                register={register('price', { valueAsNumber: true })}
                type="number"
                label={t('pages.publishProduct.price')}
                error={errors.price}
                required
                placeholder="0.00"
              />

              <FormFieldSelect
                id="product-category"
                label={t('pages.publishProduct.category')}
                options={
                  categories?.map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []
                }
                register={register('categoryId', { valueAsNumber: true })}
                error={errors.categoryId}
                required
              />
              <ProductImageGalery
                errors={errors}
                images={images}
                tempImageUrl={tempImageUrl}
                setTempImageUrl={setTempImageUrl}
                handleAddImage={handleAddImage}
                setImagePreview={setImagePreview}
                handleRemoveImage={handleRemoveImage}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full"
                size="lg"
              >
                {isSubmitting
                  ? t('pages.publishProduct.publishing')
                  : t('pages.publishProduct.publishProduct')}
              </Button>
            </form>
          </section>
          <ProductPreview product={formValues} />
        </div>
      </main>
    </AppLayout>
  );
}

export default PublishProduct;
