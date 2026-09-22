export const auditLogData = [
  {
    id: 1,
    timestamp: "2024-10-24T10:30:00",
    user_name: "Anthony Lewis",
    action: "Create User",
    module: "User Management",
    details: "Created a new user 'Jane Doe' with role 'HR'.",
    ip_address: "192.168.1.15",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg"
  },
  {
    id: 2,
    timestamp: "2024-10-24T11:15:22",
    user_name: "Brian Villalobos",
    action: "Update Role",
    module: "Roles & Permissions",
    details: "Updated permissions for role 'Manager'.",
    ip_address: "192.168.1.42"
  },
  {
    id: 3,
    timestamp: "2024-10-24T14:05:10",
    user_name: "Harvey Smith",
    action: "Delete Contact",
    module: "Contacts",
    details: "Deleted contact 'Acme Corp'.",
    ip_address: "10.0.0.22"
  },
  {
    id: 4,
    timestamp: "2024-10-23T09:20:00",
    user_name: "Stephan Peralt",
    action: "Login",
    module: "Authentication",
    details: "Successful login.",
    ip_address: "192.168.1.55",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg"
  },
  {
    id: 5,
    timestamp: "2024-10-23T16:45:33",
    user_name: "System",
    action: "Run Cronjob",
    module: "System",
    details: "Executed daily backup cronjob successfully.",
    ip_address: "127.0.0.1",
    avatar: null
  },
  {
    id: 6,
    timestamp: "2024-10-22T08:12:15",
    user_name: "Anthony Lewis",
    action: "Update Settings",
    module: "White Label Settings",
    details: "Changed company logo.",
    ip_address: "192.168.1.15"
  },
  {
    id: 7,
    timestamp: "2024-10-22T13:40:05",
    user_name: "Brian Villalobos",
    action: "Create Lead",
    module: "Leads",
    details: "Created new lead 'Tech Innovations'.",
    ip_address: "192.168.1.42"
  },
  {
    id: 8,
    timestamp: "2024-10-21T15:25:50",
    user_name: "Harvey Smith",
    action: "Export Report",
    module: "Analytics",
    details: "Exported Sales report as PDF.",
    ip_address: "10.0.0.22"
  }
];
