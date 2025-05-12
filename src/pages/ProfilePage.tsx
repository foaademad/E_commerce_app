
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CreditCard, Heart, ShoppingBag, Settings, HelpCircle } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import MarketerDashboard from '../components/MarketerDashboard';

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // If not authenticated, redirect to login
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  if (!isAuthenticated || !user) {
    return null;
  }
  
  // Check if user is a marketer
  const isMarketer = user.role === 'marketer';
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack={false} title="Profile" showCart />
      
      <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-6 text-white">
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <div className="text-3xl font-bold">{user.name.charAt(0)}</div>
            )}
          </div>
          
          <div className="ml-4">
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="opacity-80">{user.email}</p>
            <div className="mt-1">
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {user.role === 'buyer' ? 'Customer' : 
                 user.role === 'marketer' ? 'Marketer' : 'Company'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketer Dashboard */}
      {isMarketer && <MarketerDashboard />}
      
      {/* Profile Menu */}
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <h3 className="font-semibold">Account</h3>
          </div>
          
          <div>
            <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left">
              <ShoppingBag size={20} className="text-gray-500 mr-3" />
              <span>My Orders</span>
            </button>
            
            <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
              <Heart size={20} className="text-gray-500 mr-3" />
              <span>My Favorites</span>
            </button>
            
            <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
              <CreditCard size={20} className="text-gray-500 mr-3" />
              <span>Payment Methods</span>
            </button>
            
            <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
              <Settings size={20} className="text-gray-500 mr-3" />
              <span>Settings</span>
            </button>
            
            <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
              <HelpCircle size={20} className="text-gray-500 mr-3" />
              <span>Help & Support</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex items-center w-full p-4 hover:bg-red-50 text-left border-t text-red-500"
            >
              <LogOut size={20} className="mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
