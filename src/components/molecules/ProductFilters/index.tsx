import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchIcon, X, ChevronDown, ChevronUp } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ProductFilters } from '@/services';

interface ProductFiltersProps {
  onFilterChange: (filters: ProductFilters) => void;
  initialFilters?: ProductFilters;
  className?: string;
}

function FilterProducts({
  onFilterChange,
  initialFilters = {},
  className = '',
}: ProductFiltersProps) {
  const { t } = useTranslation();
  const [title, setTitle] = useState<string>(initialFilters.title || '');
  const [priceMin, setPriceMin] = useState<number | undefined>(
    initialFilters.price_min
  );
  const [priceMax, setPriceMax] = useState<number | undefined>(
    initialFilters.price_max
  );
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const handleApplyFilters = () => {
    const filters: ProductFilters = {};

    if (title) {
      filters.title = title;
    }

    if (priceMin) {
      filters.price_min = priceMin;
    }

    if (priceMax) {
      filters.price_max = priceMax;
    }

    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    setTitle('');
    setPriceMin(undefined);
    setPriceMax(undefined);
    onFilterChange({});
  };

  return (
    <div
      className={`mb-8 rounded-md bg-gray-800 p-4 ${className}`}
      data-testid="product-filters"
    >
      <div
        className="mb-4 flex cursor-pointer items-center justify-between"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <h3 className="text-lg font-medium text-white">
          {t('pages.home.filters.title')}
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2"
          data-testid="filters-toggle"
        >
          {isCollapsed ? (
            <>
              <ChevronDown className="h-4 w-4" />
              {t('pages.home.filters.toggleFilters')}
            </>
          ) : (
            <>
              <ChevronUp className="h-4 w-4" />
              {t('pages.home.filters.toggleFilters')}
            </>
          )}
        </Button>
      </div>

      {!isCollapsed && (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="title" className="mb-1 block">
                {t('pages.home.filters.searchByName')}
              </Label>
              <div className="relative">
                <SearchIcon className="absolute top-2.5 left-2 h-4 w-4 text-gray-400" />
                <Input
                  id="title"
                  placeholder={t('pages.home.filters.searchPlaceholder')}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="pl-8"
                  data-testid="category-filter"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="priceMin" className="mb-1 block">
                {t('pages.home.filters.minPrice')}
              </Label>
              <Input
                id="priceMin"
                type="number"
                placeholder={t('pages.home.filters.minPricePlaceholder')}
                value={priceMin || ''}
                onChange={(e) =>
                  setPriceMin(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                min={0}
              />
            </div>

            <div>
              <Label htmlFor="priceMax" className="mb-1 block">
                {t('pages.home.filters.maxPrice')}
              </Label>
              <Input
                id="priceMax"
                type="number"
                placeholder={t('pages.home.filters.maxPricePlaceholder')}
                value={priceMax || ''}
                onChange={(e) =>
                  setPriceMax(
                    e.target.value ? parseInt(e.target.value) : undefined
                  )
                }
                min={0}
              />
            </div>
          </div>

          <div className="mt-4 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleClearFilters}
              className="gap-1"
            >
              <X className="h-4 w-4" />
              {t('pages.home.filters.clear')}
            </Button>
            <Button size="sm" onClick={handleApplyFilters}>
              {t('pages.home.filters.apply')}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default FilterProducts;
