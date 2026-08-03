import { sleep } from "@/utils/helpers";
import { STORAGE_KEYS } from "@/config/appConfig";
import { storage } from "@/utils/storage";
import axiosClient from "@/api/axiosClient";
import { ENDPOINTS } from "@/api/endpoints";

export const authService = {
  async login({ email, password }) {
    const res = await axiosClient.post(ENDPOINTS.auth.login, { email, password });
    // Assuming backend returns { access_token: "...", user: {...} }
    storage.set(STORAGE_KEYS.token, res.access_token);
    storage.set(STORAGE_KEYS.user, res.user);
    return res;
  },
  async register(payload) {
    // Only super admin creates users via the user endpoint in this new system.
    // So register might not be used directly from the outside, but we keep it
    const res = await axiosClient.post(ENDPOINTS.auth.register, payload);
    storage.set(STORAGE_KEYS.token, res.access_token);
    storage.set(STORAGE_KEYS.user, res.user);
    return res;
  },
  async logout() {
    storage.remove(STORAGE_KEYS.token);
    storage.remove(STORAGE_KEYS.user);
    return { success: true };
  },
  async me() {
    const user = storage.get(STORAGE_KEYS.user);
    if (!user) throw { status: 401, message: "Not authenticated" };
    return user;
  },
  async forgotPassword(email) {
    return axiosClient.post(ENDPOINTS.auth.forgotPassword, { email });
  },
  async resetPassword(payload) {
    return axiosClient.post("/auth/reset-password", payload);
  },
  async changePassword(payload) {
    return axiosClient.post("/auth/change-password", payload);
  }
};
