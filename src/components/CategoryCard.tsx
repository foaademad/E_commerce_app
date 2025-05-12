
import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
  id: string;
  name: string;
  image: string;
  productCount?: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ 
  id, 
  name, 
  image, 
  productCount 
}) => {
  return (
    <Link 
      to={`/categories/${id}`} 
      className="block rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-32 object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
          <h3 className="font-medium text-white">{name}</h3>
          {productCount !== undefined && (
            <p className="text-white/80 text-sm">{productCount} products</p>
          )}
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
