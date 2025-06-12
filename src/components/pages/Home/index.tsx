import Logo from '@/assets/images/logos/colorfull-logo.svg?react';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/atoms/LanguageSwitcher';
import { useAuthStore } from '@/stores';
import { Menu } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <header className="flex h-24 w-full items-center justify-between px-4 lg:px-20">
        <Logo className="h-20 w-40" />
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          {isAuthenticated && user ? (
            <Button
              variant="outline"
              size="lg"
              className="block h-16 w-16 lg:hidden"
            >
              <Menu className="size-8 text-white" />
            </Button>
          ) : (
            <Button>{t('navigation.login')}</Button>
          )}
        </div>
      </header>

      <section className="flex flex-col items-center justify-center px-4 py-20">
        <h1 className="mb-4 text-center text-4xl font-bold">
          {t('pages.home.welcome')}
        </h1>
        {isAuthenticated && user && (
          <p className="text-xl text-gray-600">
            {t('auth.welcome', { name: user.name })}
          </p>
        )}
      </section>
    </main>
  );
}

export default Home;
