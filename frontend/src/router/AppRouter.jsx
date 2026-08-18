import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import AuthLayout from "@/layouts/AuthLayout/AuthLayout";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import ForgotPassword from "@/pages/Auth/ForgotPassword";
import Dashboard from "@/pages/Dashboard/Dashboard";
import LeadsList from "@/pages/Leads/LeadsList";
import ClientsList from "@/pages/Clients/ClientsList";
import ClientProfile from "@/pages/Clients/ClientProfile";
import ClientDetailsPage from "@/pages/Clients/ClientDetailsPage";
import ContactsList from "@/pages/Contacts/ContactsList";
import Pipeline from "@/pages/Pipeline/Pipeline";
import TasksList from "@/pages/Tasks/TasksList";
import RemindersList from "@/pages/Reminders/RemindersList";
import Calendar from "@/pages/Calendar/Calendar";
import Reports from "@/pages/Reports/Reports";
import Settings from "@/pages/Settings/Settings";
import Appearance from "@/pages/Settings/Appearance";
import NotFound from "@/pages/NotFound";
import Sales from "@/pages/Dashboard/Sales";
import Team from "@/pages/Dashboard/Team";
import Analytics from "@/pages/Dashboard/Analytics";
import ProjectDashboard from "@/pages/Project/ProjectDashboard";
import AllProjects from "@/pages/Project/AllProjects";
import PipelineBoard from "@/pages/Project/PipelineBoard";
import GanttChart from "@/pages/Project/GanttChart";
import Orders from "@/pages/Ecommerce/Orders";
import Products from "@/pages/Ecommerce/Products";
import Customers from "@/pages/Ecommerce/Customers";
import AuditLog from "@/pages/Audit/AuditLog";
import UserManagementPage from "@/pages/Settings/UserManagementPage";
import RolesPermissionsPage from "@/pages/Settings/RolesPermissionsPage";

export default function AppRouter() {
  return (
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
  );
}