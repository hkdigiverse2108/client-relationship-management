import api from "../axiosClient";

export const roleService = {
  getPresets: async () => {
    return await api.get("/roles/presets");
  },
  
  updatePreset: async (roleName, presetData) => {
    return await api.put(`/roles/presets/${roleName}`, presetData);
  }
};
