// Enumerations shared across the app. Kept centralized so backend contracts stay consistent.
export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  UNQUALIFIED: "unqualified",
};
export const LEAD_STATUS_LABEL = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  unqualified: "Unqualified",
};
export const LEAD_STATUS_VARIANT = {
  new: "info",
  contacted: "primary",
  qualified: "success",
  unqualified: "danger",
};
export const LEAD_STAGES = [
  { id: "new", label: "New" },
  { id: "contacted", label: "Contacted" },
  { id: "qualified", label: "Qualified" },
  { id: "negotiation", label: "Negotiation" },
  { id: "won", label: "Won" },
  { id: "lost", label: "Lost" },
];
export const LEAD_SOURCES = [
  "website", "referral", "google ads", "meta ads", "linkedin", "whatsapp", "call", "other"
];
export const LEAD_PRIORITIES = [
  "low", "medium", "high", "critical"
];
export const LEAD_CUSTOMER_TYPES = [
  "individual", "corporate"
];
export const LEAD_COMM_CHANNELS = [
  "Email", "whatsapp", "phone call", "SMS"
];
export const LEAD_FOLLOWUP_STATUSES = [
  "scheduled", "contacted", "postponed", "not show"
];
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
