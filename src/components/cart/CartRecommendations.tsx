import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ProductCard from '../product/ProductCard';
import api from '../../api/axios';
import { Product } from '../../types';

interface CartRecommendationsProps {
  categories: string[];
  excludeIds: string[];
}

const CartRecommendations: React.FC<CartRecommendationsProps> = ({ categories, excludeIds }) => {
  const { t } = useTranslation();
  
  const uniqueCategories = Array.from(new Set(categories));

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ['cart-recommendations', uniqueCategories],
    queryFn: async () => {
      const allProducts: Product[] = [];
      
      // Fetch products for each category
      for (const category of uniqueCategories) {
        const { data } = await api.get('/products', {
          params: { category, limit: 10 }
        });
        const products = data.data ? data.data : data;
        allProducts.push(...products);
      }
      
      // Filter out products already in cart and duplicates
      const filtered = allProducts.filter(p => !excludeIds.includes(p.id));
      
      // Remove duplicates (in case a product is in multiple categories)
      const seen = new Set();
      const finalProducts = filtered.filter(p => {
        const duplicate = seen.has(p.id);
        seen.add(p.id);
        return !duplicate;
      });

      // Shuffle and prioritize onSale products, then limit to 4 products for better variety
      return finalProducts
        .sort(() => 0.5 - Math.random()) // Shuffle first
        .sort((a, b) => (b.onSale ? 1 : 0) - (a.onSale ? 1 : 0)) // Prioritize onSale
        .slice(0, 4);
    },
    enabled: uniqueCategories.length > 0,
    staleTime: 1000 * 60 * 5 // Cache for 5 minutes
  });

  const { data: globalOffers, isLoading: isOffersLoading } = useQuery({
    queryKey: ['global-offers'],
    queryFn: async () => {
      const { data } = await api.get('/products', {
        params: { limit: 10 }
      });
      const products = data.data ? data.data : data;
      // Filter for those with offers and not in cart
      return products
        .filter((p: Product) => p.onSale && !excludeIds.includes(p.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
    },
    staleTime: 1000 * 60 * 5
  });

  if (isLoading || isOffersLoading) {
    return (
      <div className="mt-16 mb-12">
        <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="animate-pulse bg-gray-100 rounded-2xl aspect-[4/5] w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  if ((!recommendations || recommendations.length === 0) && (!globalOffers || globalOffers.length === 0)) {
    return null;
  }

  return (
    <div className="space-y-16 mt-16 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {recommendations && recommendations.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight relative">
              {t('cart.you_may_also_like')}
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-blue-600 rounded-full"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {globalOffers && globalOffers.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-8 overflow-hidden">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight relative">
              {t('cart.special_offers')}
              <span className="absolute -bottom-1 left-0 w-12 h-1 bg-red-600 rounded-full"></span>
            </h2>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
            {globalOffers.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default CartRecommendations;
