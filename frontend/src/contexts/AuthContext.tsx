import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { getAuthToken, loginRequest, registerRequest, clearAuthToken } from '../services/api';

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);
console.log('AuthContext created', AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(getAuthToken());

  useEffect(() => {
    setToken(getAuthToken());
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const t = await loginRequest(username, password);
    setToken(t);
  }, []);

  const register = useCallback(async (username: string, password: string) => {
    await registerRequest(username, password);
  }, []);

  const logout = useCallback(() => {
    clearAuthToken();
    setToken(null);
  }, []);

  return (
    <AuthContext.Provider value={{ token, isAuthenticated: !!token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  console.log('AuthContext:', ctx);
  if (!ctx) throw new Error('useAuthContext must be used within AuthProvider');
  return ctx;
}