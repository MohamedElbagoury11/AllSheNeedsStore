import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { useTranslation } from 'react-i18next';

// For a real app, you would use React Query here similarly to Products.tsx
const SearchResults = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="py-12 min-h-[60vh] flex flex-col items-center justify-center text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6 text-gray-400">
        <Search size={40} />
      </div>
      <h2 className="text-3xl font-bold text-gray-900 mb-2">
        {query ? t('products.no_results_for', { query }) : t('products.enter_search')}
      </h2>
      <p className="text-gray-500 mb-8 max-w-md">
        {t('products.search_empty_desc')}
      </p>
      <Link to="/products">
        <Button size="lg" className="rounded-full px-8">{t('products.browse_all')}</Button>
      </Link>
    </div>
  );
};

export default SearchResults;
