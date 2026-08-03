import axiosClient from "@/api/axiosClient";

export const userService = {
  async getList() {
    return axiosClient.get("/users");
  },
  async create(payload) {
    return axiosClient.post("/users", payload);
  },
  async update(userId, payload) {
    return axiosClient.put(`/users/${userId}`, payload);
  },
  async toggleStatus(userId, isActive) {
    return axiosClient.patch(`/users/${userId}/status`, { is_active: isActive });
  },
  async delete(userId) {
    return axiosClient.delete(`/users/${userId}`);
  },
  async resetPassword(userId) {
    return axiosClient.put(`/users/${userId}/reset-password`);
  },
  async updateProfile(payload) {
    return axiosClient.patch("/users/me/profile", payload);
  },
  async uploadPhoto(file) {
    const formData = new FormData();
    formData.append("file", file);
    return axiosClient.post("/users/me/photo", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
  }
};
