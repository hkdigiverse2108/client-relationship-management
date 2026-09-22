import { STORAGE_KEYS } from "../../config/appConfig";
import { storage } from "../../utils/storage";
import axiosClient from "../axiosClient";
import { ENDPOINTS } from "../endpoints";

export const authService = {
  async login({ email, password }) {
    const res = await axiosClient.post(ENDPOINTS.auth.login, { email, password });
    // Backend returns { access_token: "...", token_type: "bearer", user: {...} }
    storage.set(STORAGE_KEYS.token, res.access_token);
    storage.set(STORAGE_KEYS.user, res.user);
    return res;
  },

  async logout() {
    storage.remove(STORAGE_KEYS.token);
    storage.remove(STORAGE_KEYS.user);
    return { success: true };
  },

  async getStoredUser() {
    return storage.get(STORAGE_KEYS.user);
  },

  async forgotPassword(email) {
    return axiosClient.post(ENDPOINTS.auth.forgotPassword, { email });
  },

  async verifyOtp({ email, otp }) {
    return axiosClient.post(ENDPOINTS.auth.verifyOtp, { email, otp });
  },

  async resetPassword({ email, otp, new_password }) {
    return axiosClient.post(ENDPOINTS.auth.resetPassword, { email, otp, new_password });
  },

  async changePassword({ current_password, new_password }) {
    return axiosClient.post(ENDPOINTS.auth.changePassword, { current_password, new_password });
  },
};
