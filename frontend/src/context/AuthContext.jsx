import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { authService } from "../api/services/authService";
import { storage } from "../utils/storage";
import { STORAGE_KEYS } from "../config/appConfig";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.user));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Hydrate user on mount if a token exists but user state is missing.
    const token = storage.get(STORAGE_KEYS.token);
    if (token && !user) {
      const storedUser = storage.get(STORAGE_KEYS.user);
      if (storedUser) {
        setUser(storedUser);
      } else {
        // Token exists but no user data — clear everything
        storage.remove(STORAGE_KEYS.token);
        storage.remove(STORAGE_KEYS.user);
        setUser(null);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.login(credentials);
      setUser(res.user);
      return res.user;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await authService.logout();
    setUser(null);
    window.location.href = "/login";
  }, []);


  
  const value = useMemo(
    () => ({ user, isAuthenticated: !!user, loading, login, logout }),
    [user, loading, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};
