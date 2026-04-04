import React from 'react';
import logo from '../../assets/OnlyLogo.png';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | string;
  showText?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = false }) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-16',
    xl: 'h-24',
  };

  const heightClass = sizeClasses[size as keyof typeof sizeClasses] || size;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <img
        src={logo}
        alt="ALL SHE NEEDS"
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-105`}
        style={{ 
          backgroundColor: 'transparent',
          // Ensure no background artifacts show
          display: 'block'
        }}
      />
      {showText && (
        <span className="text-xl font-bold tracking-tight text-gray-900">
          ALL SHE NEEDS
        </span>
      )}
    </div>
  );
};

export default Logo;
