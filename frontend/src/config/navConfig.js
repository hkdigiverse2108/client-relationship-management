import {
  FiGrid,
  FiTarget,
  FiBriefcase,
  FiMessageSquare,
  FiShoppingCart,
  FiSettings,
  FiFileText,
  FiUsers,
  
} from "react-icons/fi";
import { LuClipboardList, LuBot } from "react-icons/lu";

export const NAV_SECTIONS = [
  {
    id: "dashboards",
    title: "DASHBOARDS",
    icon: FiGrid,
    items: [
      { label: "Main KPI", path: "/dashboard" },
      { label: "Sales", path: "/sales" },
      { label: "Team", path: "/team" },
      { label: "Analytics", path: "/analytics" },
    ],
  },
  {
    id: "crm",
    title: "CRM & SALES",
    icon: FiTarget,
    items: [
      { label: "Leads", path: "/leads" },
      { label: "Contacts", path: "/contacts" },
      { label: "Clients", path: "/clients" },
      { label: "Pipeline", path: "/pipeline" },
    ],
  },
  {
    id: "projects",
    title: "PROJECTS",
    icon: FiBriefcase,
    items: [
      { label: "Dashboard", path: "/projects-dashboard" },
      { label: "All Projects", path: "/all-projects" },
      { label: "Pipeline Board", path: "/pipeline-board" },
      { label: "Gantt Chart", path: "/gantt-chart" },
      { label: "Reports", path: "/reports" },
    ],
  },
  {
    id: "omnichannel",
    title: "OMNICHANNEL HUB",
    icon: FiMessageSquare,
    items: [
      {
        id: "whatsapp",
        label: "WhatsApp",
        subItems: [
          { label: "Inbox", path: "/whatsapp-inbox" },
          { label: "Automation Dashboard", path: "/whatsapp-automation-dashboard" },
        ],
      },
      { label: "Call Dialer", path: "/call-dialer" },
      { label: "Email Inbox", path: "/email-inbox" },
      { label: "SMS Inbox", path: "/sms-inbox" },
    ],
  },
  {
    id: "ecommerce",
    title: "E-COMMERCE",
    icon: FiShoppingCart,
    items: [
      { label: "Orders", path: "/orders" },
      { label: "Customers", path: "/customers" },
      { label: "Products", path: "/products" },
      { label: "Inventory", path: "/inventory" },
      { label: "Abandoned Carts", path: "/abandoned-carts" },
    ],
  },

  {
    id: "finance",
    title: "FINANCE & BILLING",
    icon: FiFileText,
    items: [
      {label: "Billing Dashboard", path: "/billing-dashboard"},
      {label: "Invoices", path: "/invoices"},
      {label: "Quotes", path: "/quotes"},
      {label: "Payments", path: "/payments"},
      {label: "Ledger", path: "/ledger"},
      {label: "Expenses", path: "/expenses"},
      {label: "GST Reports", path: "/gst-reports"},
    ]
  },

  {
    id: "hrms",
    title: "HRMS & PAYROLL",
    icon: FiUsers,
    items: [
      {label: "HRMS Dashboard", path: "/hrms-dashboard"},
      {label: "Directory", path: "/directory"},
      {label: "Attendance", path: "/attendance"},
      {label: "Leaves", path: "/leaves"},
      {label: "Payroll", path: "/payroll"},
     
    ]
  },

  {
    id: "tasks",
    title: "TASKS & CALENDAR",
    icon: LuClipboardList,
    items: [
      {label: "Task Board", path: "/tasks"},
      {label: "Reminders", path: "/reminders"},
      
    ]
  },
  {
    id: "admin",
    title: "ADMIN CONSOLE",
    icon: FiSettings,
    items:[
      {label: "AI Assistant Hub", path: "/ai-assistant", icon: LuBot,},
      {label: "White Label Settings", path: "/white-label-settings"},
      {label: "Integrations Hub", path: "/integrations-hub"},
      {label: "API Management", path: "/api-management"},
      {label:"User Management", path: "/user-management"},
      {label: "Roles & Permissions", path: "/roles-and-permissions"},
      {label: "Audit Logs", path: "/audit-logs"},
      {label: "Appearance & Theme", path: "/appearance"}
      
    ]   
  }
];
