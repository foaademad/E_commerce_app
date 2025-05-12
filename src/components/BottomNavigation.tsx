
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Search, Heart, ShoppingCart, User } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const BottomNavigation: React.FC = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-16 z-10">
      <Link to="/" className={`flex flex-col items-center justify-center w-1/5 py-1 ${isActive('/') ? 'text-cyan-500' : 'text-gray-500'}`}>
        <Home size={24} />
        <span className="text-xs mt-1">{t('nav.home')}</span>
      </Link>
      
      <Link to="/categories" className={`flex flex-col items-center justify-center w-1/5 py-1 ${isActive('/categories') ? 'text-cyan-500' : 'text-gray-500'}`}>
        <Search size={24} />
        <span className="text-xs mt-1">{t('nav.categories')}</span>
      </Link>
      
      <Link to="/favorites" className={`flex flex-col items-center justify-center w-1/5 py-1 ${isActive('/favorites') ? 'text-cyan-500' : 'text-gray-500'}`}>
        <Heart size={24} />
        <span className="text-xs mt-1">{t('nav.favorites')}</span>
      </Link>
      
      <Link to="/cart" className={`flex flex-col items-center justify-center w-1/5 py-1 ${isActive('/cart') ? 'text-cyan-500' : 'text-gray-500'}`}>
        <ShoppingCart size={24} />
        <span className="text-xs mt-1">{t('nav.cart')}</span>
      </Link>
      
      <Link to="/profile" className={`flex flex-col items-center justify-center w-1/5 py-1 ${isActive('/profile') ? 'text-cyan-500' : 'text-gray-500'}`}>
        <User size={24} />
        <span className="text-xs mt-1">{t('nav.profile')}</span>
      </Link>
    </div>
  );
};

export default BottomNavigation;
