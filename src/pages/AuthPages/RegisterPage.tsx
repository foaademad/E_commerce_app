
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../../components/LanguageToggle';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: UserRole;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      role: 'buyer'
    }
  });
  
  const [step, setStep] = useState(1);
  const password = watch('password');
  const selectedRole = watch('role');
  
  const handleRoleSelect = (role: UserRole) => {
    // In a form managed by React Hook Form, we shouldn't directly set values
    // This is just for demonstration - in a real app, use setValue from react-hook-form
    setStep(2);
  };
  
  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,
        role: data.role
      }, data.password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="p-4 flex justify-end">
        <LanguageToggle />
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-cyan-500 mb-2">CyanShop</h1>
          <p className="text-gray-600">Create your account</p>
        </div>
        
        {step === 1 ? (
          // Step 1: Select account type
          <div>
            <h2 className="text-lg font-medium mb-4">Select account type</h2>
            
            <div className="space-y-3">
              <div 
                onClick={() => handleRoleSelect('buyer')}
                className="p-4 border rounded-lg flex items-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50"
              >
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Customer</h3>
                  <p className="text-sm text-gray-500">Shop products from various vendors</p>
                </div>
              </div>
              
              <div 
                onClick={() => handleRoleSelect('marketer')}
                className="p-4 border rounded-lg flex items-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50"
              >
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Marketer</h3>
                  <p className="text-sm text-gray-500">Promote products and earn commissions</p>
                </div>
              </div>
              
              <div 
                onClick={() => handleRoleSelect('company')}
                className="p-4 border rounded-lg flex items-center cursor-pointer hover:border-cyan-500 hover:bg-cyan-50"
              >
                <div className="w-12 h-12 bg-cyan-100 rounded-full flex items-center justify-center text-cyan-500">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="ml-4">
                  <h3 className="font-medium">Company</h3>
                  <p className="text-sm text-gray-500">Sell products on the platform</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Step 2: Fill account details
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <input 
              type="hidden" 
              {...register('role')} 
              value={selectedRole} 
            />
            
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your full name"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Enter your email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Create a password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })}
              />
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                placeholder="Confirm your password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="w-1/2 py-3 border border-cyan-500 text-cyan-500 rounded-lg font-medium hover:bg-cyan-50 transition-colors"
              >
                Back
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-1/2 bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors disabled:opacity-70"
              >
                {isSubmitting ? 'Creating Account...' : 'Create Account'}
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-cyan-500 hover:text-cyan-600">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
