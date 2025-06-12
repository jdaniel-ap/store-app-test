import { z } from 'zod';

export const createSignInSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .email(t('pages.login.emailInvalid'))
      .min(1, t('pages.login.emailRequired'))
      .email(t('pages.login.emailInvalid')),
    password: z
      .string()
      .min(1, t('pages.login.passwordRequired'))
      .min(6, t('pages.login.passwordMin'))
      .max(100, t('pages.login.passwordMax')),
  });

export type SignInFormData = z.infer<ReturnType<typeof createSignInSchema>>;
