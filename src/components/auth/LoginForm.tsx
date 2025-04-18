<<<<<<< HEAD
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import Button from "../ui/Button";
import Input from "../ui/Input";
import FormField from "../ui/FormField";
import { useAuth } from "../../context/AuthContext";
import { validateEmail, validatePassword } from "../../utils/validation";
=======
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import FormField from '../ui/FormField';
import { useAuth } from '../../context/AuthContext';
import { validateEmail, validatePassword } from '../../utils/validation';
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
<<<<<<< HEAD

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    form: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear errors on input change
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "", form: "" }));
    }
  };

=======
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({
    email: '',
    password: '',
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
  
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
<<<<<<< HEAD
      form: "",
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      navigate("/");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An error occurred";
      setErrors((prev) => ({
        ...prev,
        form: errorMessage,
=======
      form: '',
    };
    
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      await login(formData.email, formData.password);
      navigate('/');
    } catch (error) {
      setErrors(prev => ({ 
        ...prev, 
        form: 'Invalid email or password. Please try again.' 
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
      }));
    } finally {
      setIsLoading(false);
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-md">
      {errors.form && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {errors.form}
        </div>
      )}
<<<<<<< HEAD

=======
      
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
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
<<<<<<< HEAD

=======
      
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
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
            autoComplete="current-password"
            error={errors.password}
          />
        </div>
      </FormField>
<<<<<<< HEAD

=======
      
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
<<<<<<< HEAD
          <label
            htmlFor="remember-me"
            className="ml-2 block text-sm text-gray-700"
          >
            Remember me
          </label>
        </div>

        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
=======
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
          </label>
        </div>
        
        <div className="text-sm">
          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
            Forgot your password?
          </a>
        </div>
      </div>
<<<<<<< HEAD

=======
      
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
      <Button
        type="submit"
        variant="primary"
        size="lg"
        isLoading={isLoading}
        className="w-full"
      >
        Sign in
      </Button>
<<<<<<< HEAD

      <div className="text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/register")}
=======
      
      <div className="text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <button
          type="button"
          onClick={() => navigate('/register')}
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
          className="font-semibold text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </button>
      </div>
    </form>
  );
};

<<<<<<< HEAD
export default LoginForm;
=======
export default LoginForm;
>>>>>>> a63482dbbdf9e182d262652457bdd1bcf52bbf2d
