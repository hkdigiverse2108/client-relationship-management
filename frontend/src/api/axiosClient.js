import axios from "axios";
import toast from "react-hot-toast";
import { STORAGE_KEYS, APP_CONFIG } from "@/config/appConfig";
import { storage } from "@/utils/storage";
/**
 * Shared Axios instance. Attaches JWT on every request and normalizes error
 * handling. Base URL is read from VITE_API_BASE_URL in the root CRM/.env file.
 */
const axiosClient = axios.create({
  baseURL: APP_CONFIG.apiBaseUrl,
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});

// Active in-flight requests registry for GET requests deduplication
const pendingRequests = new Map();
const originalGet = axiosClient.get.bind(axiosClient);

axiosClient.get = function (url, config = {}) {
  const params = config.params ? JSON.stringify(config.params) : "";
  const key = `${url}?${params}`;
  
  if (pendingRequests.has(key)) {
    return pendingRequests.get(key);
  }
  
  const promise = originalGet(url, config).finally(() => {
    pendingRequests.delete(key);
  });
  
  pendingRequests.set(key, promise);
  return promise;
};


axiosClient.interceptors.request.use((config) => {
  const token = storage.get(STORAGE_KEYS.token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type'];
  }
  
  return config;
});
axiosClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error?.response?.status;
    const message = error?.response?.data?.detail || error?.response?.data?.message || error?.message || "Something went wrong. Please try again.";
    
    if (status === 401 || (status === 403 && message.includes("deactivate"))) {
      storage.remove(STORAGE_KEYS.token);
      storage.remove(STORAGE_KEYS.user);
      
      if (status === 403 && message.includes("deactivate")) {
        toast.error("Your account has been deactivate by admin.please contact admin.");
      }
      
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    } else if (status >= 500) {
      toast.error("Server error. Please try again later.");
    }
    
    return Promise.reject({ status, message, raw: error });
  },
);
export default axiosClient;
