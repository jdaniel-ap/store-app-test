import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslation } from 'react-i18next';
import { Mail, Lock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FormField } from '@/components/molecules';
import { useAuthStore } from '@/stores';
import type { LoginCredentials } from '@/services';
import { createSignInSchema, type SignInFormData } from './schemas';

function SignInDialog({ children }: PropsWithChildren) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error, clearError } = useAuthStore();

  const signInSchema = createSignInSchema(t);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignInFormData) => {
    try {
      clearError();
      await login(data as LoginCredentials);
      setOpen(false);
      reset();
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
      clearError();
      setShowPassword(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="text-center text-2xl font-semibold">
            {t('pages.login.title')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            {t('pages.login.subtitle')}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-4"
          data-testid="sign-in-form"
        >
          <FormField
            id="email"
            label={t('pages.login.email')}
            type="email"
            placeholder="seu@email.com"
            icon={Mail}
            register={register('email')}
            error={errors.email}
            required
          />
          <FormField
            id="password"
            label={t('pages.login.password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            icon={Lock}
            register={register('password')}
            error={errors.password}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            }
          />
          {error && (
            <div className="bg-destructive/10 border-destructive/20 rounded-md border p-3">
              <p className="text-destructive flex items-center gap-2 text-sm">
                <AlertCircle className="h-4 w-4 flex-shrink-0" />
                {error}
              </p>
            </div>
          )}
          <Button
            data-testid="sign-in-submit"
            type="submit"
            className="w-full"
            disabled={isLoading}
            size="lg"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                {t('pages.login.loading')}
              </div>
            ) : (
              t('pages.login.submit')
            )}
          </Button>
        </form>

        <div className="bg-muted/50 border-muted mt-6 rounded-lg border p-4">
          <h4 className="text-muted-foreground mb-2 text-sm font-medium">
            Demo Credentials:
          </h4>
          <div className="text-muted-foreground space-y-1 text-xs">
            <p>
              <strong>Email:</strong> john@mail.com
            </p>
            <p>
              <strong>Password:</strong> changeme
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
