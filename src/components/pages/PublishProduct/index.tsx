import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { AppLayout } from '@/components/templates';
import { FormField, FormFieldSelect } from '@/components/molecules';
import { Button } from '@/components/ui/button';
import {
  createPublishProductSchema,
  type PublishProductFormData,
} from './schemas';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router';
import ProductPreview from '@/components/molecules/ProductPreview';
import ProductImageGalery from '@/components/molecules/ProductImageGalery';

function PublishProduct() {
  const { t, i18n } = useTranslation();
  const [imagePreview, setImagePreview] = useState<string>('');
  const [tempImageUrl, setTempImageUrl] = useState<string>('');

  // Create a dynamic schema that updates when the language changes
  const getSchema = () => createPublishProductSchema();

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

  // Update the form validation when language changes
  useEffect(() => {
    // This will trigger re-validation with the new language when the user interacts with the form
    getSchema();
    // Note: The actual re-validation happens on the next interaction with the form
  }, [i18n.language]);

  const formValues = watch();
  const images = formValues.images || [];

  const handleAddImage = () => {
    if (tempImageUrl && images.length < 5) {
      const newImages = [...images, tempImageUrl];
      setValue('images', newImages);
      if (!imagePreview) {
        setImagePreview(tempImageUrl);
      }
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

  const onSubmit = async (data: PublishProductFormData) => {
    try {
      console.log('Publishing product:', data);
      reset();
      setImagePreview('');
    } catch (error) {
      console.error('Error publishing product:', error);
    }
  };

  return (
    <AppLayout>
      <main className="container mx-auto px-4 py-8 md:px-20">
        <header className="mb-8">
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
                options={[
                  { value: 1, label: 'Electronics' },
                  { value: 2, label: 'Clothing' },
                  { value: 3, label: 'Books' },
                  { value: 4, label: 'Home & Garden' },
                  { value: 5, label: 'Sports' },
                ]}
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
