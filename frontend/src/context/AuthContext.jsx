import { useState, useEffect, createContext, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('hiremind_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email, password) => {
    const mockUser = { id: 1, name: 'Alex Johnson', email, role: 'CANDIDATE', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex' };
    setUser(mockUser);
    localStorage.setItem('hiremind_user', JSON.stringify(mockUser));
    localStorage.setItem('hiremind_token', 'mock_jwt_token_123');
  };

  const register = (data) => {
    const mockUser = { id: 2, name: data.name, email: data.email, role: data.role || 'CANDIDATE', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}` };
    setUser(mockUser);
    localStorage.setItem('hiremind_user', JSON.stringify(mockUser));
    localStorage.setItem('hiremind_token', 'mock_jwt_token_456');
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
