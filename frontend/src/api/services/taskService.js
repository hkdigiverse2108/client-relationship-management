import { sleep } from "@/utils/helpers";
import { tasksData } from "@/data/tasksData";
let tasks = [...tasksData];
export const taskService = {
  async list() {
    await sleep(200);
    return tasks;
  },
  async get(id) {
    await sleep(150);
    return tasks.find((t) => t.id === id) || null;
  },
  async create(payload) {
    await sleep(200);
    const item = { id: `t_${Date.now()}`, createdAt: new Date().toISOString(), status: "todo", ...payload };
    tasks = [item, ...tasks];
    return item;
  },
  async update(id, payload) {
    await sleep(200);
    tasks = tasks.map((t) => (t.id === id ? { ...t, ...payload } : t));
    return tasks.find((t) => t.id === id);
  },
  async toggle(id) {
    await sleep(150);
    tasks = tasks.map((t) => (t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t));
    return tasks.find((t) => t.id === id);
  },
  async remove(id) {
    await sleep(150);
    tasks = tasks.filter((t) => t.id !== id);
    return { success: true };
  },
};
