import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Bell, X, Menu, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { isAuthenticated, user } = useAuth();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm backdrop-blur transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo size="md" showText={true} />
        </Link>

        {/* Search Bar */}
        <div className="hidden flex-1 items-center px-6 md:flex lg:px-12">
          <form onSubmit={handleSearch} className="relative w-full">
            <button 
              type="submit"
              title="Search"
              className={`absolute inset-y-0 flex items-center hover:text-blue-600 transition-colors ${document.documentElement.dir === 'rtl' ? 'right-3' : 'left-3'}`}
            >
              <Search size={18} className="text-gray-400" />
            </button>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('nav.search_placeholder')}
              className={`block w-full rounded-full border border-gray-300 bg-gray-50 py-2.5 text-sm placeholder-gray-500 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500 transition-colors ${document.documentElement.dir === 'rtl' ? 'pr-10 pl-10' : 'pl-10 pr-10'}`}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className={`absolute inset-y-0 flex items-center text-gray-400 hover:text-gray-600 ${document.documentElement.dir === 'rtl' ? 'left-3' : 'right-3'}`}
              >
                <X size={16} />
              </button>
            )}
          </form>
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-4 rtl:space-x-reverse">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Link to="/notifications" className="text-gray-600 hover:text-blue-600 transition-colors relative hidden sm:block">
            <Bell size={22} className="stroke-[1.5]" />
          </Link>
          
          <Link to="/wishlist" className="text-gray-600 hover:text-blue-600 transition-colors hidden sm:block">
            <Heart size={22} className="stroke-[1.5]" />
          </Link>

          <Link to="/cart" className="relative text-gray-600 hover:text-blue-600 transition-colors">
            <ShoppingBag size={22} className="stroke-[1.5]" />
            {itemCount > 0 && (
              <span className={`absolute -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] font-bold text-white shadow-sm ring-2 ring-white ${document.documentElement.dir === 'rtl' ? '-left-2' : '-right-2'}`}>
                {itemCount > 99 ? '99+' : itemCount}
              </span>
            )}
          </Link>

          <div className="border-l border-gray-200 h-6 mx-2 hidden sm:block"></div>

          {isAuthenticated ? (
            <Link to="/profile" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="hidden sm:inline-block">{user?.name}</span>
            </Link>
          ) : (
            <Link to="/login" className="hidden sm:flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors">
              <User size={22} className="stroke-[1.5]" />
              <span className="hidden sm:inline-block">{t('nav.sign_in')}</span>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-4 py-6 space-y-6">
            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('nav.search')}</p>
              <form onSubmit={handleSearch} className="relative">
                <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t('nav.search_placeholder')}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none"
                />
              </form>
            </div>

            <div className="space-y-4">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{t('nav.menu')}</p>
              <div className="grid grid-cols-2 gap-3">
                <Link to="/wishlist" onClick={toggleMobileMenu} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                  <Heart size={24} className="text-red-500" />
                  <span className="text-xs font-medium">{t('nav.wishlist')}</span>
                </Link>
                <Link to="/notifications" onClick={toggleMobileMenu} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                  <Bell size={24} className="text-blue-500" />
                  <span className="text-xs font-medium">{t('nav.notifications')}</span>
                </Link>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-4">
              <div className="flex items-center justify-between p-2">
                <span className="text-sm font-medium text-gray-600">{t('nav.language')}</span>
                <LanguageSwitcher />
              </div>
              
              {isAuthenticated ? (
                <Link to="/profile" onClick={toggleMobileMenu} className="flex items-center gap-4 p-3 rounded-2xl bg-blue-50">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-900">{user?.name}</p>
                    <p className="text-xs text-blue-600 font-medium">{t('nav.view_profile')}</p>
                  </div>
                  <ArrowRight size={18} className="text-blue-600" />
                </Link>
              ) : (
                <Link to="/login" onClick={toggleMobileMenu} className="flex items-center justify-center w-full bg-blue-600 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 active:scale-95 transition-transform">
                  {t('nav.sign_in')}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
