export const menuConfig = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: "ti ti-smart-home",
    items: [
      { path: "/dashboard", label: "Main KPI" },
      { path: "/sales", label: "Sales" },
      { path: "/team", label: "Team" },
      { path: "/analytics", label: "Analytics" }
    ]
  },
  {
    id: "crm",
    title: "CRM & Sales",
    icon: "ti ti-target",
    items: [
      { path: "/leads", label: "Leads" },
      { path: "/contacts", label: "Contacts" },
      { path: "/clients", label: "Clients" },
      { path: "/pipeline", label: "Pipeline" }
    ]
  },
  {
    id: "projects",
    title: "Projects",
    icon: "ti ti-briefcase",
    items: [
      { path: "/projects-dashboard", label: "Dashboard" },
      { path: "/all-projects", label: "All Projects" },
      { path: "/project-pipeline", label: "Pipeline Board" },
      { path: "/gantt-chart", label: "Gantt Chart" },
      { path: "/project-report", label: "Reports" }
    ]
  },
  {
    id: "omnichannel",
    title: "Omnichannel Hub",
    icon: "ti ti-message-circle",
    items: [
      { 
        path: "#", 
        label: "WhatsApp", 
        subMenu: [
          { path: "/chat", label: "Inbox" },
          { path: "/whatsapp-automation-dashboard", label: "Automation Dashboard" }
        ]
      },
      { path: "/call-dialer", label: "Call Dialer" },
      { path: "/email", label: "Email Inbox" },
      { path: "/sms-inbox", label: "SMS Inbox" }
    ]
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: "ti ti-shopping-cart",
    items: [
      { path: "/orders", label: "Orders" },
      { path: "/customers", label: "Customers" },
      { path: "/products", label: "Products" },
      { path: "/inventory", label: "Inventory" }
    ]
  },
  {
    id: "finance",
    title: "Finance & Billing",
    icon: "ti ti-file-invoice",
    items: [
      { path: "/billing-dashboard", label: "Billing Dashboard" },
      { path: "/invoices", label: "Invoices" },
      { path: "/quotes", label: "Quotes" },
      { path: "/payments", label: "Payments" },
      { path: "/ledger", label: "Ledger" },
      { path: "/expenses", label: "Expenses" }
    ]
  },
  {
    id: "hrms",
    title: "HRMS & Payroll",
    icon: "ti ti-users",
    items: [
      { path: "/hrms-dashboard", label: "HRMS Dashboard" },
      { path: "/directory", label: "Directory" },
      { path: "/attendance", label: "Attendance" },
      { path: "/leaves", label: "Leaves" }
    ]
  },
  {
    id: "tasks",
    title: "Tasks & Calendar",
    icon: "ti ti-clipboard-list",
    items: [
      { path: "/task-board", label: "Task Board" },
      { path: "/reminders", label: "Reminders" }
    ]
  },
  {
    id: "admin",
    title: "Admin Console",
    icon: "ti ti-settings",
    items: [
      { path: "/user-management", label: "User Management" },
      { path: "/roles-permissions", label: "Roles & Permissions" },
      { path: "/audit-log", label: "Audit Logs" }
    ]
  }
];
