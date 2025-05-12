
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

const FavoritesPage: React.FC = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const handleAddToCart = (product: any) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  if (favorites.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showBack title="Favorites" />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">No favorites yet</h2>
          <p className="text-gray-500 mb-6 text-center">Your favorites list is empty. Add items to your favorites to see them here.</p>
          <Link to="/" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">
            Explore Products
          </Link>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack title="Favorites" />
      
      <div className="p-4">
        {favorites.map(product => (
          <div key={product.id} className="flex py-4 border-b">
            <Link to={`/product/${product.id}`} className="w-20 h-20 shrink-0">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover rounded"
              />
            </Link>
            
            <div className="flex-1 ml-4">
              <Link to={`/product/${product.id}`}>
                <h3 className="font-medium">{product.name}</h3>
              </Link>
              
              <p className="text-cyan-600 font-semibold mt-1">
                ${product.price.toFixed(2)}
              </p>
              
              <div className="flex space-x-2 mt-2">
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center justify-center px-3 py-1 bg-cyan-500 text-white rounded-full text-sm"
                >
                  <ShoppingCart size={16} className="mr-1" />
                  Add to Cart
                </button>
                
                <button 
                  onClick={() => removeFavorite(product.id)}
                  className="px-3 py-1 border border-gray-300 rounded-full text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default FavoritesPage;
