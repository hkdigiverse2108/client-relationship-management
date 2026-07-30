import { sleep } from "@/utils/helpers";
import { dealsData } from "@/data/dealsData";
let deals = [...dealsData];
export const dealService = {
  async list() {
    await sleep(250);
    return deals;
  },
  async get(id) {
    await sleep(150);
    return deals.find((d) => d.id === id) || null;
  },
  async create(payload) {
    await sleep(250);
    const item = { id: `d_${Date.now()}`, createdAt: new Date().toISOString(), ...payload };
    deals = [item, ...deals];
    return item;
  },
  async update(id, payload) {
    await sleep(250);
    deals = deals.map((d) => (d.id === id ? { ...d, ...payload } : d));
    return deals.find((d) => d.id === id);
  },
  async remove(id) {
    await sleep(150);
    deals = deals.filter((d) => d.id !== id);
    return { success: true };
  },
};
