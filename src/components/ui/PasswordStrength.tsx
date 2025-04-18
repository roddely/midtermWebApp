import React, { useMemo } from 'react';

interface PasswordStrengthProps {
  password: string;
}

const PasswordStrength: React.FC<PasswordStrengthProps> = ({ password }) => {
  const strength = useMemo(() => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 1;
    if (password.length >= 12) score += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    
    return Math.min(Math.floor(score / 2), 3);
  }, [password]);
  
  const getLabel = () => {
    if (!password) return '';
    switch (strength) {
      case 0: return 'Weak';
      case 1: return 'Fair';
      case 2: return 'Good';
      case 3: return 'Strong';
      default: return '';
    }
  };
  
  const getColor = () => {
    switch (strength) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-yellow-500';
      case 2: return 'bg-blue-500';
      case 3: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };
  
  if (!password) return null;
  
  return (
    <div className="mt-2">
      <div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-300 ${getColor()}`} 
          style={{ width: `${(strength + 1) * 25}%` }}
        />
      </div>
      <p className="text-xs mt-1 text-gray-600">
        Password strength: <span className="font-medium">{getLabel()}</span>
      </p>
    </div>
  );
};

export default PasswordStrength;