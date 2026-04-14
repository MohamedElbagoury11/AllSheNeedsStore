import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { Star, ShoppingCart, Heart, ShieldCheck, Truck, RefreshCw, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNotification } from '../context/NotificationContext';
import { SEO } from '../components/common/SEO';
import { PageLoader } from '../components/common/PageLoader';
import { Product } from '../types';
import api from '../api/axios';

import ReviewForm from '../components/product/ReviewForm';

const ProductDetails = () => {
  const { t, i18n } = useTranslation();
  const { id } = useParams();
  
  const { data: productData, isLoading, error, refetch } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data } = await api.get(`/products/${id}`);
      return data.data ? (data.data as Product) : (data as Product);
    },
    enabled: !!id,
  });

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const { addToast } = useNotification();

  // Show loading BEFORE accessing product properties
  if (isLoading) {
    return <PageLoader />;
  }

  if (error || !productData) {
    return (
      <div className="py-20 flex justify-center items-center flex-col min-h-[50vh] text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('product.not_found')}</h2>
        <p className="text-gray-500 mb-6 max-w-md">{t('product.not_found_desc')}</p>
        <Link to="/products" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:bg-blue-700">{t('product.back_to_products')}</Link>
      </div>
    );
  }

  // product is guaranteed to exist below this point
  const product = productData;
  const inWishlist = isInWishlist(product.id);
  
  const displayName = i18n.language === 'ar' ? (product.nameAr || product.name) : (product.nameEn || product.name);
  const displayDescription = i18n.language === 'ar' ? (product.descriptionAr || product.description) : (product.descriptionEn || product.description);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast({ title: t('cart.toast_success', 'Success'), description: `${t('cart.added')} ${quantity} ${displayName}`, type: 'success' });
  };

  const handleToggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      addToast({ title: t('wishlist.removed', 'Removed from wishlist') });
    } else {
      addToWishlist(product);
      addToast({ title: t('wishlist.added', 'Added to wishlist'), type: 'success' });
    }
  };

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <SEO 
        title={`${displayName} | All She Needs`} 
        description={displayDescription?.substring(0, 150) + '...'} 
        image={product.images[0]} 
        type="product" 
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* Left: Images */}
        <div className="space-y-4">
          <motion.div 
            className="aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center relative cursor-zoom-in group"
            whileHover={{ scale: 0.99 }} // Actually shrink slightly container to give "pushed in" effect
          >
            <motion.img 
              key={activeImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={product.images[activeImage]} 
              alt={product.name} 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
            />
          </motion.div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button 
                key={idx} 
                title={`${t('common.view')} image ${idx + 1}`}
                onClick={() => setActiveImage(idx)}
                className={`relative aspect-square rounded-xl overflow-hidden bg-gray-100 border-2 transition-all ${activeImage === idx ? 'border-blue-600 ring-2 ring-blue-600/30' : 'border-transparent hover:border-gray-300'}`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <p className="text-sm font-semibold text-blue-600 tracking-wide uppercase">{product.category}</p>
          <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">{displayName}</h1>
          
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "currentColor" : "none"} strokeWidth={i < Math.floor(product.rating) ? 0 : 2} className="transition-colors" />
              ))}
            </div>
            <span className="text-sm font-medium text-gray-600">{product.rating} ({product.reviewsCount} {t('product.reviews')})</span>
          </div>

          <div className="mt-6 flex items-end gap-3 border-y border-gray-100 py-6">
            <p className="text-4xl font-black text-gray-900">{t('product.egp')} {product.price.toLocaleString()}</p>
            {product.stock > 0 ? (
              <div className="flex items-center gap-1.5 text-sm font-medium text-green-600 mb-1.5 ml-4 px-2.5 py-1 bg-green-50 rounded-full">
                <Check size={14} /> {t('product.in_stock')}
              </div>
            ) : (
              <div className="text-sm font-medium text-red-500 mb-1.5 ml-4 px-2.5 py-1 bg-red-50 rounded-full">{t('product.out_of_stock')}</div>
            )}
          </div>

          <p className="mt-6 text-base text-gray-600 leading-relaxed">
            {displayDescription}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            {/* Quantity */}
            <div className="flex items-center justify-between border border-gray-300 rounded-full w-full sm:w-32 h-14 px-4 bg-white shadow-sm">
              <button title={t('common.decrease')} onClick={() => setQuantity(q => Math.max(1, q - 1))} className="text-gray-500 hover:text-gray-900 text-xl font-medium w-8 h-8 flex items-center justify-center transition-colors">-</button>
              <span className="font-semibold text-gray-900">{quantity}</span>
              <button title={t('common.increase')} onClick={() => setQuantity(q => q + 1)} className="text-gray-500 hover:text-gray-900 text-xl font-medium w-8 h-8 flex items-center justify-center transition-colors">+</button>
            </div>
            
            {/* Add to Cart */}
            <button 
              onClick={handleAddToCart}
              className="flex-1 flex items-center justify-center gap-2 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg shadow-lg shadow-blue-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <ShoppingCart size={22} /> {t('product.add_to_cart')}
            </button>
            
            {/* Wishlist */}
            <button 
              title={t('nav.wishlist')}
              onClick={handleToggleWishlist}
              className="flex items-center justify-center h-14 w-14 shrink-0 border border-gray-200 hover:border-blue-600 bg-white text-gray-600 rounded-full hover:bg-blue-50 transition-all active:scale-90"
            >
              <Heart size={24} fill={inWishlist ? '#ef4444' : 'none'} className={inWishlist ? 'text-red-500' : 'text-gray-400 group-hover:text-blue-600'} />
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-4">
            <div className="flex items-center gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
              <ShieldCheck size={24} className="text-blue-600 shrink-0" />
              <div>
                <p className="font-semibold text-xs text-gray-900">{t('product.secure_payment')}</p>
                <p className="text-[10px] text-gray-500">{t('product.secure_payment_desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs Section */}
      <div className="mt-20 border-t border-gray-200">
        <div className="flex overflow-x-auto border-b border-gray-200 hide-scrollbar scroll-smooth">
          {['description', 'specifications', 'reviews'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pt-8 pb-4 px-8 font-semibold text-lg whitespace-nowrap capitalize border-b-4 transition-all ${activeTab === tab ? 'border-gray-900 text-gray-900' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
            >
              {t(`product.${tab}`)}
            </button>
          ))}
        </div>
        
        <div className="py-10">
          <AnimatePresence mode="wait">
            {activeTab === 'description' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">{t('product.description')}</h3>
                <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed text-lg">
                  {displayDescription}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'specifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="max-w-3xl bg-gray-50 rounded-2xl p-6 sm:p-10 border border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">{t('product.technical_specs')}</h3>
                <div className="grid grid-cols-1 gap-y-6">
                  {Object.entries(product.specifications || {}).map(([key, val]) => (
                    <div key={key} className="flex flex-col sm:flex-row sm:justify-between border-b border-gray-200 pb-4 gap-1">
                      <span className="text-gray-500 font-medium">{key}</span>
                      <span className="text-gray-900 font-bold">{val as string}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {activeTab === 'reviews' && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -10 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-12"
              >
                <div className="lg:col-span-2 space-y-10">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="text-2xl font-bold text-gray-900">{t('product.customer_reviews')}</h3>
                    <div className="px-3 py-1 bg-gray-100 rounded-full text-sm font-bold text-gray-700">{product.reviewsCount}</div>
                  </div>
                  
                  {product.reviews && product.reviews.filter((r: any) => r.isApproved).length > 0 ? (
                    <div className="divide-y divide-gray-100">
                      {product.reviews.filter((r: any) => r.isApproved).map((review: any) => (
                        <div key={review.id} className="py-8 first:pt-0">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex shrink-0 items-center justify-center font-bold text-blue-700 text-lg shadow-inner">
                              {(review.user?.name || 'U').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h4 className="font-bold text-gray-900">{review.user?.name || 'Anonymous'}</h4>
                                <div className="flex items-center text-yellow-400">
                                  {[...Array(5)].map((_, j) => (
                                    <Star key={j} size={14} fill={j < review.rating ? "currentColor" : "none"} strokeWidth={j < review.rating ? 0 : 2} />
                                  ))}
                                </div>
                              </div>
                              <p className="text-xs text-gray-400 font-medium uppercase tracking-tighter">{t('review.verified_purchase')}</p>
                            </div>
                          </div>
                          <p className="text-gray-600 text-base leading-relaxed bg-white/50 p-4 rounded-xl border border-gray-50">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                      <p className="text-gray-500 font-medium text-lg">{t('review.no_reviews')}</p>
                    </div>
                  )}
                </div>

                {/* Sticky Review Form */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">{t('review.write_review')}</h3>
                    <ReviewForm productId={product.id} onSuccess={() => refetch()} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


export default ProductDetails;
