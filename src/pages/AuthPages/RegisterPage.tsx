
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';
import { UserRole } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageToggle from '../../components/LanguageToggle';
import { Checkbox } from '@/components/ui/checkbox';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  isMarketer: boolean;
  isCompany: boolean;
}

const RegisterPage: React.FC = () => {
  const { register: registerUser } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      isMarketer: false,
      isCompany: false
    }
  });
  
  const password = watch('password');
  const isCompany = watch('isCompany');
  
  const onSubmit = async (data: FormValues) => {
    try {
      let role: UserRole = 'buyer';
      if (data.isCompany) {
        role = 'company';
      } else if (data.isMarketer) {
        role = 'marketer';
      }
      
      await registerUser({
        name: data.name,
        email: data.email,
        role: role
      }, data.password);
      navigate('/');
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  
  const isRtl = language === 'ar';
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50" dir={isRtl ? 'rtl' : 'ltr'}>
      <div className="p-4 flex justify-end">
        <LanguageToggle />
      </div>
      
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-cyan-500 mb-2">CyanShop</h1>
          <p className="text-gray-600">{t('auth.createAccount')}</p>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.fullName')}
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder={t('auth.enterFullName')}
              {...register('name', { required: t('auth.nameRequired') })}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.email')}
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder={t('auth.enterEmail')}
              {...register('email', { 
                required: t('auth.emailRequired'),
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: t('auth.invalidEmail')
                }
              })}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.password')}
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder={t('auth.createPassword')}
              {...register('password', { 
                required: t('auth.passwordRequired'),
                minLength: {
                  value: 6,
                  message: t('auth.passwordLength')
                }
              })}
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
              {t('auth.confirmPassword')}
            </label>
            <input
              id="confirmPassword"
              type="password"
              className="w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
              placeholder={t('auth.confirmPasswordPlaceholder')}
              {...register('confirmPassword', { 
                required: t('auth.confirmPasswordRequired'),
                validate: value => value === password || t('auth.passwordsNotMatch')
              })}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
          </div>
          
          <div className="space-y-2">
            <h3 className="text-md font-medium">{t('auth.accountType')}</h3>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="isCompany" 
                {...register('isCompany')} 
              />
              <label
                htmlFor="isCompany"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {t('auth.asCompany')}
              </label>
            </div>
            
            {!isCompany && (
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isMarketer" 
                  {...register('isMarketer')} 
                />
                <label
                  htmlFor="isMarketer"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t('auth.asMarketer')}
                </label>
              </div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-500 text-white py-3 rounded-lg font-medium hover:bg-cyan-600 transition-colors disabled:opacity-70"
          >
            {isSubmitting ? t('auth.creatingAccount') : t('auth.createAccount')}
          </button>
        </form>
        
        <div className="mt-8 text-center">
          <p className="text-gray-600">
            {t('auth.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-cyan-500 hover:text-cyan-600">
              {t('auth.signIn')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
