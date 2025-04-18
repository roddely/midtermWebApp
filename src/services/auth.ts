// Mock authentication service
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

// Types
interface User {
  id: string;
  name: string;
  email: string;
}

interface StoredUser extends User {
  password: string;
}

// Constants
const SALT_ROUNDS = 10;
const USER_KEY = "auth_user";
const USERS_KEY = "auth_users";
const LOGIN_ATTEMPTS_KEY = "login_attempts";
const LOCKOUT_TIME_KEY = "lockout_time";

// Helper functions
const saveUser = (user: User): void => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearUser = (): void => {
  localStorage.removeItem(USER_KEY);
};

const getStoredUsers = (): StoredUser[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

const saveStoredUsers = (users: StoredUser[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getLoginAttempts = (): number => {
  const attempts = localStorage.getItem(LOGIN_ATTEMPTS_KEY);
  return attempts ? parseInt(attempts) : 0;
};

const incrementLoginAttempts = (): void => {
  const attempts = getLoginAttempts() + 1;
  localStorage.setItem(LOGIN_ATTEMPTS_KEY, attempts.toString());

  if (attempts >= 5) {
    const lockoutTime = Date.now() + 30 * 60 * 1000; // 30 minutes from now
    localStorage.setItem(LOCKOUT_TIME_KEY, lockoutTime.toString());
  }
};

const resetLoginAttempts = (): void => {
  localStorage.removeItem(LOGIN_ATTEMPTS_KEY);
  localStorage.removeItem(LOCKOUT_TIME_KEY);
};

const isAccountLocked = (): boolean => {
  const lockoutTime = localStorage.getItem(LOCKOUT_TIME_KEY);
  if (!lockoutTime) return false;

  const remainingTime = parseInt(lockoutTime) - Date.now();
  if (remainingTime <= 0) {
    resetLoginAttempts();
    return false;
  }

  return true;
};

// Simulate network delay
const delay = (ms: number = 800): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Auth service methods
export const authService = {
  // Get the current user from local storage
  getCurrentUser: async (): Promise<User> => {
    await delay(300);

    const userJson = localStorage.getItem(USER_KEY);
    if (!userJson) {
      throw new Error("No authenticated user");
    }

    return JSON.parse(userJson);
  },

  // Login with email and password
  login: async (email: string, password: string): Promise<User> => {
    await delay();

    if (isAccountLocked()) {
      const lockoutTime = parseInt(
        localStorage.getItem(LOCKOUT_TIME_KEY) || "0"
      );
      const remainingMinutes = Math.ceil(
        (lockoutTime - Date.now()) / (60 * 1000)
      );
      throw new Error(
        `Account is locked. Please try again in ${remainingMinutes} minutes.`
      );
    }

    const users = getStoredUsers();
    const user = users.find(
      (u) =>
        u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (!user) {
      incrementLoginAttempts();
      throw new Error("Invalid credentials");
    }

    // Compare password with hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      incrementLoginAttempts();
      throw new Error("Invalid credentials");
    }

    // Reset login attempts on successful login
    resetLoginAttempts();

    // Don't include password in the returned user object
    const { password: _, ...userWithoutPassword } = user;
    saveUser(userWithoutPassword);

    return userWithoutPassword;
  },

  // Register a new user
  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<User> => {
    await delay();

    const users = getStoredUsers();

    // Check if email already exists
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("Email already in use");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    // Create new user
    const newUser: StoredUser = {
      id: uuidv4(),
      name,
      email,
      password: hashedPassword,
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
  },
};
