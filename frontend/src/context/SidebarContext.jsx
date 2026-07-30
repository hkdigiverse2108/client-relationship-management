import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { storage } from "@/utils/storage";
import { STORAGE_KEYS } from "@/config/appConfig";
const SidebarContext = createContext(null);
export function SidebarProvider({ children }) {
  const [collapsed, setCollapsed] = useState(
    () => storage.get(STORAGE_KEYS.sidebar) === "collapsed"
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    storage.set(STORAGE_KEYS.sidebar, collapsed ? "collapsed" : "expanded");
  }, [collapsed]);
  const value = useMemo(
    () => ({
      collapsed,
      mobileOpen,
      toggleCollapsed: () => setCollapsed((v) => !v),
      openMobile: () => setMobileOpen(true),
      closeMobile: () => setMobileOpen(false),
    }),
    [collapsed, mobileOpen]
  );
  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
}
export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within <SidebarProvider>");
  return ctx;
};