
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';
import { getAllProducts } from '../data/mockData';
import { useLanguage } from '../contexts/LanguageContext';

const SearchPage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const allProducts = getAllProducts();
  
  // Load recent searches from localStorage
  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);
  
  // Save recent searches to localStorage
  const saveSearch = (query: string) => {
    if (!query.trim()) return;
    
    const updatedSearches = [
      query,
      ...recentSearches.filter(search => search !== query)
    ].slice(0, 5); // Keep only 5 most recent searches
    
    setRecentSearches(updatedSearches);
    localStorage.setItem('recentSearches', JSON.stringify(updatedSearches));
  };
  
  // Handle search
  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }
    
    // Filter products based on search query
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setSearchResults(results);
    saveSearch(searchQuery);
  };
  
  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };
  
  // Use recent search
  const useRecentSearch = (query: string) => {
    setSearchQuery(query);
    
    // Filter products based on the selected recent search
    const results = allProducts.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    
    setSearchResults(results);
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack title={t('search.title')} showSearch={false} />
      
      <div className="p-4">
        <div className="relative mb-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full pl-10 pr-10 py-3 border rounded-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            placeholder={t('search.placeholder')}
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-3 text-gray-400"
            >
              <X size={20} />
            </button>
          )}
        </div>
        
        <button 
          onClick={handleSearch}
          className="w-full bg-cyan-500 text-white rounded-full py-3 font-medium hover:bg-cyan-600 transition-colors mb-6"
        >
          {t('search.search')}
        </button>
        
        {/* Recent searches */}
        {recentSearches.length > 0 && !searchResults.length && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <h2 className="font-medium">{t('search.recentSearches')}</h2>
              <button 
                onClick={clearRecentSearches}
                className="text-sm text-cyan-500"
              >
                {t('search.clear')}
              </button>
            </div>
            <div className="space-y-2">
              {recentSearches.map((query, index) => (
                <button 
                  key={index}
                  onClick={() => useRecentSearch(query)}
                  className="flex items-center w-full p-2 hover:bg-gray-50 rounded"
                >
                  <Search size={16} className="text-gray-400 mr-2" />
                  <span>{query}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Search results */}
        {searchResults.length > 0 && (
          <div>
            <h2 className="font-medium mb-3">
              {t('search.resultsFound', { count: searchResults.length })}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {searchResults.map(product => (
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
          </div>
        )}
        
        {/* No results message */}
        {searchQuery && searchResults.length === 0 && (
          <div className="text-center py-10">
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={24} className="text-gray-400" />
            </div>
            <h2 className="text-lg font-medium mb-2">{t('search.noResults')}</h2>
            <p className="text-gray-500">
              {t('search.tryDifferent')}
            </p>
          </div>
        )}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default SearchPage;
