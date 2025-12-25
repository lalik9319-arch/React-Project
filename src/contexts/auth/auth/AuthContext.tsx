import React, { createContext, useContext, useEffect, useState } from 'react';
import { get_current_user, login_user, register_user } from '../../../api/Authentication';
import type { AuthResponse, LoginProps, RegisterProps } from '../../../models/User';

interface AuthContextType {
  user: AuthResponse['user'] | null;
  token: string | null;
  login: (credentials: LoginProps) => Promise<void>;
  logout: () => void;
  register: (data: RegisterProps) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthResponse['user'] | null>(() => {
    try {
      const savedUser = localStorage.getItem('user');
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const [loading, setLoading] = useState(false);
  const register = async (data: RegisterProps) => {
    setLoading(true);
    try {
      const response = await register_user(data);
      if (response) {
        await login({ email: data.email, password: data.password });
      }
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const login = async (credentials: LoginProps) => {
    setLoading(true);
    try {
      const response: AuthResponse = await login_user(credentials);
      const { token, user } = response;
      setToken(token);
      setUser(user);
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (err: any) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };
  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        setLoading(true);
        try {
          const response = await get_current_user(savedToken);
          const user: AuthResponse['user'] = {
            id: response.id,
            name: response.name,
            email: response.email,
            role: response.role
          }
          setUser(user);
          setToken(savedToken);
          localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);
  return (
    <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );

};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};