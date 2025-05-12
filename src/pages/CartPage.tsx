
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, CreditCard, MapPin, Truck } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, clearCart, total } = useCart();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'payment' | 'confirmation'>('cart');
  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    address: '',
    city: '',
    zipCode: '',
    phone: ''
  });
  
  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment');
  };
  
  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmation');
    
    // Simulate order completion
    setTimeout(() => {
      clearCart();
      toast({
        title: t('checkout.orderSuccess'),
        description: t('checkout.orderConfirmed'),
      });
      navigate('/profile');
    }, 1500);
  };
  
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showBack title={t('nav.cart')} showCart={false} />
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold mb-2">{t('cart.empty')}</h2>
          <p className="text-gray-500 mb-6 text-center">{t('cart.emptyMessage')}</p>
          <Link to="/" className="px-6 py-3 bg-cyan-500 text-white font-semibold rounded-full hover:bg-cyan-600 transition-colors">
            {t('cart.continueShopping')}
          </Link>
        </div>
        <BottomNavigation />
      </div>
    );
  }
  
  if (checkoutStep === 'shipping') {
    return (
      <div className="min-h-screen pb-20">
        <Header showBack title={t('checkout.shipping')} showCart={false} />
        
        <div className="p-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '33%' }}></div>
          </div>
          
          <form onSubmit={handleShippingSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('checkout.fullName')}</label>
              <input 
                type="text"
                required
                className="w-full p-3 border rounded-lg"
                value={shippingDetails.fullName}
                onChange={(e) => setShippingDetails({...shippingDetails, fullName: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">{t('checkout.address')}</label>
              <input 
                type="text"
                required
                className="w-full p-3 border rounded-lg"
                value={shippingDetails.address}
                onChange={(e) => setShippingDetails({...shippingDetails, address: e.target.value})}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkout.city')}</label>
                <input 
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={shippingDetails.city}
                  onChange={(e) => setShippingDetails({...shippingDetails, city: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkout.zipCode')}</label>
                <input 
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  value={shippingDetails.zipCode}
                  onChange={(e) => setShippingDetails({...shippingDetails, zipCode: e.target.value})}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">{t('checkout.phone')}</label>
              <input 
                type="tel"
                required
                className="w-full p-3 border rounded-lg"
                value={shippingDetails.phone}
                onChange={(e) => setShippingDetails({...shippingDetails, phone: e.target.value})}
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-cyan-500 text-white rounded-full py-3 font-medium hover:bg-cyan-600 transition-colors mt-6"
            >
              {t('checkout.continueToPayment')}
            </button>
          </form>
        </div>
        
        <BottomNavigation />
      </div>
    );
  }
  
  if (checkoutStep === 'payment') {
    return (
      <div className="min-h-screen pb-20">
        <Header showBack title={t('checkout.payment')} showCart={false} />
        
        <div className="p-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '66%' }}></div>
          </div>
          
          <div className="mb-6 p-4 border rounded-lg">
            <div className="flex items-center">
              <MapPin className="text-cyan-500 mr-2" />
              <h3 className="font-medium">{t('checkout.shippingAddress')}</h3>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              <p>{shippingDetails.fullName}</p>
              <p>{shippingDetails.address}</p>
              <p>{shippingDetails.city}, {shippingDetails.zipCode}</p>
              <p>{shippingDetails.phone}</p>
            </div>
          </div>
          
          <form onSubmit={handlePaymentSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('checkout.cardNumber')}</label>
              <div className="relative">
                <input 
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg pl-10"
                  placeholder="1234 5678 9012 3456"
                />
                <CreditCard className="absolute left-3 top-3 text-gray-400" size={20} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkout.expiryDate')}</label>
                <input 
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  placeholder="MM/YY"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">{t('checkout.cvv')}</label>
                <input 
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg"
                  placeholder="123"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">{t('checkout.nameOnCard')}</label>
              <input 
                type="text"
                required
                className="w-full p-3 border rounded-lg"
              />
            </div>
            
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('checkout.subtotal')}</span>
                <span>${total.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">{t('checkout.shipping')}</span>
                <span>$5.00</span>
              </div>
              
              <div className="flex justify-between font-semibold text-lg">
                <span>{t('checkout.total')}</span>
                <span className="text-cyan-600">${(total + 5).toFixed(2)}</span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="w-full bg-cyan-500 text-white rounded-full py-3 font-medium hover:bg-cyan-600 transition-colors mt-6"
            >
              {t('checkout.placeOrder')}
            </button>
          </form>
        </div>
        
        <BottomNavigation />
      </div>
    );
  }
  
  if (checkoutStep === 'confirmation') {
    return (
      <div className="min-h-screen pb-20">
        <Header showBack title={t('checkout.orderConfirmation')} showCart={false} />
        
        <div className="p-4">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
            <div className="bg-cyan-500 h-2 rounded-full" style={{ width: '100%' }}></div>
          </div>
          
          <div className="flex flex-col items-center justify-center p-8">
            <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-2">{t('checkout.orderProcessing')}</h2>
            <p className="text-gray-500 mb-6 text-center">{t('checkout.orderProcessingMessage')}</p>
            
            <div className="w-full flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-cyan-500"></div>
            </div>
          </div>
        </div>
        
        <BottomNavigation />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-32">
      <Header showBack title={t('nav.cart')} showCart={false} />
      
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
            {t('cart.clear')}
          </button>
        </div>
      </div>
      
      {/* Order Summary */}
      <div className="p-4 mt-2 bg-white">
        <h2 className="font-semibold mb-4">{t('cart.orderSummary')}</h2>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">{t('cart.subtotal')}</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          <div className="flex justify-between">
            <span className="text-gray-600">{t('cart.shipping')}</span>
            <span>$5.00</span>
          </div>
          
          <div className="border-t pt-2 mt-2 flex justify-between font-semibold">
            <span>{t('cart.total')}</span>
            <span className="text-cyan-600">${(total + 5).toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex justify-between items-center mb-3">
          <span className="text-gray-600">{t('cart.total')}</span>
          <span className="text-xl font-bold text-cyan-600">${(total + 5).toFixed(2)}</span>
        </div>
        <button 
          onClick={() => {
            if (!isAuthenticated) {
              toast({
                title: t('cart.loginRequired'),
                description: t('cart.loginRequiredMessage'),
              });
              navigate('/login');
              return;
            }
            setCheckoutStep('shipping');
          }} 
          className="w-full bg-cyan-500 text-white rounded-full py-3 font-medium hover:bg-cyan-600 transition-colors"
        >
          {t('cart.checkout')}
        </button>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default CartPage;
