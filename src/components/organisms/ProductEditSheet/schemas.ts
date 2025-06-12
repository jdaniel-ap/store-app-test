import { z } from 'zod';
import i18n from '@/i18n';

const getTranslation = (path: string): string => {
  return i18n.t(path);
};

export const createEditProductSchema = () => {
  return z.object({
    title: z
      .string()
      .min(1, getTranslation('validation.title.required'))
      .min(3, getTranslation('validation.title.min'))
      .max(100, getTranslation('validation.title.max')),

    description: z
      .string()
      .min(1, getTranslation('validation.description.required'))
      .min(10, getTranslation('validation.description.min'))
      .max(500, getTranslation('validation.description.max')),

    price: z
      .number()
      .min(0.01, getTranslation('validation.price.min'))
      .max(999999, getTranslation('validation.price.max')),

    categoryId: z
      .number()
      .min(1, getTranslation('validation.category.required')),

    images: z
      .array(z.string().url(getTranslation('validation.images.url')))
      .min(1, getTranslation('validation.images.min'))
      .max(5, getTranslation('validation.images.max')),
  });
};

export const editProductSchema = createEditProductSchema();

export type EditProductFormData = z.infer<typeof editProductSchema>;
