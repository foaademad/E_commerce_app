
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  discount?: number;
  vendor?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, price, image, discount, vendor }) => {
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const favorite = isFavorite(id);
  
  const handleFavoriteToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (favorite) {
      removeFavorite(id);
    } else {
      addFavorite({ id, name, price, image });
    }
  };
  
  return (
    <Link to={`/product/${id}`} className="product-card">
      <div className="relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full aspect-square object-cover"
        />
        
        {discount && discount > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            -{discount}%
          </div>
        )}
        
        <button 
          className="absolute top-2 right-2 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
          onClick={handleFavoriteToggle}
        >
          <Heart 
            size={20} 
            className={`${favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'} transition-colors`} 
          />
        </button>
      </div>
      
      <div className="p-3">
        {vendor && (
          <p className="text-xs text-gray-500 mb-1">{vendor}</p>
        )}
        
        <h3 className="font-medium text-gray-800 line-clamp-2 mb-2">{name}</h3>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-bold text-cyan-600">${price.toFixed(2)}</span>
            {discount && discount > 0 && (
              <span className="text-gray-400 text-sm line-through ml-2">
                ${(price / (1 - discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
