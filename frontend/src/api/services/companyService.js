import { sleep } from "@/utils/helpers";
import { companiesData } from "@/data/companiesData";
let companies = [...companiesData];
export const companyService = {
  async list() {
    await sleep(200);
    return companies;
  },
  async get(id) {
    await sleep(150);
    return companies.find((c) => c.id === id) || null;
  },
  async create(payload) {
    await sleep(200);
    const item = { id: `co_${Date.now()}`, createdAt: new Date().toISOString(), ...payload };
    companies = [item, ...companies];
    return item;
  },
  async update(id, payload) {
    await sleep(200);
    companies = companies.map((c) => (c.id === id ? { ...c, ...payload } : c));
    return companies.find((c) => c.id === id);
  },
  async remove(id) {
    await sleep(150);
    companies = companies.filter((c) => c.id !== id);
    return { success: true };
  },
};
