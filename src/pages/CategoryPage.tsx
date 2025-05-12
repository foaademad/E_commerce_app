
import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';
import { categories, getProductsByCategory } from '../data/mockData';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find category data
  const category = categories.find(cat => cat.id === id);
  
  // Get products for this category
  const categoryProducts = id ? getProductsByCategory(id) : [];
  
  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showBack title="Category Not Found" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Category not found</h2>
            <p className="text-gray-500">The category you're looking for doesn't exist</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack title={category.name} />
      
      {/* Category Banner */}
      <div className="relative h-36">
        <img 
          src={category.image} 
          alt={category.name}
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-2xl font-bold">{category.name}</h1>
            <p>{category.productCount} products</p>
          </div>
        </div>
      </div>
      
      {/* Filters */}
      <div className="p-4 bg-white border-b">
        <div className="flex justify-around">
          <button className="flex items-center text-sm">
            <span>Sort</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </button>
          <button className="flex items-center text-sm">
            <span>Filter</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 ml-1">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
          </button>
        </div>
      </div>
      
      {/* Products Grid */}
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
        {categoryProducts.length > 0 ? (
          categoryProducts.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              discount={product.discount}
            />
          ))
        ) : (
          <div className="col-span-2 sm:col-span-3 text-center py-10">
            <p className="text-gray-500">No products found in this category</p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CategoryPage;
