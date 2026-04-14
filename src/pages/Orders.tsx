import React from 'react';
import { ShoppingBag, Eye, CreditCard } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { PageLoader } from '../components/common/PageLoader';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';

const Orders = () => {
  const { t } = useTranslation();
  const { data: fetchedOrders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: async () => {
      const { data } = await api.get('/orders');
      return data.data ? data.data : data;
    }
  });

  const displayOrders = fetchedOrders || [];

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto w-full">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-8 tracking-tight">{t('orders.history')}</h1>
      
      <div className="space-y-6">
        {isLoading ? (
          <PageLoader />
        ) : displayOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
            <ShoppingBag size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">{t('orders.no_orders')}</h3>
            <p className="text-gray-500 mt-2">{t('orders.empty_desc')}</p>
          </div>
        ) : displayOrders.map((order: any) => (
          <Card key={order.id} className="border-0 shadow-sm ring-1 ring-gray-200 overflow-hidden group">
            <CardHeader className="bg-gray-50 border-b border-gray-100 flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('orders.placed')}</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{order.date}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('orders.total')}</p>
                  <p className="text-sm font-medium text-gray-900 mt-0.5">{t('product.egp')} {order.total.toFixed(2)}</p>
                </div>
                <div className="hidden sm:block">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('orders.ship_to')}</p>
                  <p className="text-sm font-medium text-blue-600 hover:underline cursor-pointer mt-0.5">Jane Doe</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold">{t('orders.id')}</p>
                <p className="text-sm font-medium text-gray-900 mt-0.5">{order.id}</p>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                    }`}>
                      {order.status}
                    </span>
                    <span className="text-sm text-gray-500">{order.items} {t('cart.items')}</span>
                  </div>
                  <div className="flex -space-x-3">
                    {/* Mock thumbnails */}
                    {[...Array(order.items > 3 ? 3 : order.items)].map((_, i) => (
                      <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-100 z-10 flex-shrink-0">
                        <img src={`https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=200&auto=format&fit=crop`} alt="item" className="w-full h-full rounded-full object-cover" />
                      </div>
                    ))}
                    {order.items > 3 && (
                      <div className="w-12 h-12 rounded-full border-2 border-white bg-gray-50 z-20 flex-shrink-0 flex items-center justify-center text-xs font-bold text-gray-600">
                        +{order.items - 3}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                    <ShoppingBag size={16} /> {t('orders.buy_again')}
                  </button>
                    <Eye size={16} /> {t('orders.view_details')}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Orders;
