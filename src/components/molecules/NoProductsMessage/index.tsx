import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';

function NoProductsMessage() {
  const { t } = useTranslation();

  return (
    <div
      className="flex flex-col items-center justify-center py-16 text-center"
      data-testid="no-products-message"
    >
      <Package className="mb-4 h-16 w-16 text-gray-400" />
      <h2 className="mb-2 text-2xl font-bold text-white">
        {t('pages.home.noProducts')}
      </h2>
      <p className="text-gray-400">{t('pages.home.noProductsMessage')}</p>
    </div>
  );
}

export default NoProductsMessage;
