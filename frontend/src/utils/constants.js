// Enumerations shared across the app. Kept centralized so backend contracts stay consistent.
export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  PROPOSAL: "proposal",
  WON: "won",
  LOST: "lost",
};
export const LEAD_STATUS_LABEL = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  proposal: "Proposal",
  won: "Won",
  lost: "Lost",
};
export const LEAD_STATUS_VARIANT = {
  new: "info",
  contacted: "primary",
  qualified: "warning",
  proposal: "accent",
  won: "success",
  lost: "danger",
};
export const DEAL_STAGES = [
  { id: "prospecting", label: "Prospecting" },
  { id: "qualification", label: "Qualification" },
  { id: "proposal", label: "Proposal" },
  { id: "negotiation", label: "Negotiation" },
  { id: "closed_won", label: "Closed Won" },
  { id: "closed_lost", label: "Closed Lost" },
];
export const TASK_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  URGENT: "urgent",
};
export const TASK_STATUS = {
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
};
export const USER_ROLES = {
  ADMIN: "admin",
  MANAGER: "manager",
  SALES: "sales",
  SUPPORT: "support",
};
