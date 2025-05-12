
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
  
  // Auth related translations
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
  
  // Categories related translations
  'categories.all': {
    en: 'All Categories',
    ar: 'جميع الفئات'
  },
  'categories.featured': {
    en: 'Featured Categories',
    ar: 'الفئات المميزة'
  },
  
  // Cart related translations
  'cart.empty': {
    en: 'Your cart is empty',
    ar: 'سلة التسوق فارغة'
  },
  'cart.emptyMessage': {
    en: 'Looks like you haven\'t added any products to your cart yet.',
    ar: 'يبدو أنك لم تضف أي منتجات إلى سلة التسوق الخاصة بك حتى الآن.'
  },
  'cart.continueShopping': {
    en: 'Continue Shopping',
    ar: 'مواصلة التسوق'
  },
  'cart.clear': {
    en: 'Clear Cart',
    ar: 'مسح السلة'
  },
  'cart.orderSummary': {
    en: 'Order Summary',
    ar: 'ملخص الطلب'
  },
  'cart.subtotal': {
    en: 'Subtotal',
    ar: 'المجموع الفرعي'
  },
  'cart.shipping': {
    en: 'Shipping',
    ar: 'الشحن'
  },
  'cart.total': {
    en: 'Total',
    ar: 'المجموع'
  },
  'cart.checkout': {
    en: 'Proceed to Checkout',
    ar: 'متابعة الدفع'
  },
  'cart.loginRequired': {
    en: 'Login Required',
    ar: 'تسجيل الدخول مطلوب'
  },
  'cart.loginRequiredMessage': {
    en: 'Please login or register to continue with checkout',
    ar: 'الرجاء تسجيل الدخول أو إنشاء حساب للمتابعة'
  },
  
  // Checkout related translations
  'checkout.shipping': {
    en: 'Shipping',
    ar: 'الشحن'
  },
  'checkout.fullName': {
    en: 'Full Name',
    ar: 'الاسم الكامل'
  },
  'checkout.address': {
    en: 'Address',
    ar: 'العنوان'
  },
  'checkout.city': {
    en: 'City',
    ar: 'المدينة'
  },
  'checkout.zipCode': {
    en: 'ZIP Code',
    ar: 'الرمز البريدي'
  },
  'checkout.phone': {
    en: 'Phone Number',
    ar: 'رقم الهاتف'
  },
  'checkout.continueToPayment': {
    en: 'Continue to Payment',
    ar: 'متابعة الدفع'
  },
  'checkout.payment': {
    en: 'Payment',
    ar: 'الدفع'
  },
  'checkout.shippingAddress': {
    en: 'Shipping Address',
    ar: 'عنوان الشحن'
  },
  'checkout.cardNumber': {
    en: 'Card Number',
    ar: 'رقم البطاقة'
  },
  'checkout.expiryDate': {
    en: 'Expiry Date',
    ar: 'تاريخ الانتهاء'
  },
  'checkout.cvv': {
    en: 'CVV',
    ar: 'رمز التحقق'
  },
  'checkout.nameOnCard': {
    en: 'Name on Card',
    ar: 'الاسم على البطاقة'
  },
  'checkout.placeOrder': {
    en: 'Place Order',
    ar: 'تأكيد الطلب'
  },
  'checkout.orderConfirmation': {
    en: 'Order Confirmation',
    ar: 'تأكيد الطلب'
  },
  'checkout.orderProcessing': {
    en: 'Processing Your Order',
    ar: 'جاري معالجة طلبك'
  },
  'checkout.orderProcessingMessage': {
    en: 'Please wait while we process your order',
    ar: 'يرجى الانتظار بينما نعالج طلبك'
  },
  'checkout.orderSuccess': {
    en: 'Order Placed',
    ar: 'تم تأكيد الطلب'
  },
  'checkout.orderConfirmed': {
    en: 'Your order has been successfully placed',
    ar: 'تم تأكيد طلبك بنجاح'
  },
  
  // Profile related translations
  'profile.customer': {
    en: 'Customer',
    ar: 'عميل'
  },
  'profile.marketer': {
    en: 'Marketer',
    ar: 'مسوق'
  },
  'profile.company': {
    en: 'Company',
    ar: 'شركة'
  },
  'profile.account': {
    en: 'Account',
    ar: 'الحساب'
  },
  'profile.orders': {
    en: 'Orders',
    ar: 'الطلبات'
  },
  'profile.settings': {
    en: 'Settings',
    ar: 'الإعدادات'
  },
  'profile.myOrders': {
    en: 'My Orders',
    ar: 'طلباتي'
  },
  'profile.myFavorites': {
    en: 'My Favorites',
    ar: 'المفضلة'
  },
  'profile.paymentMethods': {
    en: 'Payment Methods',
    ar: 'طرق الدفع'
  },
  'profile.helpSupport': {
    en: 'Help & Support',
    ar: 'المساعدة والدعم'
  },
  'profile.logout': {
    en: 'Logout',
    ar: 'تسجيل الخروج'
  },
  'profile.orderDelivered': {
    en: 'Delivered',
    ar: 'تم التوصيل'
  },
  'profile.orderShipping': {
    en: 'Shipping',
    ar: 'جاري الشحن'
  },
  'profile.orderProcessing': {
    en: 'Processing',
    ar: 'قيد المعالجة'
  },
  'profile.orderProductTitle': {
    en: 'Order Product ${number}',
    ar: 'منتج الطلب ${number}'
  },
  'profile.items': {
    en: 'items',
    ar: 'منتجات'
  },
  'profile.trackOrder': {
    en: 'Track Order',
    ar: 'تتبع الطلب'
  },
  'profile.viewDetails': {
    en: 'View Details',
    ar: 'عرض التفاصيل'
  },
  'profile.accountSettings': {
    en: 'Account Settings',
    ar: 'إعدادات الحساب'
  },
  'profile.personalInfo': {
    en: 'Personal Information',
    ar: 'المعلومات الشخصية'
  },
  'profile.notifications': {
    en: 'Notifications',
    ar: 'الإشعارات'
  },
  'profile.addressBook': {
    en: 'Address Book',
    ar: 'دفتر العناوين'
  },
  'profile.legalPrivacy': {
    en: 'Legal & Privacy',
    ar: 'القانونية والخصوصية'
  },
  
  // Search related translations
  'search.title': {
    en: 'Search',
    ar: 'البحث'
  },
  'search.placeholder': {
    en: 'What are you looking for?',
    ar: 'عم تبحث؟'
  },
  'search.search': {
    en: 'Search',
    ar: 'بحث'
  },
  'search.recentSearches': {
    en: 'Recent Searches',
    ar: 'عمليات البحث الأخيرة'
  },
  'search.clear': {
    en: 'Clear',
    ar: 'مسح'
  },
  'search.resultsFound': {
    en: 'Results found: ${count}',
    ar: 'نتائج البحث: ${count}'
  },
  'search.noResults': {
    en: 'No Results Found',
    ar: 'لم يتم العثور على نتائج'
  },
  'search.tryDifferent': {
    en: 'Try different keywords or check your spelling',
    ar: 'جرب كلمات مختلفة أو تحقق من التهجئة'
  }
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
