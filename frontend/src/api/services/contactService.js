import { sleep } from "@/utils/helpers";
import { contactsData } from "@/data/contactsData";
let contacts = [...contactsData];
export const contactService = {
  async list() {
    await sleep(250);
    return contacts;
  },
  async get(id) {
    await sleep(150);
    return contacts.find((c) => c.id === id) || null;
  },
  async create(payload) {
    await sleep(250);
    const item = { id: `c_${Date.now()}`, createdAt: new Date().toISOString(), ...payload };
    contacts = [item, ...contacts];
    return item;
  },
  async update(id, payload) {
    await sleep(250);
    contacts = contacts.map((c) => (c.id === id ? { ...c, ...payload } : c));
    return contacts.find((c) => c.id === id);
  },
  async remove(id) {
    await sleep(150);
    contacts = contacts.filter((c) => c.id !== id);
    return { success: true };
  },
};
