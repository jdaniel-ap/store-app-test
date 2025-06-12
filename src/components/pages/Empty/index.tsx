import BlackHole from '@/assets/images/black-hole.svg?react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

function Empty() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="flex size-full flex-col items-center justify-center lg:flex-col">
      <BlackHole className="size-96" />
      <h1 className="mt-4 text-2xl font-bold">{t('pages.empty.title')}</h1>
      <p className="mt-2 mb-2 text-gray-600">{t('pages.empty.message')}</p>
      <Button onClick={() => navigate('/')}>{t('navigation.home')}</Button>
    </main>
  );
}

export default Empty;
