
import React from 'react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import BottomNavigation from '../components/BottomNavigation';
import { categories } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const CategoriesListPage: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack title={t('nav.categories')} />
      
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categories.map(category => (
          <CategoryCard
            key={category.id}
            id={category.id}
            name={category.name}
            image={category.image}
            productCount={category.productCount}
          />
        ))}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoriesListPage;
