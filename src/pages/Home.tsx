import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home as HomeIcon, LogOut } from 'lucide-react';
import Button from '../components/ui/Button';
import { useAuth } from '../context/AuthContext';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h1 className="text-2xl font-bold mb-4">Welcome to Our App</h1>
          <p className="text-gray-600 mb-6">Please sign in or create an account to continue.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate('/login')}
              variant="primary"
              className="flex-1"
            >
              Sign In
            </Button>
            <Button
              onClick={() => navigate('/register')}
              variant="outline"
              className="flex-1"
            >
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <HomeIcon className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">MyApp</span>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-sm font-medium text-gray-700">
                Hello, {user?.name}
              </span>
              <Button
                onClick={handleLogout}
                variant="outline"
                size="sm"
                className="flex items-center"
              >
                <LogOut size={16} className="mr-1" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-12 sm:px-6 lg:px-8">
        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Dashboard</h1>
          
          <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 md:p-6 mb-6">
            <h2 className="text-lg font-medium text-indigo-800 mb-2">
              Welcome to your account
            </h2>
            <p className="text-indigo-700">
              You've successfully signed in. This is a protected page that only authenticated users can access.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-lg mb-2">Account Details</h3>
              <p className="text-gray-600">Manage your account settings and preferences.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-lg mb-2">Security</h3>
              <p className="text-gray-600">Update your password and security settings.</p>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-300">
              <h3 className="font-semibold text-lg mb-2">Notifications</h3>
              <p className="text-gray-600">Configure your notification preferences.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;