import React, { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "aio_crm_appearance";

export const DEFAULT_APPEARANCE = {
  preset: "default",
  density: "Comfortable", // Compact, Comfortable, Wide
  fontSize: "BASE", // SM, BASE, LG, XL
  shadow: "Light", // None, Light, Medium, High
  borderRadius: 14,
  sidebarWidth: 260,
  policy: "Personal Override",
  colors: {
    primary: "#0052cc",
    secondary: "#64748b",
    accent: "#805ad5",
    sidebar: "#e5eeff",
    navbar: "#ffffff",
    card: "#ffffff",
    app_bg: "#f7f8fb",
    table_header: "#eff4ff",
    hover: "rgba(0, 82, 204, 0.1)",
    border: "#c3c6d6",
    link: "#0052cc",
    icon: "#64748b",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6"
  }
};

const AppearanceContext = createContext(null);

export function AppearanceProvider({ children }) {
  const [appearance, setAppearance] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : DEFAULT_APPEARANCE;
    } catch (e) {
      return DEFAULT_APPEARANCE;
    }
  });

  // Persist and Apply CSS variables
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance));

    const root = document.documentElement;
    
    // Apply Colors
    const { colors } = appearance;
    root.style.setProperty("--color-primary", colors.primary);
    root.style.setProperty("--color-secondary", colors.secondary);
    root.style.setProperty("--color-accent", colors.accent);
    root.style.setProperty("--color-sidebar", colors.sidebar);
    root.style.setProperty("--color-header", colors.navbar);
    root.style.setProperty("--color-surface", colors.card);
    root.style.setProperty("--color-bg", colors.app_bg);
    root.style.setProperty("--color-table-header", colors.table_header);
    root.style.setProperty("--color-hover-bg", colors.hover);
    root.style.setProperty("--color-border", colors.border);
    root.style.setProperty("--color-link", colors.link);
    root.style.setProperty("--color-icon", colors.icon);
    root.style.setProperty("--color-success", colors.success);
    root.style.setProperty("--color-warning", colors.warning);
    root.style.setProperty("--color-danger", colors.error);
    root.style.setProperty("--color-info", colors.info);

    // Apply Layout
    root.style.setProperty("--radius-sm", `${Math.max(4, appearance.borderRadius - 4)}px`);
    root.style.setProperty("--radius-md", `${Math.max(6, appearance.borderRadius - 2)}px`);
    root.style.setProperty("--radius-lg", `${appearance.borderRadius}px`);
    root.style.setProperty("--radius-xl", `${appearance.borderRadius + 6}px`);
    
    root.style.setProperty("--sidebar-width", `${appearance.sidebarWidth}px`);

    // Apply Font Size
    let baseSize = 0.9375;
    if (appearance.fontSize === "SM") baseSize = 0.8125;
    if (appearance.fontSize === "LG") baseSize = 1.0625;
    if (appearance.fontSize === "XL") baseSize = 1.1875;
    
    root.style.setProperty("--font-size-base", `${baseSize}rem`);
    root.style.setProperty("--font-size-sm", `${baseSize - 0.125}rem`);
    root.style.setProperty("--font-size-xs", `${baseSize - 0.25}rem`);
    root.style.setProperty("--font-size-lg", `${baseSize + 0.125}rem`);
    
    // Density mapping (example: setting root font size or paddings)
    // Here we can tweak generic padding if we have variables for them

  }, [appearance]);

  const updateAppearance = (updates) => {
    setAppearance((prev) => ({ ...prev, ...updates }));
  };

  const updateColor = (key, value) => {
    setAppearance((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value }
    }));
  };
  
  const updateColors = (newColors) => {
    setAppearance((prev) => ({
      ...prev,
      colors: { ...prev.colors, ...newColors }
    }));
  };

  const applyPreset = (presetId) => {
    updateAppearance({ preset: presetId });
    if (presetId === "corporate") {
      updateColors({
        primary: "#6366f1",
        app_bg: "#0b1220",
        sidebar: "#0f172a",
        navbar: "#111827",
        card: "#111827",
        border: "#1f2937"
      });
    } else {
      // Find the preset colors from a defined list or defaults
      const PRESETS = {
        default: ["#0052CC", "#f7f8fb", "#e5eeff"],
        modern: ["#2563EB", "#EFF6FF", "#BFDBFE"],
        forest: ["#059669", "#ECFDF5", "#A7F3D0"],
        sunset: ["#EA580C", "#FFF7ED", "#FED7AA"],
        royal: ["#7C3AED", "#F5F3FF", "#DDD6FE"],
        gold: ["#F6C343", "#FFFDF5", "#D8A019"],
        minimal: ["#FFFFFF", "#F4F5F7", "#EBECF0"],
        startup: ["#FF5630", "#FFEBE6", "#DE350B"],
        enterprise: ["#42526E", "#F4F5F7", "#5E6C84"]
      };
      
      const colors = PRESETS[presetId] || PRESETS.default;
      updateColors({
        primary: colors[0],
        app_bg: colors[1],
        sidebar: presetId === "default" ? "#e5eeff" : colors[3],
        navbar: "#ffffff",
        card: "#ffffff",
        border: "#c3c6d6"
      });
    }
  };

  const resetAppearance = () => {
    setAppearance(DEFAULT_APPEARANCE);
  };

  return (
    <AppearanceContext.Provider value={{ appearance, updateAppearance, updateColor, updateColors, resetAppearance, applyPreset }}>
      {children}
    </AppearanceContext.Provider>
  );
}

export const useAppearance = () => {
  const ctx = useContext(AppearanceContext);
  if (!ctx) throw new Error("useAppearance must be used within <AppearanceProvider>");
  return ctx;
};
