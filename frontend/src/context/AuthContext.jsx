import { useState, useEffect, createContext, useContext } from 'react';
import { loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('hiremind_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('hiremind_user');
      }
    }
  }, []);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    const userData = {
      ...data.user,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name || 'User'}`
    };
    setUser(userData);
    localStorage.setItem('hiremind_user', JSON.stringify(userData));
    localStorage.setItem('hiremind_token', data.token);
    return userData;
  };

  const register = async (formData) => {
    const data = await registerUser(formData);
    const userData = {
      ...data.user,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.user.name || 'User'}`
    };
    setUser(userData);
    localStorage.setItem('hiremind_user', JSON.stringify(userData));
    localStorage.setItem('hiremind_token', data.token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hiremind_user');
    localStorage.removeItem('hiremind_token');
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const updated = { ...(prev || {}), ...updatedData };
      localStorage.setItem('hiremind_user', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateUser, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
