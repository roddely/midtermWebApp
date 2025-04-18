// Mock authentication service
import { v4 as uuidv4 } from 'uuid';

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

// Local storage keys
const USER_KEY = 'auth_user';
const USERS_KEY = 'auth_users';

// Helper functions
const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

const getStoredUsers = (): StoredUser[] => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

const saveStoredUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Simulate network delay
const delay = (ms: number = 800): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Auth service methods
export const authService = {
  // Get the current user from local storage
  getCurrentUser: async (): Promise<User> => {
    await delay(300);
    
    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) {
      throw new Error('No authenticated user');
    }
    
    return JSON.parse(userJson);
  },
  
  // Login with email and password
  login: async (email: string, password: string): Promise<User> => {
    await delay();
    
    const users = getStoredUsers();
    const user = users.find(u => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password
    );
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    // Don't include password in the returned user object
    const { password: _, ...userWithoutPassword } = user;
    saveUser(userWithoutPassword);
    
    return userWithoutPassword;
  },
  
  // Register a new user
  register: async (name: string, email: string, password: string): Promise<User> => {
    await delay();
    
    const users = getStoredUsers();
    
    // Check if email already exists
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Email already in use');
    }
    
    // Create new user
    const newUser: StoredUser = {
      id: uuidv4(),
      name,
      email,
      password
    };
    
    // Save to "database"
    saveStoredUsers([...users, newUser]);
    
    // Don't include password in the returned user object
    const { password: _, ...userWithoutPassword } = newUser;
    saveUser(userWithoutPassword);
    
    return userWithoutPassword;
  },
  
  // Logout the current user
  logout: (): void => {
    clearUser();
  }
};