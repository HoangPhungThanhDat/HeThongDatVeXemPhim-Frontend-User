import React, { createContext, useCallback, useEffect, useState } from 'react';
import AuthApi from '../../api/authApi';

export const AuthContext = createContext(null);

const clearLocalAuth = () => {
  [
    'access_token',
    'token',
    'role',
    'fullname',
    'UserId',
    'email',
    'phone',
    'user',
  ].forEach((k) => localStorage.removeItem(k));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user') || 'null');
    } catch {
      return null;
    }
  });
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('access_token'),
  );
  const [loading, setLoading] = useState(true);

  // Khi mount: xác thực lại session (interceptor tự refresh nếu access hết hạn)
  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('access_token');
      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }
      try {
        const res = await AuthApi.GetProfile();
        const data = res?.data ?? res;
        const u = data?.user ?? data?.User ?? data;
        if (u && (u.UserId || u.userId || u.email || u.Email)) {
          setUser(u);
          setIsAuthenticated(true);
          localStorage.setItem('user', JSON.stringify(u));
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        setIsAuthenticated(false);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    initAuth();
  }, []);

  const login = useCallback(async (email, password) => {
    await AuthApi.GetCsrfCookie();
    const res = await AuthApi.Login({ Email: email, Password: password });
    const data = res?.data ?? res;
    const token = data?.token || data?.access_token;
    const u = data?.user || data?.User;

    if (token) {
      localStorage.setItem('access_token', token);
      localStorage.setItem('token', token);
    }
    if (u) {
      localStorage.setItem('user', JSON.stringify(u));
      localStorage.setItem('role', u.RoleName || u.role || '');
      localStorage.setItem('fullname', u.FullName || u.fullName || '');
      localStorage.setItem('UserId', u.UserId || u.userId || '');
      localStorage.setItem('email', u.Email || u.email || '');
      localStorage.setItem('phone', u.PhoneNumber || u.Phone || '');
      setUser(u);
    }
    setIsAuthenticated(true);
    return u;
  }, []);

  const logout = useCallback(async () => {
    try {
      await AuthApi.Logout(); // backend clear HttpOnly refresh cookie
    } catch (e) {
      console.warn('Logout API lỗi:', e);
    } finally {
      clearLocalAuth();
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, loading, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};