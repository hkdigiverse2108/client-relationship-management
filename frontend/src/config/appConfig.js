// Application-wide configuration constants.
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "HK DigiVerse CRM",
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000",
  appUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
};

export const STORAGE_KEYS = {
  token: "hk_crm_token",
  user: "hk_crm_user",
  theme: "hk_crm_theme",
};
