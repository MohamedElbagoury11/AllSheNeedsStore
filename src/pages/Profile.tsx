import React from 'react';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, MapPin, CreditCard, Settings, LogOut } from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';

const Profile = () => {
  const { user, logout } = useAuth();

  return (
    <div className="py-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
      {/* Sidebar sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="p-6 bg-blue-600 flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-3xl font-bold text-blue-600 shadow-md">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <h2 className="mt-3 text-lg font-bold text-white">{user?.name || 'Guest User'}</h2>
            <p className="text-blue-100 text-sm">{user?.email || 'guest@example.com'}</p>
          </div>
          
          <nav className="p-2 space-y-1">
            <button className="flex items-center gap-3 w-full p-3 text-sm font-semibold text-blue-600 bg-blue-50 rounded-xl transition-colors cursor-pointer text-left">
              <UserIcon size={18} /> Personal Info
            </button>
            <button className="flex items-center gap-3 w-full p-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer text-left">
              <MapPin size={18} /> Saved Addresses
            </button>
            <button className="flex items-center gap-3 w-full p-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer text-left">
              <CreditCard size={18} /> Payment Methods
            </button>
            <button className="flex items-center gap-3 w-full p-3 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer text-left">
              <Settings size={18} /> Account Settings
            </button>
            <hr className="my-2 border-gray-100" />
            <button 
              onClick={logout}
              className="flex items-center gap-3 w-full p-3 text-sm font-semibold text-red-600 hover:bg-red-50 rounded-xl transition-colors cursor-pointer text-left"
            >
              <LogOut size={18} /> Log Out
            </button>
          </nav>
        </div>
      </aside>

      {/* Main Form */}
      <div className="flex-1 space-y-6">
        <Card className="border-0 shadow-sm ring-1 ring-gray-200">
          <div className="border-b border-gray-100 px-6 py-4">
            <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
          </div>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" defaultValue={user?.name?.split(' ')[0]} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" defaultValue={user?.name?.split(' ')[1]} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input type="email" defaultValue={user?.email} disabled className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 focus:outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-gray-900 focus:ring-2 focus:ring-blue-600 focus:outline-none" />
            </div>

            <div className="pt-4 flex justify-end">
              <button className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-800">
                Save Changes
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
