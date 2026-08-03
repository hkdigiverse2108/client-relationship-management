import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS, APP_CONFIG } from "@/config/appConfig";
const ThemeContext = createContext(null);
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(
    () => storage.get(STORAGE_KEYS.theme) || APP_CONFIG.defaultTheme
  );
  
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    storage.set(STORAGE_KEYS.theme, theme);
  }, [theme]);

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === "dark",
      toggleTheme: () => setTheme((t) => (t === "dark" ? "light" : "dark")),
      setTheme,
    }),
    [theme]
  );
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
};