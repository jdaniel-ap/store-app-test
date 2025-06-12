import { Link } from 'react-router';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ProductNotFound() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <AlertCircle className="text-destructive mb-4 h-16 w-16" />
      <h2 className="mb-2 text-2xl font-bold text-white">
        {t('errors.productNotFound')}
      </h2>
      <p className="mb-6 text-gray-400">{t('errors.generic')}</p>
      <Link to="/">
        <Button variant="default" className="gap-2">
          {t('common.backToHome')}
        </Button>
      </Link>
    </div>
  );
}

export default ProductNotFound;
