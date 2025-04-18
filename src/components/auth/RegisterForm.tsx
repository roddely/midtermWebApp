import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Check } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import FormField from '../ui/FormField';
import PasswordStrength from '../ui/PasswordStrength';
import { useAuth } from '../../context/AuthContext';
import { 
  validateName,
  validateEmail, 
  validatePassword, 
  validatePasswordConfirmation
} from '../../utils/validation';

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    form: '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors on input change
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: '', form: '' }));
    }
  };
  
  const validateForm = () => {
    const newErrors = {
      name: validateName(formData.name),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      passwordConfirmation: validatePasswordConfirmation(
        formData.password, 
        formData.passwordConfirmation
      ),
      form: '',
    };
    
    setErrors(newErrors);
    
    return !newErrors.name && 
           !newErrors.email && 
           !newErrors.password && 
           !newErrors.passwordConfirmation;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await register(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        form: 'Registration failed. Email might already be in use.' 
      }));
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {errors.form && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
      
      <FormField label="Full Name" htmlFor="name">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User size={18} className="text-gray-400" />
          </div>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            className="pl-10"
            autoComplete="name"
            error={errors.name}
          />
        </div>
      </FormField>
      
      <FormField label="Email" htmlFor="email">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail size={18} className="text-gray-400" />
          </div>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="pl-10"
            autoComplete="email"
            error={errors.email}
          />
        </div>
      </FormField>
      
      <FormField label="Password" htmlFor="password">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock size={18} className="text-gray-400" />
          </div>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            className="pl-10"
            autoComplete="new-password"
            error={errors.password}
          />
          {formData.password && <PasswordStrength password={formData.password} />}
        </div>
      </FormField>
      
      <FormField label="Confirm Password" htmlFor="passwordConfirmation">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Check size={18} className="text-gray-400" />
          </div>
          <Input
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            placeholder="••••••••"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            className="pl-10"
            autoComplete="new-password"
            error={errors.passwordConfirmation}
          />
        </div>
      </FormField>
      
      <div className="flex items-center">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
          I agree to the{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </a>
        </label>
      </div>
      
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Create Account
      </Button>
      
      <div className="text-center text-sm text-gray-600">
        Already have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign in
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;