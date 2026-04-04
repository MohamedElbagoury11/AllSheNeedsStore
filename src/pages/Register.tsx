import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import api from '../api/axios';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm();
  const { login } = useAuth();
  const { addToast } = useNotification();
  const navigate = useNavigate();
  const password = watch('password');

  const onSubmit = async (data: any) => {
    try {
      const response = await api.post('/auth/register', {
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const { token, user } = response.data;
      if (token && user) {
        login(token, user);
      }
      addToast({ title: 'Account created successfully!', type: 'success' });
      navigate('/');
    } catch (error: any) {
      addToast({ 
        title: 'Registration failed', 
        description: error.response?.data?.message || error.message, 
        type: 'error' 
      });
    }
  };

  return (
    <div className="flex h-full w-full items-center justify-center pt-10 pb-10">
      <Card className="w-full max-w-md shadow-lg border-0">
        <CardHeader className="space-y-1 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center text-gray-500">
            Enter your details to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message as string}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="m@example.com"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Password</label>
              <Input
                type="password"
                {...register('password', { required: 'Password is required', minLength: { value: 6, message: 'Minimum 6 characters' } })}
              />
              {errors.password && <span className="text-xs text-red-500">{errors.password.message as string}</span>}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium leading-none text-gray-700">Confirm Password</label>
              <Input
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm password',
                  validate: value => value === password || 'Passwords do not match'
                })}
              />
              {errors.confirmPassword && <span className="text-xs text-red-500">{errors.confirmPassword.message as string}</span>}
            </div>

            <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Register;
