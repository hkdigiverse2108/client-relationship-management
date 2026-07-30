import { sleep } from "@/utils/helpers";
import { usersData } from "@/data/usersData";
export const userService = {
  async list() {
    await sleep(200);
    return usersData;
  },
  async get(id) {
    await sleep(150);
    return usersData.find((u) => u.id === id) || null;
  },
};
