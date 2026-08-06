// Enumerations shared across the app. Kept centralized so backend contracts stay consistent.
export const LEAD_STATUS = {
  NEW: "new",
  CONTACTED: "contacted",
  QUALIFIED: "qualified",
  NEGOTIATION: "negotiation",
  WON: "won",
  LOST: "lost",
};
export const LEAD_STATUS_LABEL = {
  new: "New",
  contacted: "Contacted",
  qualified: "Qualified",
  negotiation: "Negotiation",
  won: "Won",
  lost: "Lost",
};
export const LEAD_STATUS_VARIANT = {
  new: "info",
  contacted: "primary",
  qualified: "primary",
  negotiation: "warning",
  won: "success",
  lost: "danger",
};

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
export const LEAD_FOLLOWUP_STATUSES = {
  scheduled: "Scheduled",
  contacted: "Contacted",
  postponed: "Postponed",
  not_show: "Not Show"
};

// --- CONTACTS CONSTANTS ---

export const CONTACT_STATUS_LABEL = {
  active: "Active",
  inactive: "Inactive",
  blocked: "Blocked"
};

export const CONTACT_STATUS_VARIANT = {
  active: "success",
  inactive: "warning",
  blocked: "danger"
};

// --- CLIENTS CONSTANTS ---
export const CLIENT_STATUS_LABEL = {
  active: "Active",
  inactive: "Inactive",
  on_hold: "On Hold"
};

export const CLIENT_STATUS_VARIANT = {
  active: "success",
  inactive: "secondary",
  on_hold: "warning"
};

export const CONTACT_DEPARTMENTS = {
  sales: "Sales",
  support: "Support",
  billing: "Billing",
  management: "Management",
  it: "IT",
  marketing: "Marketing",
  other: "Other"
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
