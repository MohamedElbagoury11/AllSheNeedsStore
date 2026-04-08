import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/product/ProductCard';
import { SEO } from '../components/common/SEO';
import { PageLoader } from '../components/common/PageLoader';
import { Product } from '../types';
import { Filter, ChevronDown, Check } from 'lucide-react';
import api from '../api/axios';

// API Fetcher
const fetchProducts = async (
  category: string | null, 
  sort: string, 
  search: string | null
): Promise<Product[]> => {
  const { data } = await api.get('/products', {
    params: {
      category: category || undefined,
      sort: sort || undefined,
      search: search || undefined,
    }
  });
  // Handle backend wrapper structure if any
  return data.data ? data.data : data; 
};

const SORTS = ['Newest', 'Price: Low to High', 'Price: High to Low', 'Best Rating'];

const SORT_MAP: Record<string, string> = {
  'Newest': 'newest',
  'Price: Low to High': 'price-asc',
  'Price: High to Low': 'price-desc',
  'Best Rating': 'rating'
};

const Products = () => {
  const { t, i18n } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFilter = searchParams.get('category') || 'All';
  const searchTerm = searchParams.get('search') || '';
  const [sortParam, setSortParam] = useState(SORTS[0]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['products', categoryFilter, sortParam, searchTerm],
    queryFn: () => fetchProducts(
      categoryFilter === 'All' ? null : categoryFilter, 
      SORT_MAP[sortParam] || 'newest', 
      searchTerm
    )
  });

  // client-side filtering as fallback for cases where backend might not handle query params correctly
  const filteredProducts = (products || []).filter((p: any) => {
    // 1. Search filter
    const searchLower = searchTerm.toLowerCase().trim();
    const searchMatches = !searchLower || 
      p.name?.toLowerCase().includes(searchLower) ||
      p.nameEn?.toLowerCase().includes(searchLower) ||
      p.nameAr?.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower) ||
      p.descriptionEn?.toLowerCase().includes(searchLower) ||
      p.descriptionAr?.toLowerCase().includes(searchLower) ||
      p.category?.toLowerCase().includes(searchLower);

    // 2. Category filter
    const catLower = (categoryFilter === 'All' ? '' : categoryFilter).toLowerCase().trim();
    const catMatches = !catLower || 
      p.category?.toLowerCase() === catLower;

    return searchMatches && catMatches;
  });

  // client-side sorting as fallback
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const sortVal = SORT_MAP[sortParam] || 'newest';
    const getSellingPrice = (p: any) => p.onSale && p.discountPrice !== undefined ? p.discountPrice : p.price;
    
    if (sortVal === 'price-asc') return Number(getSellingPrice(a)) - Number(getSellingPrice(b));
    if (sortVal === 'price-desc') return Number(getSellingPrice(b)) - Number(getSellingPrice(a));
    if (sortVal === 'rating') return Number(b.rating) - Number(a.rating);
    if (sortVal === 'newest') {
      const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      if (timeA === timeB) return b.id.localeCompare(a.id);
      return timeB - timeA;
    }
    return 0;
  });

  const displayProducts = sortedProducts;

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data ? data.data : data;
    }
  });

  // Ensure "All" is always mapped correctly
  const dynamicCategories = [
    { id: 'all', name: 'All', nameEn: 'All', nameAr: 'الكل' }, 
    ...(categoriesData ? categoriesData : [
      { name: 'Electronics', nameEn: 'Electronics', nameAr: 'إلكترونيات' },
      { name: 'Fashion', nameEn: 'Fashion', nameAr: 'أزياء' },
      { name: 'Home & Living', nameEn: 'Home & Living', nameAr: 'المنزل والمعيشة' },
      { name: 'Beauty', nameEn: 'Beauty', nameAr: 'الجمال' }
    ])
  ];

  const handleCategoryChange = (cat: string) => {
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };



  const seoTitle = categoryFilter !== 'All' ? `${categoryFilter} Products | All She Needs` : 'All Products | All She Needs';
  const seoDescription = `Browse our extensive collection of ${categoryFilter !== 'All' ? categoryFilter.toLowerCase() : ''} products. Find the best deals and latest trends at All She Needs.`;

  return (
    <div className="flex flex-col md:flex-row gap-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full py-8">
      <SEO title={seoTitle} description={seoDescription} />
      <div className="md:hidden flex items-center justify-between mb-4 pb-4 border-b border-gray-100">
        <button 
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          className="flex items-center gap-2 font-bold text-gray-900 bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-200"
        >
          <Filter size={18} />
          <span>{showMobileFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
        <div className="text-sm font-medium text-gray-500">
          {displayProducts.length} Products
        </div>
      </div>

      {/* Sidebar Filters */}
      <aside className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 shrink-0 space-y-8 animate-in mt-4 md:mt-0`}>
        <div>
          <div className="flex items-center gap-2 font-bold mb-4 border-b border-gray-200 pb-2">
            <Filter size={20} />
            <h2>Filters</h2>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Categories</h3>
              <ul className="space-y-2">
                {dynamicCategories.map(catObj => {
                  const cat = catObj.name;
                  const displayName = i18n.language === 'ar' ? (catObj.nameAr || catObj.name) : (catObj.nameEn || catObj.name);
                  const isActive = categoryFilter.toLowerCase() === cat.toLowerCase();
                  return (
                    <li key={cat}>
                      <button 
                        onClick={() => handleCategoryChange(cat)}
                        className={`text-sm w-full text-left flex items-center justify-between ${isActive ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                      >
                        {displayName}
                        {isActive && <Check size={16} />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header Options */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
          <div className="text-sm text-gray-600">
            {searchTerm ? (
              <span>{t('product.showing_results')} <strong className="text-gray-900">"{searchTerm}"</strong> {categoryFilter !== 'All' && <span>{t('product.in')} <strong className="text-gray-900">{categoryFilter}</strong></span>}</span>
            ) : (
              <span>{t('product.showing_results')} <strong className="text-gray-900">{displayProducts.length}</strong> {t('nav.products')} {categoryFilter === 'All' ? t('product.all_categories') : <span>{t('product.in')} <strong className="text-gray-900">"{categoryFilter}"</strong></span>}</span>
            )}
            {displayProducts.length > 0 && <span className="ml-2">({displayProducts.length})</span>}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">Sort by:</span>
            <div className="relative">
              <select 
                title="Sort Options"
                value={sortParam}
                onChange={(e) => setSortParam(e.target.value)}
                className="appearance-none bg-gray-50 border border-gray-200 text-sm font-medium text-gray-900 rounded-md pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer"
              >
                {SORTS.map(sort => <option key={sort} value={sort}>{sort}</option>)}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown size={16} />
              </div>
            </div>
          </div>
        </div>

        {/* Grid setup */}
        {isLoading ? (
          <PageLoader />
        ) : displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center flex-1 min-h-[400px] text-center">
            <h3 className="text-xl font-bold text-gray-900 mt-4">No products found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your filters or search query.</p>
          </div>
        )}

        {/* Pagination mock */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <button className="h-10 px-4 rounded border border-gray-200 text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50" disabled>Previous</button>
          <button title="Page 1" className="h-10 w-10 flex items-center justify-center rounded border border-blue-600 bg-blue-600 text-white text-sm font-medium">1</button>
          <button title="Page 2" className="h-10 w-10 flex items-center justify-center rounded border border-gray-200 text-gray-700 bg-white hover:bg-gray-50 text-sm font-medium">2</button>
          <button className="h-10 px-4 rounded border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</button>
        </div>
        
      </div>
    </div>
  );
};

export default Products;
