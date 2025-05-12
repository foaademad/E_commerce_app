
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
      
      {/* Category Reels with horizontal scrolling */}
      <div className="p-4 mb-6">
        <h2 className="text-lg font-semibold mb-3">{t('categories.featured')}</h2>
        <div className="flex overflow-x-auto pb-4 space-x-4 scrollbar-hide">
          {categories.map(category => (
            <div key={category.id} className="min-w-[160px]">
              <CategoryCard
                id={category.id}
                name={category.name}
                image={category.image}
                productCount={category.productCount}
              />
            </div>
          ))}
        </div>
      </div>
      
      {/* All Categories Grid */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-3">{t('categories.all')}</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
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
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoriesListPage;
