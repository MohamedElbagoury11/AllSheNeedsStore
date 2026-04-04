import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ShoppingBag, Facebook, Twitter, Instagram, Github } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div className="col-span-1 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <Logo size="lg" showText={true} />
            </Link>
            <p className="text-sm leading-6 text-gray-500">
              {t('footer.description')}
            </p>
            <div className="mt-6 flex gap-4 rtl:flex-row-reverse rtl:justify-end">
              <a href="#" className="text-gray-400 hover:text-blue-600"><Facebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-blue-400"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-pink-600"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-gray-900"><Github size={20} /></a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t('footer.shop')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/products" className="text-sm text-gray-500 hover:text-blue-600">{t('nav.shop')}</Link></li>
              <li><Link to="/products?category=trending" className="text-sm text-gray-500 hover:text-blue-600">Trending</Link></li>
              <li><Link to="/products?category=new" className="text-sm text-gray-500 hover:text-blue-600">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t('footer.support')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/contact" className="text-sm text-gray-500 hover:text-blue-600">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-500 hover:text-blue-600">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">{t('footer.legal')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-blue-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-blue-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-100 pt-8 flex flex-col md:flex-row items-center justify-between">
          <p className="text-xs leading-5 text-gray-500">
            &copy; {new Date().getFullYear()} ALL SHE NEEDS. {t('footer.rights')}
          </p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            {/* Payment icons removed for COD process */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
