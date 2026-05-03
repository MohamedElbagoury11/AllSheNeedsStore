import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import CartRecommendations from '../components/cart/CartRecommendations';

const Cart = () => {
  const { t, i18n } = useTranslation();
  const { items, updateQuantity, removeFromCart, subtotal, itemCount } = useCart();
  
 // const tax = subtotal * 0.08; // 8% pseudo-tax
  // const shipping = 50; // Flat shipping fee
  const total = subtotal;

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={40} className="text-gray-400" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{t('cart.empty_title')}</h2>
        <p className="text-gray-500 mb-8 max-w-md">
          {t('cart.empty_desc')}
        </p>
        <Link to="/products">
          <Button size="lg" className="rounded-full px-8">{t('cart.start_shopping')}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">{t('cart.title')} ({itemCount} {t('cart.items')})</h1>
      
      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Cart Items */}
        <div className="flex-1 space-y-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 pb-4 border-b border-gray-200 text-sm font-semibold text-gray-500 uppercase tracking-wider">
            <div className="col-span-6">{t('cart.product')}</div>
            <div className="col-span-2 text-center">{t('cart.price')}</div>
            <div className="col-span-2 text-center">{t('cart.quantity')}</div>
            <div className="col-span-2 text-right">{t('cart.total')}</div>
          </div>
          
          <div className="space-y-6">
            {items.map(({ product, quantity }) => (
              <div key={product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center pb-6 border-b border-gray-100">
                
                <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-100 overflow-hidden border border-gray-200 hidden sm:block">
                    <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      {i18n.language === 'ar' ? (product.nameAr || product.name) : (product.nameEn || product.name)}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">{product.category}</p>
                    <button 
                      onClick={() => removeFromCart(product.id)}
                      className="text-sm text-red-500 font-medium mt-2 flex items-center hover:underline"
                    >
                      <Trash2 size={14} className="mr-1 rtl:ml-1" /> {t('cart.remove')}
                    </button>
                  </div>
                </div>
                
                <div className="col-span-1 flex justify-between sm:col-span-2 sm:block sm:text-center text-gray-900 font-medium">
                  <span className="sm:hidden text-gray-500 w-1/3">{t('cart.price')}:</span>
                  {t('product.egp')} {product.price.toFixed(2)}
                </div>
                
                <div className="col-span-1 flex justify-between items-center sm:col-span-2 sm:justify-center">
                  <span className="sm:hidden text-gray-500 w-1/3">{t('cart.quantity')}:</span>
                  <div className="flex items-center justify-between border border-gray-300 rounded-full w-28 h-10 px-3 bg-white">
                    <button onClick={() => updateQuantity(product.id, quantity - 1)} className="text-gray-500 hover:text-gray-900 font-medium w-6 h-6 flex items-center justify-center">-</button>
                    <span className="font-semibold text-gray-900 text-sm">{quantity}</span>
                    <button onClick={() => updateQuantity(product.id, quantity + 1)} className="text-gray-500 hover:text-gray-900 font-medium w-6 h-6 flex items-center justify-center">+</button>
                  </div>
                </div>
                
                <div className="col-span-1 flex justify-between sm:col-span-2 sm:block sm:text-right font-bold text-gray-900">
                  <span className="sm:hidden text-gray-500 w-1/3">{t('cart.total')}:</span>
                  {t('product.egp')} {(product.price * quantity).toFixed(2)}
                </div>

              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 shadow-xl sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">{t('cart.summary')}</h2>
            
            <div className="space-y-4 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.subtotal')}</span>
                <span className="font-medium text-gray-900">{t('product.egp')} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.shipping')}</span>
                <span className="font-medium text-gray-900">+ shipping</span>
              </div>

            </div>

            <div className="border-t border-gray-200 mt-6 pt-6 flex justify-between items-center mb-6">
              <span className="text-base font-bold text-gray-900 tracking-tight">{t('cart.total')}</span>
              <span className="text-2xl font-black text-gray-900">{t('product.egp')} {total.toFixed(2)}</span>
            </div>

            <Link to="/checkout" className="block w-full">
              <Button size="lg" className="w-full rounded-full text-base font-bold shadow-lg shadow-blue-600/30 group">
                {t('cart.proceed_to_checkout')} <ArrowRight size={18} className="ml-2 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
            </Link>
            
            <div className="mt-6 flex items-center justify-center gap-2">
              {/* Payment icons removed for COD focus */}
              <div className="text-[10px] uppercase tracking-widest text-gray-400 font-bold border border-gray-200 px-3 py-1 rounded-full">
                {t('common.cod')} {t('common.only')}
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recommended Products */}
      <CartRecommendations 
        categories={items.map(item => item.product.category)} 
        excludeIds={items.map(item => item.product.id)} 
      />
    </div>
  );
};

export default Cart;
