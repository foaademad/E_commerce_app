
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';
import LanguageToggle from '../components/LanguageToggle';
import { categories, products } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  
  // Featured products (with discount)
  const featuredProducts = products.filter(product => product.discount);
  
  // New arrivals (just take some products)
  const newArrivals = products.slice(0, 3);
  
  return (
    <div className="pb-20">
      <Header />
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white p-6 sm:p-10">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Summer Sale</h1>
          <p className="mb-4">Up to 50% off on selected items</p>
          <Link 
            to="/categories" 
            className="inline-block px-6 py-3 bg-white text-cyan-500 font-semibold rounded-full hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </div>
      
      {/* Categories */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Categories</h2>
          <Link to="/categories" className="text-cyan-500 flex items-center">
            <span className="mr-1">View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {categories.slice(0, 6).map(category => (
            <CategoryCard
              key={category.id}
              id={category.id}
              name={category.name}
              image={category.image}
              productCount={category.productCount}
            />
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="px-4 py-6 bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Featured Products</h2>
          <Link to="/products" className="text-cyan-500 flex items-center">
            <span className="mr-1">View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {featuredProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              discount={product.discount}
            />
          ))}
        </div>
      </section>
      
      {/* New Arrivals */}
      <section className="px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">New Arrivals</h2>
          <Link to="/products" className="text-cyan-500 flex items-center">
            <span className="mr-1">View All</span>
            <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {newArrivals.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
            />
          ))}
        </div>
      </section>
      
      <BottomNavigation />
    </div>
  );
};

export default HomePage;
