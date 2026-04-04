import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../api/axios';

const Login = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/login', {
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;
      if (!token || !user) throw new Error('Invalid authentication response');

      login(token, user);
      addToast({ title: 'Welcome back!', type: 'success' });
      navigate('/');
    } catch (error: any) {
      addToast({ 
        title: 'Login failed', 
        description: error.response?.data?.message || error.message, 
        type: 'error' 
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center pt-20">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">{t('auth.sign_in')}</CardTitle>
          <CardDescription className="text-center text-gray-500">
            {t('auth.enter_details')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">{t('auth.email')}</label>
              <Input
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium leading-none text-gray-700">{t('auth.password')}</label>
                <Link to="/forgot-password" className="text-xs text-blue-600 hover:underline">{t('auth.forgot_password')}</Link>
              </div>
              <Input
                type="password"
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? t('auth.signing_in') : t('auth.sign_in')}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            {t('auth.dont_have_account')}{' '}
            <Link to="/register" className="font-semibold text-blue-600 hover:underline">
              {t('auth.create_account')}
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
