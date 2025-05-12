
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Simple translation dictionary
const translations: Record<string, Record<Language, string>> = {
  'app.title': {
    en: 'CyanShop',
    ar: 'متجر سيان'
  },
  'nav.home': {
    en: 'Home',
    ar: 'الرئيسية'
  },
  'nav.categories': {
    en: 'Categories',
    ar: 'التصنيفات'
  },
  'nav.favorites': {
    en: 'Favorites',
    ar: 'المفضلة'
  },
  'nav.cart': {
    en: 'Cart',
    ar: 'السلة'
  },
  'nav.profile': {
    en: 'Profile',
    ar: 'الملف الشخصي'
  },
  'action.login': {
    en: 'Login',
    ar: 'تسجيل الدخول'
  },
  'action.register': {
    en: 'Register',
    ar: 'إنشاء حساب'
  },
  'action.addToCart': {
    en: 'Add to Cart',
    ar: 'أضف إلى السلة'
  },
  'action.buy': {
    en: 'Buy Now',
    ar: 'اشتري الآن'
  },
  'action.favorite': {
    en: 'Add to Favorites',
    ar: 'أضف إلى المفضلة'
  },
  // Add more translations as needed
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    // Check local storage for language preference
    const storedLanguage = localStorage.getItem('language') as Language;
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
    
    // Set document direction based on language
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
