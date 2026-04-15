import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, CreditCard, RefreshCw, Monitor, ShoppingBag, Home as HomeIcon, Camera, Package } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import ProductCard from '../components/product/ProductCard';
import { SEO } from '../components/common/SEO';
import { PageLoader } from '../components/common/PageLoader';
import { Product } from '../types';
import api from '../api/axios';
import i18n from '../i18n/config';

const getCategoryIcon = (name: string) => {
  const n = name.toLowerCase();
  if (n.includes('electronic')) return <Monitor size={24} />;
  if (n.includes('fashion') || n.includes('cloth')) return <ShoppingBag size={24} />;
  if (n.includes('home')) return <HomeIcon size={24} />;
  if (n.includes('beauty')) return <Camera size={24} />;
  return <Package size={24} />;
};

const Home = () => {
  const { t } = useTranslation();
  const { data: productsData, isLoading: isProductsLoading } = useQuery({
    queryKey: ['products', 'home'],
    queryFn: async () => {
      const { data } = await api.get('/products', { params: { limit: 8 } });
      return data.data ? (data.data as Product[]) : (data as Product[]);
    }
  });

  const { data: categoriesData, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data } = await api.get('/categories');
      return data.data ? data.data : data;
    }
  });

  const displayProducts = productsData || [];
  const displayCategories = categoriesData || [];

  return (
    <div className="flex flex-col gap-16 pb-12">
      <SEO 
        title={`${t('nav.home')} | All She Needs`} 
        description={t('hero.subtitle')}
      />
      {/* Hero Banner Section */}
      <section className="relative w-full h-[500px] sm:h-[600px] overflow-hidden rounded-3xl bg-gray-900 group">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop" 
            alt="Hero Background" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-900/80 to-transparent"></div>
        </motion.div>
        
        <div className="relative z-10 flex flex-col justify-center h-full max-w-2xl px-8 sm:px-16 text-white space-y-6">
          <motion.div
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-6 flex justify-center md:justify-start">
              
            </div>
            <span className="inline-block px-3 py-1 mb-4 text-sm font-semibold tracking-wider text-blue-400 uppercase bg-blue-500/10 rounded-full border border-blue-500/20">
              {t('hero.new_collection')}
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
              {t('hero.title')}
            </h1>
          </motion.div>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-300 max-w-lg"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-4 rtl:flex-row-reverse rtl:justify-end"
          >
            <Link to="/products" className="flex items-center justify-center bg-white text-gray-900 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-100 hover:scale-105 transition-all w-full sm:w-auto">
              {t('hero.shop_now')} <ArrowRight size={20} className="ml-2 rtl:mr-2 rtl:rotate-180" />
            </Link>
            <Link to="/products?category=trending" className="flex items-center justify-center bg-transparent border-2 border-white/30 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-white/10 transition-all w-full sm:w-auto">
              {t('hero.trending')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Ribbon */}
     
      {/* Shop by Categories */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('home.shop_by_category')}</h2>
          <Link to="/products" className="text-blue-600 font-medium hover:underline flex items-center">
            {t('hero.shop_now')} <ArrowRight size={16} className="ml-1 rtl:rotate-180" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {isCategoriesLoading ? (
             <div className="col-span-full"><PageLoader /></div>
          ) : displayCategories.length > 0 ? (
            displayCategories.map((cat: any, idx: number) => {
              const imagePath = cat.image || 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&q=80';
              const catDisplayName = i18n.language === 'ar' ? (cat.nameAr || cat.name) : (cat.nameEn || cat.name);
              return (
                <Link key={cat.id || idx} to={`/products?category=${encodeURIComponent(cat.name)}`} className="group relative block h-40 sm:h-64 overflow-hidden rounded-2xl">
                  <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-300"></div>
                  <img src={imagePath} alt={catDisplayName} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                    <h3 className="text-xl sm:text-2xl font-bold drop-shadow-md">{catDisplayName}</h3>
                    <p className="text-sm opacity-90 drop-shadow-sm mt-1">{cat.count || 0} {t('cart.items')}</p>
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">{t('home.no_categories')}</div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('home.featured_products')}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isProductsLoading ? (
            <div className="col-span-full"><PageLoader /></div>
          ) : displayProducts.length > 0 ? (
            displayProducts.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">{t('home.no_products')}</div>
          )}
        </div>
      </section>

      {/* Promotional Banner */}
      {/* <section className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-12 sm:px-12 sm:py-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl font-bold text-white mb-4">Get 20% Off Your First Order</h2>
          <p className="text-blue-100 mb-8 text-lg">Sign up for our newsletter and receive exclusive drops, early sale access, and a welcome discount.</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" placeholder="Enter your email" className="px-6 py-3.5 rounded-full w-full sm:w-80 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white border-0" />
            <button className="px-8 py-3.5 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-800 transition-colors whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </div>
        <div className="relative z-10 mt-8 md:mt-0 lg:-mr-12">
          <div className="w-48 h-48 sm:w-72 sm:h-72 bg-gradient-to-br from-white/20 to-white/5 rounded-full border border-white/10 flex items-center justify-center shadow-2xl backdrop-blur-sm">
            <span className="text-5xl font-black text-white mix-blend-overlay">20%</span>
          </div>
        </div>
      </section> */}

      {/* Trending Now */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{t('home.trending_now')}</h2>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {isProductsLoading ? (
            <div className="col-span-full"><PageLoader /></div>
          ) : displayProducts.length > 4 ? (
            displayProducts.slice(4, 8).map(product => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500 py-8">{t('home.coming_soon')}</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
