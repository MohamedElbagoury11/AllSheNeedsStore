import React from 'react';
import { useTranslation } from 'react-i18next';
import logo from '../../assets/OnlyLogo.png';

interface PageLoaderProps {
  fullScreen?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ fullScreen = false }) => {
  const { t } = useTranslation();
  
  const containerClasses = fullScreen 
    ? 'fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm' 
    : 'flex w-full min-h-[40vh] items-center justify-center py-12';

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center">
        {/* Animated Background rings to give "colored" animation effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full animate-ping bg-blue-400 opacity-20 blur-xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full animate-ping bg-pink-400 opacity-20 blur-xl" style={{ animationDelay: '0.2s' }}></div>
        
        {/* The logo spinning or pulsing */}
        <div className="relative z-10 animate-bounce">
          <img 
            src={logo} 
            alt={t('common.loading') || 'Loading...'} 
            className="h-20 w-auto drop-shadow-[0_0_15px_rgba(59,130,246,0.6)]" 
          />
        </div>
        
        {/* Loading text with animated dots */}
        <div className="mt-8 flex items-center justify-center gap-1.5 font-bold text-gray-500 tracking-widest uppercase text-sm">
          {t('common.loading') || 'LOADING'}
          <div className="flex space-x-1 ml-1">
            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
            <div className="w-1.5 h-1.5 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
            <div className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
