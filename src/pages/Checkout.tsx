import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../api/axios';

const Checkout = () => {
  const { t, i18n } = useTranslation();
  const { items, subtotal, clearCart } = useCart();
  const { addToast } = useNotification();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    defaultValues: {
      fullName: user?.name || '',
      email: user?.email || '',
      address: '',
      city: '',
      phone: ''
    }
  });

  React.useEffect(() => {
    if (user) {
      reset({
        fullName: user.name,
        email: user.email,
        address: '',
        city: '',
        phone: ''
      });
    }
  }, [user, reset]);
  
 // const tax = subtotal * 0.08;
  // const shipping = subtotal > 150 ? 0 : 15;
  const shipping = 0;
  const total = subtotal;

  React.useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  const onSubmit = async (data: any) => {
    const outOfStockItems = items.filter(item => item.product && item.product.stock === 0);
    if (outOfStockItems.length > 0) {
      addToast({ title: t('common.error'), description: t('product.not_exist_coming_soon'), type: 'error' });
      return;
    }

    try {
      await api.post('/orders', {
        shipping: data,
        items: items.map(item => ({ productId: item.product.id, quantity: item.quantity })),
        total: total
      });
      
      clearCart();
      addToast({ title: t('checkout.toast_success'), description: t('checkout.toast_success_desc'), type: 'success' });
      navigate('/orders');
    } catch (err) {
      addToast({ title: t('common.error'), description: t('checkout.error_placing'), type: 'error' });
    }
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">{t('checkout.title')}</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col lg:flex-row gap-10">
        
        {/* Left: Forms */}
        <div className="flex-1 space-y-8">
          {/* Shipping Info */}
          <Card className="border-gray-200 shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                {t('checkout.shipping_info')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('checkout.full_name')}</label>
                  <Input {...register('fullName', { required: t('common.required') })} />
                  {errors.fullName && <span className="text-xs text-red-500">{errors.fullName.message as string}</span>}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">{t('auth.email')}</label>
                  <Input type="email" {...register('email', { required: t('common.required') })} />
                  {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">{t('checkout.address')}</label>
                <Input {...register('address', { required: t('common.required') })} />
                {errors.address && <span className="text-xs text-red-500">{errors.address.message as string}</span>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2 md:col-span-1">
                  <label className="text-sm font-medium text-gray-700">{t('checkout.city')}</label>
                  <Input {...register('city', { required: t('common.required') })} />
                  {errors.city && <span className="text-xs text-red-500">{errors.city.message as string}</span>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-gray-700">{t('checkout.phone')}</label>
                  <Input {...register('phone', { 
                    required: t('common.required'),
                    pattern: {
                      value: /^01\d{9}$/,
                      message: t('checkout.phone_invalid', 'Must be 11 digits starting with 01')
                    }
                  })} placeholder="01xxxxxxxxx" />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone.message as string}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="border-gray-200 shadow-sm border-0 ring-1 ring-gray-200">
            <CardHeader className="bg-gray-50 border-b border-gray-100 rounded-t-xl">
              <CardTitle className="flex items-center gap-2">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                {t('checkout.payment_method')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="p-5 border-2 border-green-600 rounded-xl bg-green-50 flex items-center gap-4 relative overflow-hidden transition-all hover:bg-green-100/50">
                <div className="absolute top-0 right-0 p-3"><CheckCircle2 className="text-green-600" /></div>
                <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center shrink-0">
                  <div className="font-black text-lg">COD</div>
                </div>
                <div>
                  <p className="font-bold text-green-900 text-lg">{t('checkout.cod_title')}</p>
                  <p className="text-sm text-green-700 leading-relaxed font-medium">{t('checkout.cod_desc')}</p>
                </div>
              </div>
              <p className="text-xs text-gray-500 italic mt-2 flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-gray-400" />
                {t('checkout.agreement')}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Right: Order Summary */}
        <div className="w-full lg:w-96 shrink-0">
          <div className="bg-white/40 backdrop-blur-md rounded-2xl p-6 border border-white/40 sticky top-24 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">{t('checkout.order_summary')}</h2>
            
            <div className="space-y-4 max-h-64 overflow-y-auto mb-6 pr-2">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-3">
                  <div className="w-16 h-16 rounded border bg-white/20 flex-shrink-0">
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover rounded" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-900 line-clamp-1">{i18n.language === 'ar' ? (product.nameAr || product.name) : (product.nameEn || product.name)}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{t('cart.quantity')}: {quantity}</p>
                    <p className="text-sm font-semibold text-gray-900 mt-1">{t('product.egp')} {(product.price * quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 text-sm border-t border-gray-100 pt-4">
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.subtotal')}</span>
                <span className="font-medium text-gray-900">{t('product.egp')} {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>{t('cart.shipping')}</span>
                <span className="font-medium text-gray-900">+ shipping</span>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-4 pt-4 flex justify-between items-center mb-6">
              <span className="text-base font-bold text-gray-900 tracking-tight">{t('checkout.total')}</span>
              <span className="text-2xl font-black text-blue-600">{t('product.egp')} {total.toFixed(2)}</span>
            </div>

            <Button type="submit" size="lg" disabled={isSubmitting} className="w-full rounded-xl text-base font-bold shadow-lg bg-green-600 text-white hover:bg-green-700 transition-all transform active:scale-[0.98]">
              {isSubmitting ? t('auth.signing_in') : `${t('checkout.place_order')} (${t('product.egp')} ${total.toFixed(2)})`}
            </Button>
            
            <div className="mt-4 flex items-center justify-center text-xs text-gray-500 font-medium">
              <ShieldCheck size={16} className="text-green-500 mr-1 rtl:ml-1" /> {t('checkout.cod_desc')}
            </div>
          </div>
        </div>

      </form>
    </div>
  );
};

export default Checkout;
