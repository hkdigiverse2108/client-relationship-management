import { sleep } from "@/utils/helpers";
import { leadsData } from "@/data/leadsData";
// import axiosClient from "@/api/axiosClient";
// import { ENDPOINTS } from "@/api/endpoints";
let leads = [...leadsData];
export const leadService = {
  async list() {
    await sleep(300);
    return leads;
    // return axiosClient.get(ENDPOINTS.leads.list);
  },
  async get(id) {
    await sleep(200);
    return leads.find((l) => l.id === id) || null;
  },
  async create(payload) {
    await sleep(300);
    const newLead = {
      id: `l_${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...payload,
    };
    leads = [newLead, ...leads];
    return newLead;
  },
  async update(id, payload) {
    await sleep(300);
    leads = leads.map((l) => (l.id === id ? { ...l, ...payload } : l));
    return leads.find((l) => l.id === id);
  },
  async remove(id) {
    await sleep(200);
    leads = leads.filter((l) => l.id !== id);
    return { success: true };
  },
};
