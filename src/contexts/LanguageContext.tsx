
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
  'action.viewAll': {
    en: 'View All',
    ar: 'عرض الكل'
  },
  'action.shopNow': {
    en: 'Shop Now',
    ar: 'تسوق الآن'
  },
  'home.summerSale': {
    en: 'Summer Sale',
    ar: 'تخفيضات الصيف'
  },
  'home.salePromo': {
    en: 'Up to 50% off on selected items',
    ar: 'خصم يصل إلى 50٪ على المنتجات المختارة'
  },
  'home.featuredProducts': {
    en: 'Featured Products',
    ar: 'منتجات مميزة'
  },
  'home.newArrivals': {
    en: 'New Arrivals',
    ar: 'وصل حديثاً'
  },
  'auth.createAccount': {
    en: 'Create your account',
    ar: 'إنشاء حساب جديد'
  },
  'auth.fullName': {
    en: 'Full Name',
    ar: 'الاسم الكامل'
  },
  'auth.enterFullName': {
    en: 'Enter your full name',
    ar: 'أدخل اسمك الكامل'
  },
  'auth.nameRequired': {
    en: 'Name is required',
    ar: 'الاسم مطلوب'
  },
  'auth.email': {
    en: 'Email',
    ar: 'البريد الإلكتروني'
  },
  'auth.enterEmail': {
    en: 'Enter your email',
    ar: 'أدخل بريدك الإلكتروني'
  },
  'auth.emailRequired': {
    en: 'Email is required',
    ar: 'البريد الإلكتروني مطلوب'
  },
  'auth.invalidEmail': {
    en: 'Invalid email address',
    ar: 'عنوان بريد إلكتروني غير صالح'
  },
  'auth.password': {
    en: 'Password',
    ar: 'كلمة المرور'
  },
  'auth.createPassword': {
    en: 'Create a password',
    ar: 'أنشئ كلمة مرور'
  },
  'auth.passwordRequired': {
    en: 'Password is required',
    ar: 'كلمة المرور مطلوبة'
  },
  'auth.passwordLength': {
    en: 'Password must be at least 6 characters',
    ar: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل'
  },
  'auth.confirmPassword': {
    en: 'Confirm Password',
    ar: 'تأكيد كلمة المرور'
  },
  'auth.confirmPasswordPlaceholder': {
    en: 'Confirm your password',
    ar: 'تأكيد كلمة المرور'
  },
  'auth.confirmPasswordRequired': {
    en: 'Please confirm your password',
    ar: 'يرجى تأكيد كلمة المرور'
  },
  'auth.passwordsNotMatch': {
    en: 'Passwords do not match',
    ar: 'كلمات المرور غير متطابقة'
  },
  'auth.accountType': {
    en: 'Account Type',
    ar: 'نوع الحساب'
  },
  'auth.asCompany': {
    en: 'Register as a Company',
    ar: 'التسجيل كشركة'
  },
  'auth.asMarketer': {
    en: 'Register as a Marketer',
    ar: 'التسجيل كمسوق'
  },
  'auth.creatingAccount': {
    en: 'Creating Account...',
    ar: 'جاري إنشاء الحساب...'
  },
  'auth.alreadyHaveAccount': {
    en: 'Already have an account?',
    ar: 'هل لديك حساب بالفعل؟'
  },
  'auth.signIn': {
    en: 'Sign in',
    ar: 'تسجيل الدخول'
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
