import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ 
  className = '', 
  error, 
  ...props 
}) => {
  return (
    <div className="w-full">
      <input
        className={`w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 transition-all duration-200 ${
          error 
            ? 'border-red-500 focus:border-red-500 focus:ring-red-200' 
            : 'border-gray-300 focus:border-indigo-500 focus:ring-indigo-200'
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;