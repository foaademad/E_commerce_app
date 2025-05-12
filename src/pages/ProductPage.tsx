
import React from 'react';
import { useParams } from 'react-router-dom';
import { Heart, ShoppingCart, Share2 } from 'lucide-react';
import Header from '../components/Header';
import ProductCard from '../components/ProductCard';
import BottomNavigation from '../components/BottomNavigation';
import { getProductById, getRelatedProducts, getVendorById } from '../data/mockData';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';
import { useToast } from '@/hooks/use-toast';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { toast } = useToast();
  
  // Get product data
  const product = id ? getProductById(id) : undefined;
  
  // Get related products
  const relatedProducts = id ? getRelatedProducts(id) : [];
  
  // Get vendor information
  const vendor = product ? getVendorById(product.vendorId) : undefined;
  
  // State for selected image
  const [selectedImage, setSelectedImage] = React.useState(0);
  
  const favorite = product ? isFavorite(product.id) : false;
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showBack title="Product Not Found" />
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Product not found</h2>
            <p className="text-gray-500">The product you're looking for doesn't exist</p>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  
  const handleToggleFavorite = () => {
    if (favorite) {
      removeFavorite(product.id);
      toast({
        title: "Removed from favorites",
        description: `${product.name} has been removed from your favorites.`,
      });
    } else {
      addFavorite({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      });
      toast({
        title: "Added to favorites",
        description: `${product.name} has been added to your favorites.`,
      });
    }
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack title="Product Details" />
      
      {/* Product Images */}
      <div className="relative bg-white">
        <img
          src={product.images[selectedImage]}
          alt={product.name}
          className="w-full h-80 object-contain"
        />
        
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
            -{product.discount}% OFF
          </div>
        )}
        
        {/* Thumbnail selection */}
        <div className="absolute bottom-4 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-3 h-3 rounded-full ${selectedImage === index ? 'bg-cyan-500' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Product Info */}
      <div className="p-4 bg-white">
        <div className="flex justify-between items-start mb-2">
          <h1 className="text-xl font-semibold flex-1">{product.name}</h1>
          <button 
            onClick={handleToggleFavorite}
            className="ml-2 p-2 rounded-full hover:bg-gray-100"
          >
            <Heart size={24} className={favorite ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
          </button>
          <button className="ml-2 p-2 rounded-full hover:bg-gray-100">
            <Share2 size={24} className="text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center mb-4">
          <div className="mr-2">
            <span className="text-xl font-bold text-cyan-600">
              ${product.price.toFixed(2)}
            </span>
            {product.discount && (
              <span className="text-gray-400 text-sm line-through ml-2">
                ${(product.price / (1 - product.discount / 100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center ml-auto">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-.82 1.976-.82 2.424 0l1.41 2.59 3.15.466c.95.14 1.33 1.32.64 2l-2.28 2.22.54 3.14c.17.97-.73 1.7-1.57 1.25L12 13.12l-2.82 1.48c-.84.45-1.74-.28-1.57-1.25l.54-3.14-2.28-2.22c-.69-.68-.31-1.86.64-2l3.15-.46 1.41-2.59z" />
                </svg>
              ))}
              <span className="ml-1 text-sm text-gray-700">({product.rating})</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vendor Info */}
      {vendor && (
        <div className="p-4 mt-2 bg-white flex items-center">
          <img 
            src={vendor.logo} 
            alt={vendor.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="ml-3">
            <h3 className="font-medium">{vendor.name}</h3>
            <div className="flex items-center text-sm text-gray-500">
              <span>{vendor.rating} ★</span>
              <span className="mx-1">•</span>
              <span>{vendor.reviewCount} reviews</span>
            </div>
          </div>
          <button className="ml-auto text-cyan-500 text-sm font-medium">Visit Store</button>
        </div>
      )}
      
      {/* Description */}
      <div className="p-4 mt-2 bg-white">
        <h2 className="font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{product.description}</p>
      </div>
      
      {/* Specifications */}
      {product.specifications && (
        <div className="p-4 mt-2 bg-white">
          <h2 className="font-semibold mb-2">Specifications</h2>
          <div className="border rounded-lg overflow-hidden">
            {Object.entries(product.specifications).map(([key, value], index) => (
              <div 
                key={key} 
                className={`flex p-3 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              >
                <span className="font-medium w-1/3">{key}</span>
                <span className="text-gray-700">{value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Related Products */}
      <div className="p-4 mt-2 bg-white">
        <h2 className="font-semibold mb-4">You may also like</h2>
        <div className="grid grid-cols-2 gap-4">
          {relatedProducts.map(product => (
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
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center">
        <button 
          onClick={handleAddToCart}
          className="flex-1 mr-3 bg-cyan-500 text-white rounded-full py-3 font-medium flex items-center justify-center hover:bg-cyan-600 transition-colors"
        >
          <ShoppingCart size={20} className="mr-2" />
          Add to Cart
        </button>
        <button className="flex-1 bg-gray-800 text-white rounded-full py-3 font-medium hover:bg-gray-900 transition-colors">
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default ProductPage;
