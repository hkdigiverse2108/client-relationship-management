import { createContext, useContext, useEffect, useMemo, useState, useCallback } from "react";
import { authService } from "@/api/services/authService";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/config/appConfig";
const AuthContext = createContext(null);
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => storage.get(STORAGE_KEYS.user));
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    // Hydrate user on mount if a token exists but user is missing.
    const token = storage.get(STORAGE_KEYS.token);
    if (token && !user) {
      authService.me().then(setUser).catch(() => {
          storage.remove(STORAGE_KEYS.token);
          storage.remove(STORAGE_KEYS.user);
          setUser(null);
      });
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
  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const res = await authService.register(payload);
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
    () => ({ user, isAuthenticated: !!user, loading, login, register, logout }),
    [user, loading, login, register, logout]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
};