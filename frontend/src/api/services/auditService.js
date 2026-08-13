import axiosClient from "@/api/axiosClient";

export const auditService = {
  list: async (skip = 0, limit = 100000) => {
    return axiosClient.get(`/audit/?skip=${skip}&limit=${limit}`);
  },
};
