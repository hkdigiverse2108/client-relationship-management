// Mock service — resolves against local fixtures. Replace with axiosClient
// calls (uncomment) once the backend is live.
import { sleep } from "@/utils/helpers";
import { STORAGE_KEYS } from "@/config/appConfig";
import { storage } from "@/utils/storage";
// import axiosClient from "@/api/axiosClient";
// import { ENDPOINTS } from "@/api/endpoints";
const MOCK_USER = {
  id: "u_1",
  name: "Pratvi Jikadra",
  email: "admin@aiocrm.com",
  role: "admin",
  avatar: "",
};
export const authService = {
  async login({ email, password }) {
    await sleep(500);
    if (email === "admin@aiocrm.com" && password === "admin123") {
      const token = "mock.jwt.token";
      storage.set(STORAGE_KEYS.token, token);
      storage.set(STORAGE_KEYS.user, MOCK_USER);
      return { user: MOCK_USER, token };
    }
    throw { status: 401, message: "Invalid email or password" };
    // return axiosClient.post(ENDPOINTS.auth.login, { email, password });
  },
  async register(payload) {
    await sleep(500);
    const user = { ...MOCK_USER, ...payload, id: "u_new", role: "sales" };
    const token = "mock.jwt.token";
    storage.set(STORAGE_KEYS.token, token);
    storage.set(STORAGE_KEYS.user, user);
    return { user, token };
    // return axiosClient.post(ENDPOINTS.auth.register, payload);
  },
  async logout() {
    await sleep(200);
    storage.remove(STORAGE_KEYS.token);
    storage.remove(STORAGE_KEYS.user);
    return { success: true };
  },
  async me() {
    const user = storage.get(STORAGE_KEYS.user);
    if (!user) throw { status: 401, message: "Not authenticated" };
    return user;
  },
};
