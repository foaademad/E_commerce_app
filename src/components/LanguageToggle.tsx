
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, changeLanguage } = useLanguage();

  return (
    <button 
      onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
      className="px-3 py-1 rounded-full bg-cyan-100 text-cyan-800 font-medium hover:bg-cyan-200 transition-colors flex items-center"
    >
      <span>{language === 'en' ? 'English' : 'العربية'}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        className="w-4 h-4 ml-1" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    </button>
  );
};

export default LanguageToggle;
