
import React, { useState } from 'react';
import { Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const MarketerDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'codes' | 'earnings'>('overview');
  const { toast } = useToast();

  // Mock data for marketer dashboard
  const stats = {
    totalEarnings: 523.75,
    pendingEarnings: 102.50,
    ordersReferred: 37,
    conversionRate: 12.4,
  };

  const discountCodes = [
    { id: '1', code: 'MARK20', discount: '20%', uses: 12, remaining: 88, earnings: 120.50 },
    { id: '2', code: 'SUMMER15', discount: '15%', uses: 8, remaining: 92, earnings: 85.25 },
    { id: '3', code: 'NEWCUST10', discount: '10%', uses: 21, remaining: 79, earnings: 195.00 },
  ];

  // Generate a new discount code
  const generateDiscountCode = () => {
    const randomCode = 'CYAN' + Math.random().toString(36).substring(2, 7).toUpperCase();
    toast({
      title: "Discount code generated",
      description: `Your new code is: ${randomCode}`,
    });
  };

  // Copy discount code to clipboard
  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "Discount code copied to clipboard",
    });
  };

  return (
    <div className="mt-4 px-4">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 py-3 font-medium text-center ${
            activeTab === 'overview'
              ? 'text-cyan-500 border-b-2 border-cyan-500'
              : 'text-gray-500'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('codes')}
          className={`flex-1 py-3 font-medium text-center ${
            activeTab === 'codes'
              ? 'text-cyan-500 border-b-2 border-cyan-500'
              : 'text-gray-500'
          }`}
        >
          My Codes
        </button>
        <button
          onClick={() => setActiveTab('earnings')}
          className={`flex-1 py-3 font-medium text-center ${
            activeTab === 'earnings'
              ? 'text-cyan-500 border-b-2 border-cyan-500'
              : 'text-gray-500'
          }`}
        >
          Earnings
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Marketer Dashboard</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Total Earnings</p>
                <p className="text-xl font-bold text-cyan-600">${stats.totalEarnings.toFixed(2)}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-xl font-bold text-amber-500">${stats.pendingEarnings.toFixed(2)}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Orders Referred</p>
                <p className="text-xl font-bold">{stats.ordersReferred}</p>
              </div>
              
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-sm text-gray-500">Conversion Rate</p>
                <p className="text-xl font-bold">{stats.conversionRate}%</p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-2">Quick Actions</h4>
              <button 
                onClick={generateDiscountCode}
                className="w-full bg-cyan-500 text-white py-2 rounded-md font-medium hover:bg-cyan-600 transition-colors"
              >
                Generate New Discount Code
              </button>
            </div>
          </div>
        )}
        
        {activeTab === 'codes' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold text-lg">Your Discount Codes</h3>
              <button 
                onClick={generateDiscountCode}
                className="bg-cyan-500 text-white px-3 py-1 rounded-md text-sm font-medium hover:bg-cyan-600 transition-colors"
              >
                Generate New
              </button>
            </div>
            
            <div className="space-y-3">
              {discountCodes.map(code => (
                <div key={code.id} className="bg-white p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="bg-cyan-100 text-cyan-800 px-2 py-1 rounded font-mono text-sm">
                        {code.code}
                      </div>
                      <button 
                        onClick={() => copyToClipboard(code.code)}
                        className="ml-2 text-gray-500 hover:text-cyan-500"
                      >
                        <Copy size={16} />
                      </button>
                    </div>
                    <div className="text-sm font-medium">{code.discount} off</div>
                  </div>
                  
                  <div className="mt-2 flex justify-between text-sm text-gray-500">
                    <div>Uses: {code.uses}/{code.uses + code.remaining}</div>
                    <div>Earnings: ${code.earnings.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {activeTab === 'earnings' && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Your Earnings</h3>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium">Earnings Summary</h4>
                <select className="text-sm border rounded px-2 py-1">
                  <option>This Month</option>
                  <option>Last Month</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total earnings</span>
                  <span className="font-medium">${stats.totalEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Pending payment</span>
                  <span className="font-medium">${stats.pendingEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Available for withdrawal</span>
                  <span className="font-medium">${(stats.totalEarnings - stats.pendingEarnings).toFixed(2)}</span>
                </div>
              </div>
              
              <button className="w-full mt-4 bg-cyan-500 text-white py-2 rounded-md font-medium hover:bg-cyan-600 transition-colors">
                Withdraw Funds
              </button>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <h4 className="font-medium mb-3">Recent Transactions</h4>
              
              <div className="space-y-3">
                <div className="flex justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Order #12784</div>
                    <div className="text-sm text-gray-500">May 10, 2025</div>
                  </div>
                  <div className="text-green-600 font-medium">+$25.50</div>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Order #12692</div>
                    <div className="text-sm text-gray-500">May 8, 2025</div>
                  </div>
                  <div className="text-green-600 font-medium">+$18.75</div>
                </div>
                
                <div className="flex justify-between pb-2 border-b">
                  <div>
                    <div className="font-medium">Withdrawal</div>
                    <div className="text-sm text-gray-500">May 1, 2025</div>
                  </div>
                  <div className="text-red-600 font-medium">-$200.00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketerDashboard;
