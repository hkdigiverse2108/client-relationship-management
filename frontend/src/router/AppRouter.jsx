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

const FallbackPreloader = () => (
  <div className="crm-preloader-container" style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#f8fafc" }}>
    <svg width="260" height="260" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
      <line x1="30" y1="150" x2="170" y2="150" stroke="#cbd5e1" strokeWidth="4" strokeLinecap="round" />
      <rect x="52" y="100" width="24" height="50" rx="4" fill="#bae6fd">
        <animate attributeName="y" values="100;70;100" dur="2s" repeatCount="indefinite" />
        <animate attributeName="height" values="50;80;50" dur="2s" repeatCount="indefinite" />
      </rect>
      <rect x="88" y="75" width="24" height="75" rx="4" fill="#38bdf8">
        <animate attributeName="y" values="75;45;75" dur="2s" repeatCount="indefinite" begin="0.3s" />
        <animate attributeName="height" values="75;105;75" dur="2s" repeatCount="indefinite" begin="0.3s" />
      </rect>
      <rect x="124" y="45" width="24" height="105" rx="4" fill="#0284c7">
        <animate attributeName="y" values="45;20;45" dur="2s" repeatCount="indefinite" begin="0.6s" />
        <animate attributeName="height" values="105;130;105" dur="2s" repeatCount="indefinite" begin="0.6s" />
      </rect>
    </svg>
  </div>
);

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
const AuditLog = lazy(() => import("@/pages/Audit/AuditLog"));
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
        <Route path="/customers" element={<Customers/>}/>
      </Route>
      <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}