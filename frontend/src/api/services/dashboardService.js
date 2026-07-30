import { sleep } from "@/utils/helpers";
import { dashboardData } from "@/data/dashboardData";
export const dashboardService = {
  async summary() {
    await sleep(250);
    return dashboardData;
  },
};
