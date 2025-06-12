import { useAuthStore } from '@/stores';
import { useTranslation } from 'react-i18next';
import { Header } from '@/components/organisms';

function Home() {
  const { user, isAuthenticated } = useAuthStore();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen">
      <Header />

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
