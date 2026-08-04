import { dashboardData } from "@/data/dashboardData";
import axiosClient from "@/api/axiosClient";

export const dashboardService = {
  async summary() {
    try {
      const response = await axiosClient.get("/dashboard/stats");
      // Merge backend stats with static charts data
      return {
        ...dashboardData,
        stats: response.stats || dashboardData.stats,
        sources: response.sources || [],
        funnel: response.funnel || [],
        activity: response.activity && response.activity.length > 0 ? response.activity : [],
        heatmap: response.heatmap || [],
      };
    } catch (error) {
      console.error("Failed to fetch dashboard stats", error);
      return dashboardData;
    }
  },
  
  async getRevenueChart(range = "1m") {
    try {
      return await axiosClient.get(`/dashboard/revenue-chart?range=${range}`);
    } catch (error) {
      console.error("Failed to fetch revenue chart", error);
      return { labels: [], actual: [], projected: [] };
    }
  },
};
