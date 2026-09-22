import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

// Auto-generated imports for all 300+ pages






const Analytics = lazy(() => import('./pages/Analytics'));




const AttendanceAdmin = lazy(() => import('./pages/AttendanceAdmin'));
const AttendanceDashboard = lazy(() => import('./pages/AttendanceDashboard'));
const AttendanceEmployee = lazy(() => import('./pages/AttendanceEmployee'));
const AttendanceReport = lazy(() => import('./pages/AttendanceReport'));
const AuditLog = lazy(() => import('./pages/AuditLog'));





const Candidates = lazy(() => import('./pages/Candidates'));
const CandidatesGrid = lazy(() => import('./pages/CandidatesGrid'));
const CandidatesKanban = lazy(() => import('./pages/CandidatesKanban'));


const Chat = lazy(() => import('./pages/Chat'));

const ClientDetails = lazy(() => import('./pages/ClientDetails'));
const Clients = lazy(() => import('./pages/Clients'));
const ClientsGrid = lazy(() => import('./pages/ClientsGrid'));

const CompanyDetails = lazy(() => import('./pages/CompanyDetails'));


const Contacts = lazy(() => import('./pages/Contacts'));
const ContactsGrid = lazy(() => import('./pages/ContactsGrid'));


const Dashboard = lazy(() => import('./pages/Dashboard'));


const Email = lazy(() => import('./pages/Email'));

const EmailVerification = lazy(() => import('./pages/EmailVerification'));
const EmployeeDashboard = lazy(() => import('./pages/EmployeeDashboard'));
const EmployeeDetails = lazy(() => import('./pages/EmployeeDetails'));

const Employees = lazy(() => import('./pages/Employees'));

const Error404 = lazy(() => import('./pages/Error404'));
const Error500 = lazy(() => import('./pages/Error500'));


const Expenses = lazy(() => import('./pages/Expenses'));


const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/ResetPassword'));
const TwoStepVerification = lazy(() => import('./pages/TwoStepVerification'));


const GSTReports = lazy(() => import('./pages/GSTReports'));

const HRMSDashboard = lazy(() => import('./pages/HRMSDashboard'));

const IndexPage = lazy(() => import('./pages/IndexPage'));
const Invoice = lazy(() => import('./pages/Invoice'));
const InvoiceDetails = lazy(() => import('./pages/InvoiceDetails'));

const Invoices = lazy(() => import('./pages/Invoices'));


const Leads = lazy(() => import('./pages/Leads'));

const Leaves = lazy(() => import('./pages/Leaves'));
const LeavesEmployee = lazy(() => import('./pages/LeavesEmployee'));
const LeaveSettings = lazy(() => import('./pages/LeaveSettings'));
const LeaveType = lazy(() => import('./pages/LeaveType'));


const Login = lazy(() => import('./pages/Login'));



const NotificationSettings = lazy(() => import('./pages/NotificationSettings'));

const SalesDashboard = lazy(() => import('./pages/SalesDashboard'));


const Payments = lazy(() => import('./pages/Payments'));



const Pipeline = lazy(() => import('./pages/Pipeline'));
const Policy = lazy(() => import('./pages/Policy'));

const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));

const ProfileSettings = lazy(() => import('./pages/ProfileSettings'));

const ProjectReport = lazy(() => import('./pages/ProjectReport'));
const Projects = lazy(() => import('./pages/Projects'));
const ProjectPipeline = lazy(() => import('./pages/ProjectPipeline'));
const ProjectsGanttChart = lazy(() => import('./pages/ProjectsGanttChart'));
const ProjectDashboard = lazy(() => import('./pages/ProjectDashboard'));
const ProjectsGrid = lazy(() => import('./pages/ProjectsGrid'));



const RecruitmentDashboard = lazy(() => import('./pages/RecruitmentDashboard'));

const Register = lazy(() => import('./pages/Register'));
const Reminders = lazy(() => import('./pages/Reminders'));


const RolesPermissions = lazy(() => import('./pages/RolesPermissions'));
const SalarySettings = lazy(() => import('./pages/SalarySettings'));

const SecuritySettings = lazy(() => import('./pages/SecuritySettings'));


const TaskBoard = lazy(() => import('./pages/TaskBoard'));
const TaskDetails = lazy(() => import('./pages/TaskDetails'));
const TaskReport = lazy(() => import('./pages/TaskReport'));
const Tasks = lazy(() => import('./pages/Tasks'));


const TermsCondition = lazy(() => import('./pages/TermsCondition'));
const Testimonials = lazy(() => import('./pages/Testimonials'));


const UserReport = lazy(() => import('./pages/UserReport'));
const Users = lazy(() => import('./pages/Users'));
const VideoCall = lazy(() => import('./pages/VideoCall'));
const VoiceCall = lazy(() => import('./pages/VoiceCall'));

const Team = lazy(() => import('./pages/Team'));
const Orders = lazy(() => import('./pages/Orders'));
const Customers = lazy(() => import('./pages/Customers'));
const Products = lazy(() => import('./pages/Products'));
const PageNotFound = lazy(() => import('./pages/PageNotFound'));
const Inventory = lazy(() => import('./pages/Inventory'))

const BillingDashboard = lazy(() => import('./pages/BillingDashboard'));
const Quotes = lazy(() => import('./pages/Quotes'));
const Ledger = lazy(() => import('./pages/Ledger'));

/** Redirects already-authenticated users away from login/forgot pages */
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;
  return children;
}

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: { fontFamily: 'inherit', fontSize: '14px' },
          success: { iconTheme: { primary: '#22c55e', secondary: '#fff' } },
          error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
        }}
      />
      <Suspense fallback={<div id="global-loader"><div className="page-loader"></div></div>}>
              <Routes>
        {/* Auth/Standalone Routes - No Layout */}
        <Route path="/error404" element={<Error404 />} />
        <Route path="/error500" element={<Error500 />} />
  

        {/* Guest-only routes: redirect to dashboard if already logged in */}
        <Route path="/login" element={<GuestRoute><Login /></GuestRoute>} />
        <Route path="/forgot-password" element={<GuestRoute><ForgotPassword /></GuestRoute>} />
        <Route path="/reset-password" element={<GuestRoute><ResetPassword /></GuestRoute>} />
        <Route path="/two-step-verification" element={<GuestRoute><TwoStepVerification /></GuestRoute>} />
        <Route path="/register" element={<GuestRoute><Register /></GuestRoute>} />

        {/* Main App Routes - Protected */}
      <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
    
       
       
      
        
      
        <Route path="/analytics" element={<Analytics />} />
      
        <Route path="/audit-log" element={<AuditLog />} />
     
      
        <Route path="/attendance-admin" element={<AttendanceAdmin />} />
        <Route path="/attendance-dashboard" element={<AttendanceDashboard />} />
        <Route path="/attendance-employee" element={<AttendanceEmployee />} />
        <Route path="/attendance-report" element={<AttendanceReport />} />
       
       
       
 
       
     
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/candidates-grid" element={<CandidatesGrid />} />
        <Route path="/candidates-kanban" element={<CandidatesKanban />} />
   
     
        <Route path="/chat" element={<Chat />} />
     


        <Route path="/client-details" element={<ClientDetails />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/clients-grid" element={<ClientsGrid />} />
      

        <Route path="/company-details" element={<CompanyDetails />} />

        <Route path="/contacts" element={<Contacts />} />
        <Route path="/contacts-grid" element={<ContactsGrid />} />

        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
      
        <Route path="/sales" element={<SalesDashboard />} />
        <Route path="/sales-dashboard" element={<SalesDashboard />} />


  
        <Route path="/email" element={<Email />} />
    
        <Route path="/email-verification" element={<EmailVerification />} />
        <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
        <Route path="/employee-details" element={<EmployeeDetails />} />
        <Route path="/attendance" element={<AttendanceAdmin />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/directory" element={<Employees />} />

        <Route path="/team" element={<Team />} />

        <Route path="/expenses" element={<Expenses />} />
 

        
   
        <Route path="/gst-reports" element={<GSTReports />} />
    
        <Route path="/hrms-dashboard" element={<HRMSDashboard />} />
        <Route path="/invoice" element={<Invoice />} />
        <Route path="/invoice-details" element={<InvoiceDetails />} />
        {/* <Route path="/invoices-report" element={<InvoiceReport />} /> */}
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/index-page" element={<IndexPage />} />
        <Route path="/quotes" element={<Quotes />} />

      
        <Route path="/leads" element={<Leads />} />
       

 
        <Route path="/leaves" element={<Leaves />} />
        <Route path="/leaves-employee" element={<LeavesEmployee />} />
        <Route path="/leave-settings" element={<LeaveSettings />} />
        <Route path="/leave-type" element={<LeaveType />} />
        <Route path="/notification-settings" element={<NotificationSettings />} />

        <Route path="/payments" element={<Payments />} />
        <Route path="/ledger" element={<Ledger />} />
       
       
   
        <Route path="/pipeline" element={<Pipeline />} />
        <Route path="/pipeline-board" element={<Pipeline />} />
        <Route path="/policy" element={<Policy />} />
  
       
       
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
     
     
        <Route path="/profile-settings" element={<ProfileSettings />} />
      
        <Route path="/project-report" element={<ProjectReport />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/project-pipeline" element={<ProjectPipeline />} />
        <Route path="/gantt-chart" element={<ProjectsGanttChart />} />
        <Route path="/all-projects" element={<Projects />} />
        <Route path="/project-dashboard" element={<ProjectDashboard />} />
        <Route path="/projects-dashboard" element={<ProjectDashboard />} />
        <Route path="/projects-grid" element={<ProjectsGrid />} />
      

        <Route path="/recruitment-dashboard" element={<RecruitmentDashboard />} />
        <Route path="/reminders" element={<Reminders />} />
       
        <Route path="/reset-password" element={<ResetPassword />} />
      
        <Route path="/roles-permissions" element={<RolesPermissions />} />
        <Route path="/salary-settings" element={<SalarySettings />} />
     
        <Route path="/security-settings" element={<SecuritySettings />} />
       
  
   
       
       
       
        <Route path="/task-board" element={<TaskBoard />} />
        <Route path="/task-details" element={<TaskDetails />} />
        <Route path="/task-report" element={<TaskReport />} />
        <Route path="/tasks" element={<Tasks />} />
        
       
        <Route path="/terms-condition" element={<TermsCondition />} />
        <Route path="/testimonials" element={<Testimonials />} />
      
        <Route path="/two-step-verification" element={<TwoStepVerification />} />
        <Route path="/user-report" element={<UserReport />} />
        <Route path="/user-management" element={<Users />} />
        <Route path="/video-call" element={<VideoCall />} />
        <Route path="/voice-call" element={<VoiceCall />} />
        
        <Route path="/orders" element={<Orders />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/products" element={<Products />} />
        <Route path="/inventory" element={<Inventory />} />
       
        <Route path="/billing-dashboard" element={<BillingDashboard />} />
      </Route>

      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
          </Suspense>
    </>
  );
}

export default App;
