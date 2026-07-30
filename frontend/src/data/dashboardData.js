export const dashboardData = {
  stats: [
    { key: "revenue", label: "Total Revenue", value: 284500, delta: 12.4, trend: "up", format: "currency" },
    { key: "deals", label: "Active Deals", value: 148, delta: 8.2, trend: "up", format: "number" },
    { key: "leads", label: "New Leads", value: 76, delta: -3.1, trend: "down", format: "number" },
    { key: "winrate", label: "Win Rate", value: 63, delta: 4.5, trend: "up", format: "percent" },
  ],
  revenueSeries: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    current: [18, 22, 27, 24, 31, 34, 40, 38, 44, 49, 55, 62].map((n) => n * 1000),
    previous: [14, 18, 20, 22, 25, 28, 31, 30, 34, 37, 41, 46].map((n) => n * 1000),
  },
  pipeline: [
    { stage: "Prospecting", value: 42 },
    { stage: "Qualification", value: 31 },
    { stage: "Proposal", value: 24 },
    { stage: "Negotiation", value: 18 },
    { stage: "Closed Won", value: 33 },
  ],
  sources: [
    { label: "Website", value: 38 },
    { label: "Referral", value: 22 },
    { label: "Ads", value: 18 },
    { label: "Social", value: 14 },
    { label: "Other", value: 8 },
  ],
  activity: [
    { id: "a1", type: "deal", text: "Sarah closed a $12,400 deal with Northwind Ltd.", time: new Date(Date.now() - 1000 * 60 * 12).toISOString() },
    { id: "a2", type: "lead", text: "New lead assigned: Priya Nair (Acme Corp)", time: new Date(Date.now() - 1000 * 60 * 55).toISOString() },
    { id: "a3", type: "task", text: "You completed 4 follow-up calls", time: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString() },
    { id: "a4", type: "note", text: "Marcus added a note to the Globex deal", time: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString() },
    { id: "a5", type: "deal", text: "Deal moved to Negotiation: Initech renewal", time: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString() },
  ],
};
