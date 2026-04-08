import React from 'react';
import { Bell, Tag, Package, Info } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { PageLoader } from '../components/common/PageLoader';
import api from '../api/axios';

const Notifications = () => {
  const { data: notifications, isLoading } = useQuery({
    queryKey: ['notifications'],
    queryFn: async () => {
      const { data } = await api.get('/notifications');
      return data.data ? data.data : data;
    }
  });

  const displayNotifs = notifications || [];

  return (
    <div className="py-6 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-200">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Notifications</h1>
        <button className="text-sm font-medium text-blue-600 hover:underline">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {isLoading ? (
          <PageLoader />
        ) : displayNotifs.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[30vh] text-center">
            <Bell size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-bold text-gray-900">No notifications</h3>
            <p className="text-gray-500 mt-2">You're all caught up! Check back later.</p>
          </div>
        ) : displayNotifs.map((notif: any) => (
          <div key={notif.id} className={`flex items-start gap-4 p-5 rounded-2xl border transition-all ${
            notif.read ? 'bg-white border-gray-100 opacity-70' : 'bg-blue-50/50 border-blue-100 shadow-sm'
          }`}>
            <div className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
              notif.type === 'order' ? 'bg-green-100 text-green-600' :
              notif.type === 'promotion' ? 'bg-purple-100 text-purple-600' :
              'bg-blue-100 text-blue-600'
            }`}>
              {notif.type === 'order' && <Package size={20} />}
              {notif.type === 'promotion' && <Tag size={20} />}
              {notif.type === 'alert' && <Info size={20} />}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-4">
                <h3 className={`font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>{notif.title}</h3>
                <span className="text-xs text-gray-500 whitespace-nowrap">{notif.time}</span>
              </div>
              <p className={`text-sm mt-1 leading-relaxed ${notif.read ? 'text-gray-500' : 'text-gray-700'}`}>
                {notif.message}
              </p>
            </div>
            {!notif.read && (
              <div className="shrink-0 w-2.5 h-2.5 rounded-full bg-blue-600 mt-2"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
