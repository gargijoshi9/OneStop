import { createContext, useState, useContext, useEffect } from 'react';

// Create auth context
export const AuthContext = createContext();

// Auth provider component
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  // Sign up function (fake)
  const signup = (email, password, name) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { email, name };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  // Login function (fake)
  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = { email, name: email.split('@')[0] };
        localStorage.setItem('user', JSON.stringify(user));
        setCurrentUser(user);
        resolve(user);
      }, 1000);
    });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth
export function useAuth() {
  return useContext(AuthContext);
}