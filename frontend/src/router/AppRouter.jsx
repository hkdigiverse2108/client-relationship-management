import { Suspense, lazy, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";

// Component to hide the global preloader smoothly once React is fully loaded
const HidePreloader = () => {
  useEffect(() => {
    const preloader = document.getElementById("global-preloader");
    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.parentNode.removeChild(preloader);
        }
      }, 500); // Matches the CSS transition duration
    }
  }, []);
  return null;
};

const FallbackPreloader = () => {
  // If the global preloader from index.html is still active, don't show a second one to prevent animation blinking
  if (document.getElementById("global-preloader")) {
    return null;
  }
  
  return (
    <div className="crm-preloader-container" style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc" }}>
      <div className="crm-loader-chart">
        <div className="crm-loader-bar crm-bar1"></div>
        <div className="crm-loader-bar crm-bar2"></div>
        <div className="crm-loader-bar crm-bar3"></div>
        <div className="crm-loader-base"></div>
      </div>
    </div>
  );
};

// Lazy loaded pages
const Login = lazy(() => import("@/pages/Auth/Login"));
const Register = lazy(() => import("@/pages/Auth/Register"));
const ForgotPassword = lazy(() => import("@/pages/Auth/ForgotPassword"));
const Dashboard = lazy(() => import("@/pages/Dashboard/Dashboard"));
const LeadsList = lazy(() => import("@/pages/Leads/LeadsList"));
const ClientsList = lazy(() => import("@/pages/Clients/ClientsList"));
const ClientProfile = lazy(() => import("@/pages/Clients/ClientProfile"));
const ClientDetailsPage = lazy(() => import("@/pages/Clients/ClientDetailsPage"));
const ContactsList = lazy(() => import("@/pages/Contacts/ContactsList"));
const Pipeline = lazy(() => import("@/pages/Pipeline/Pipeline"));
const TasksList = lazy(() => import("@/pages/Tasks/TasksList"));
const RemindersList = lazy(() => import("@/pages/Reminders/RemindersList"));
const Calendar = lazy(() => import("@/pages/Calendar/Calendar"));
const Reports = lazy(() => import("@/pages/Reports/Reports"));
const Settings = lazy(() => import("@/pages/Settings/Settings"));
const Appearance = lazy(() => import("@/pages/Settings/Appearance"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Sales = lazy(() => import("@/pages/Dashboard/Sales"));
const Team = lazy(() => import("@/pages/Dashboard/Team"));
const Analytics = lazy(() => import("@/pages/Dashboard/Analytics"));
const ProjectDashboard = lazy(() => import("@/pages/Project/ProjectDashboard"));
const AllProjects = lazy(() => import("@/pages/Project/AllProjects"));
const PipelineBoard = lazy(() => import("@/pages/Project/PipelineBoard"));
const GanttChart = lazy(() => import("@/pages/Project/GanttChart"));
const Orders = lazy(() => import("@/pages/Ecommerce/Orders"));
const Products = lazy(() => import("@/pages/Ecommerce/Products"));
const Customers = lazy(() => import("@/pages/Ecommerce/Customers"));
const Inventory = lazy(() => import("@/pages/Ecommerce/Inventory"));
const AbandonedCarts = lazy(() => import("@/pages/Ecommerce/AbandonedCarts"));
const AuditLog = lazy(() => import("@/pages/Audit/AuditLog"));
const BillingDashboard = lazy(() => import("@/pages/Finance/BillingDashboard"));
const InvoiceList = lazy(() => import("@/pages/Finance/InvoiceList"));
const QuotesList = lazy(() => import("@/pages/Finance/QuotesList"));
const PaymentsList = lazy(() => import("@/pages/Finance/PaymentsList"));
const Ledger = lazy(() => import("@/pages/Finance/Ledger"));
const Expenses = lazy(() => import("@/pages/Finance/Expenses"));
const GSTReports = lazy(() => import("@/pages/Finance/GSTReports"));
const UserManagementPage = lazy(() => import("@/pages/Settings/UserManagementPage"));
const RolesPermissionsPage = lazy(() => import("@/pages/Settings/RolesPermissionsPage"));

export default function AppRouter() {
  return (
    <Suspense fallback={<FallbackPreloader />}>
      <HidePreloader />
      <Routes>
      {/* Public / auth routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>
      {/* Protected app routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sales"     element={<Sales />} />
        <Route path="/team"     element={<Team />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/leads"     element={<LeadsList />} />
        <Route path="/clients"   element={<ClientsList />} />
        <Route path="/clients/:id" element={<ClientProfile />} />
        <Route path="/client-details/:id" element={<ClientDetailsPage />} />
        <Route path="/contacts"  element={<ContactsList />} />
        <Route path="/pipeline"     element={<Pipeline />} />
        <Route path="/tasks"     element={<TasksList />} />
        <Route path="/reminders" element={<RemindersList />} />
        <Route path="/calendar"  element={<Calendar />} />
        <Route path="/reports"   element={<Reports />} />
        <Route path="/settings"  element={<Settings />} />
        <Route path="/appearance" element={<Appearance />} />
        <Route path="/user-management" element={<UserManagementPage />} />
        <Route path="/roles-and-permissions" element={<RolesPermissionsPage />} />
        <Route path="/audit-log" element={<AuditLog />} />
        <Route path="/projects-dashboard"  element={<ProjectDashboard />} />
        <Route path="/all-projects"  element={<AllProjects />} />
        <Route path="/pipeline-board"  element={<PipelineBoard />} />
        <Route path="/gantt-chart" element={<GanttChart />} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/products" element={<Products/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/customers" element={<Customers/>}/>
        <Route path="/abandoned-carts" element={<AbandonedCarts/>}/>
        <Route path="/billing-dashboard" element={<BillingDashboard />} />
        <Route path="/invoices" element={<InvoiceList />} />
        <Route path="/quotes" element={<QuotesList />} />
        <Route path="/payments" element={<PaymentsList />} />
        <Route path="/ledger" element={<Ledger />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/gst-reports" element={<GSTReports />} />
      </Route>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}