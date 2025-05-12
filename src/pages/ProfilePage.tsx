
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, CreditCard, Heart, ShoppingBag, Settings, HelpCircle, User, Bell, Package, Users, FileText } from 'lucide-react';
import Header from '../components/Header';
import BottomNavigation from '../components/BottomNavigation';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import MarketerDashboard from '../components/MarketerDashboard';

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  
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
  
  const renderOrdersTab = () => {
    return (
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">{t('profile.myOrders')}</h2>
        
        <div className="space-y-4">
          {/* Mock orders for UI display */}
          {[1, 2, 3].map((order) => (
            <div key={order} className="border rounded-lg p-4">
              <div className="flex justify-between mb-2">
                <div>
                  <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-1 rounded-full">
                    {order === 1 ? t('profile.orderDelivered') : order === 2 ? t('profile.orderShipping') : t('profile.orderProcessing')}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {`#ORD-${1000 + order}`}
                </div>
              </div>
              
              <div className="flex items-center mt-3">
                <div className="w-12 h-12 bg-gray-200 rounded"></div>
                <div className="ml-3">
                  <div className="font-medium">{t('profile.orderProductTitle', { number: order })}</div>
                  <div className="text-sm text-gray-500">{`${order + 1} ${t('profile.items')} • $${(order * 29.99).toFixed(2)}`}</div>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t flex justify-between">
                <button className="text-sm text-cyan-600 font-medium">
                  {t('profile.trackOrder')}
                </button>
                <button className="text-sm text-gray-500">
                  {t('profile.viewDetails')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const renderSettingsTab = () => {
    return (
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-4">{t('profile.accountSettings')}</h2>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left">
            <User size={20} className="text-gray-500 mr-3" />
            <span>{t('profile.personalInfo')}</span>
          </button>
          
          <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
            <Bell size={20} className="text-gray-500 mr-3" />
            <span>{t('profile.notifications')}</span>
          </button>
          
          <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
            <Users size={20} className="text-gray-500 mr-3" />
            <span>{t('profile.addressBook')}</span>
          </button>
          
          <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
            <FileText size={20} className="text-gray-500 mr-3" />
            <span>{t('profile.legalPrivacy')}</span>
          </button>
          
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-4 hover:bg-red-50 text-left border-t text-red-500"
          >
            <LogOut size={20} className="mr-3" />
            <span>{t('profile.logout')}</span>
          </button>
        </div>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen pb-20">
      <Header showBack={false} title={t('nav.profile')} showCart />
      
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
                {user.role === 'buyer' ? t('profile.customer') : 
                 user.role === 'marketer' ? t('profile.marketer') : t('profile.company')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Marketer Dashboard */}
      {isMarketer && <MarketerDashboard />}
      
      {/* Tab Navigation */}
      <div className="flex border-b">
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'profile' ? 'border-b-2 border-cyan-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('profile')}
        >
          {t('profile.account')}
        </button>
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'orders' ? 'border-b-2 border-cyan-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('orders')}
        >
          {t('profile.orders')}
        </button>
        <button 
          className={`flex-1 py-3 text-center ${activeTab === 'settings' ? 'border-b-2 border-cyan-500 font-medium' : 'text-gray-500'}`}
          onClick={() => setActiveTab('settings')}
        >
          {t('profile.settings')}
        </button>
      </div>
      
      {/* Tab Content */}
      {activeTab === 'profile' && (
        <div className="p-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-4 border-b">
              <h3 className="font-semibold">{t('profile.account')}</h3>
            </div>
            
            <div>
              <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left">
                <ShoppingBag size={20} className="text-gray-500 mr-3" />
                <span>{t('profile.myOrders')}</span>
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
                <Heart size={20} className="text-gray-500 mr-3" />
                <span>{t('profile.myFavorites')}</span>
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
                <CreditCard size={20} className="text-gray-500 mr-3" />
                <span>{t('profile.paymentMethods')}</span>
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
                <Settings size={20} className="text-gray-500 mr-3" />
                <span>{t('profile.settings')}</span>
              </button>
              
              <button className="flex items-center w-full p-4 hover:bg-gray-50 text-left border-t">
                <HelpCircle size={20} className="text-gray-500 mr-3" />
                <span>{t('profile.helpSupport')}</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center w-full p-4 hover:bg-red-50 text-left border-t text-red-500"
              >
                <LogOut size={20} className="mr-3" />
                <span>{t('profile.logout')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'orders' && renderOrdersTab()}
      {activeTab === 'settings' && renderSettingsTab()}
      
      <BottomNavigation />
    </div>
  );
};

export default ProfilePage;
