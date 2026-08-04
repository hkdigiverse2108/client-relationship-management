// Application-wide configuration constants.
// All VITE_ variables are loaded from the root CRM/.env file.
export const APP_CONFIG = {
  name: import.meta.env.VITE_APP_NAME || "AIO CRM",
  version: "1.0.0",
  supportEmail: "support@aiocrm.com",
  defaultTheme: "light",
  defaultPageSize: 10,
  currency: "INR",
  currencySymbol: "₹",
  dateFormat: "MMM DD, YYYY",
  dateTimeFormat: "MMM DD, YYYY h:mm A",
  // API base URL — set VITE_API_BASE_URL in root CRM/.env
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api/v1",
  // App URL — used for OAuth redirects, sharing links etc.
  appUrl: import.meta.env.VITE_APP_URL || "http://localhost:5173",
  // When true, services use mock data instead of hitting the real backend
  useMock: import.meta.env.VITE_USE_MOCK === "true",
};
export const STORAGE_KEYS = {
  token: "aio_crm_token",
  user: "aio_crm_user",
  theme: "aio_crm_theme",
  sidebar: "aio_crm_sidebar",
};

