
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, Globe } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { useCart } from '../contexts/CartContext';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showCart?: boolean;
  showMenu?: boolean;
}

const Header: React.FC<HeaderProps> = ({ 
  title, 
  showBack = false, 
  showSearch = true, 
  showCart = true, 
  showMenu = true 
}) => {
  const navigate = useNavigate();
  const { t, language, changeLanguage } = useLanguage();
  const { itemCount } = useCart();
  
  const toggleLanguage = () => {
    changeLanguage(language === 'en' ? 'ar' : 'en');
  };

  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center space-x-3">
          {showBack && (
            <button 
              onClick={() => navigate(-1)} 
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                className="w-6 h-6"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          
          {showMenu && (
            <button className="p-1 rounded-full hover:bg-gray-100">
              <Menu size={24} />
            </button>
          )}
          
          {title ? (
            <h1 className="text-xl font-semibold">{title}</h1>
          ) : (
            <div className="text-xl font-bold text-cyan-500">{t('app.title')}</div>
          )}
        </div>
        
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Globe size={20} />
            <span className="sr-only">Change Language</span>
          </button>
          
          {showSearch && (
            <button 
              onClick={() => navigate('/search')}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Search size={24} />
            </button>
          )}
          
          {showCart && (
            <button 
              onClick={() => navigate('/cart')}
              className="p-1 rounded-full hover:bg-gray-100 relative"
            >
              <ShoppingCart size={24} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-cyan-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
