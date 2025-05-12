
import React from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useCart } from '../contexts/CartContext';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showBack title="Shopping Cart" showCart={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6 text-center">Looks like you haven't added any products to your cart yet.</p>
          <Link to="/" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">
            Continue Shopping
          </Link>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-32">
      <Header showBack title="Shopping Cart" showCart={false} />
      
      <div className="p-4">
        {items.map(item => (
          <div key={item.id} className="flex py-4 border-b">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
            
            <div className="flex-1 ml-4">
              <div className="flex justify-between">
                <h3 className="font-medium">{item.name}</h3>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash2 size={18} />
                </button>
              </div>
              
              <p className="text-cyan-600 font-semibold mt-1">
                ${item.price.toFixed(2)}
              </p>
              
              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center border rounded-full overflow-hidden">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-3">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="px-2 py-1 bg-gray-100 hover:bg-gray-200"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <p className="font-semibold">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        <div className="mt-4 flex justify-end">
          <button 
            onClick={clearCart}
            className="text-sm text-red-500 hover:underline"
          >
            Clear Cart
          </button>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="p-4 mt-2 bg-white">
        <h2 className="font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span>$5.00</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span className="text-cyan-600">${(total + 5).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">Total</span>
          <span className="text-xl font-bold text-cyan-600">${(total + 5).toFixed(2)}</span>
        </div>
        <button className="w-full bg-cyan-500 text-white rounded-full py-3 font-medium hover:bg-cyan-600 transition-colors">
          Proceed to Checkout
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CartPage;
