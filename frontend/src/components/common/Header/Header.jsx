import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMoon,
  FiSun,
  FiLogOut,
  FiSettings,
  FiPlus,
  FiChevronDown,
  FiTarget,
  FiFileText,
} from "react-icons/fi";
import { useSidebar } from "@/context/SidebarContext";
import { useTheme } from "@/context/ThemeContext";
import { useAppearance } from "@/context/AppearanceContext";
import { useAuth } from "@/context/AuthContext";
import { useSearch } from "@/context/SearchContext";
import Avatar from "@/components/common/Avatar/Avatar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import NotificationDropdown from "./NotificationDropdown";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import GlobalSearch from "@/components/common/GlobalSearch/GlobalSearch";
import toast from "react-hot-toast";
import "./Header.css";
import { LuClipboardList, LuPalette} from "react-icons/lu";
import { getProfilePhotoUrl } from "@/utils/helpers";
import LeadFormModal from "@/pages/Leads/LeadFormModal";
import InvoiceModal from "@/pages/Finance/InvoiceModal";
import TaskFormModal from "@/pages/Tasks/TaskFormModal";
import { leadService } from "@/api/services/leadService";
import api from "@/api/axiosClient";

export default function Header() {
  const { openMobile } = useSidebar();
  const { isDark, setTheme } = useTheme();
  const { applyPreset } = useAppearance();
  const { user, logout } = useAuth();
  const { openSearch } = useSearch();
  const navigate = useNavigate();

  // WhatsApp API Connection status state (ON by default)
  const [waConnected, setWaConnected] = useState(true);

  // Global Quick Action Modal States
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleLeadSubmit = async (data) => {
    setSubmitting(true);
    try {
      await leadService.create(data);
      toast.success("Lead created successfully");
      setLeadModalOpen(false);
      window.dispatchEvent(new Event('refreshData'));
    } catch (error) {
      console.error(error);
      toast.error("Failed to create lead");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTaskSubmit = async (data) => {
    setSubmitting(true);
    try {
      await api.post("/tasks", data);
      toast.success("Task created successfully");
      setTaskModalOpen(false);
      window.dispatchEvent(new Event('refreshData'));
    } catch (error) {
      console.error(error);
      toast.error("Failed to create task");
    } finally {
      setSubmitting(false);
    }
  };

  const handleInvoiceSave = () => {
    setInvoiceModalOpen(false);
    window.dispatchEvent(new Event('refreshData'));
  };

  const toggleWaApi = () => {
    if (waConnected) {
      setWaConnected(false);
      toast.error("Whatsapp API disconnected");
    } else {
      setWaConnected(true);
      toast.success("Whatsapp API Connection Restored");
    }
  };

  const handleToggleTheme = () => {
    if (isDark) {
      setTheme("light");
      applyPreset("default");
    } else {
      setTheme("dark");
      applyPreset("corporate");
    }
  };

  const handleLogout = async () => {
    const ok = await confirmDialog({
      title: "Sign out?",
      text: "You will be returned to the login screen.",
      confirmText: "Sign out",
      icon: "question",
    });
    if (!ok) return;
    await logout();
    toast.success("Signed out");
    navigate("/login", { replace: true });
  };

  return (
    <header className="aio-header">
      <div className="aio-header__left">
        <button className="aio-header__menu" onClick={openMobile} aria-label="Open navigation">
          <FiMenu />
        </button>
      </div>

      <div className="aio-header__center">
        <GlobalSearch />
      </div>

      <div className="aio-header__right">
        {/* WhatsApp API Connection Toggle Pill */}
        <button
          className={`aio-header__wa-pill ${waConnected ? "is-connected" : "is-disconnected"}`}
          onClick={toggleWaApi}
          title={waConnected ? "Click to disconnect WhatsApp API" : "Click to connect WhatsApp API"}
          aria-label="WhatsApp API Connection Toggle"
        >
          <span className={`aio-header__wa-dot ${waConnected ? "is-connected" : "is-disconnected"}`} />
          {waConnected ? null : <span className="aio-header__wa-text">WA API</span>}
        </button>

        {/* Quick Action Dropdown */}
        <Dropdown
          align="right"
          trigger={({ onClick }) => (
            <button className="aio-header__quick-action" onClick={onClick} aria-label="Quick Action">
              <FiPlus className="aio-header__quick-icon" />
              <span>Quick Action</span>
              <FiChevronDown className="aio-header__quick-chevron" />
            </button>
          )}
          items={[
            { type: "header", label: "CREATE NEW" },
            { label: "New Lead", icon: FiTarget, onClick: () => setLeadModalOpen(true) },
            { label: "New Invoice", icon: FiFileText, onClick: () => setInvoiceModalOpen(true) },
            { label: "New Task", icon: LuClipboardList, onClick: () => setTaskModalOpen(true) },
          ]}
        />

        {/* Notifications Dropdown */}
        <NotificationDropdown />

        {/* Theme Toggle Icon */}
        <button className="aio-header__icon-btn" onClick={handleToggleTheme} aria-label="Toggle theme">
          {isDark ? <FiSun /> : <FiMoon />}
        </button>

        {/* Settings Icon */}
        <button className="aio-header__icon-btn" onClick={() => navigate("/settings")} aria-label="Settings">
          <FiSettings />
        </button>

        {/* Vertical Divider */}
        <div className="aio-header__divider" />

        {/* User Profile Dropdown */}
        <Dropdown
          align="right"
          trigger={({ onClick }) => (
            <button className="aio-header__user" onClick={onClick}>
              <Avatar name={user?.name || "Pratvi Jikadra"} src={getProfilePhotoUrl(user?.profile_photo)} size={36} />
              <div className="aio-header__user-info">
                <span className="aio-header__user-name">{user?.name || "Pratvi Jikadra"}</span>
                <span className="aio-header__user-role">{user?.role || "Admin"}</span>
              </div>
              <FiChevronDown className="aio-header__user-chevron" />
            </button>
          )}
          items={[
            {
              type: "user",
              name: user?.name || "Pratvi Jikadra",
              email: user?.email || "pratvi@gmail.com",
            },
            { type: "divider" },
            { label: "Appearance & Theme", icon: LuPalette, onClick: () => navigate("/appearance") },
            { type: "divider" },
            { label: "Sign out", icon: FiLogOut, onClick: handleLogout, danger: true },
          ]}
        />
      </div>

      {/* Global Modals for Quick Actions */}
      <LeadFormModal 
        open={leadModalOpen} 
        onClose={() => setLeadModalOpen(false)} 
        onSubmit={handleLeadSubmit} 
        submitting={submitting} 
      />
      <InvoiceModal 
        isOpen={invoiceModalOpen} 
        onClose={() => setInvoiceModalOpen(false)} 
        onSave={handleInvoiceSave} 
      />
      <TaskFormModal 
        open={taskModalOpen} 
        onClose={() => setTaskModalOpen(false)} 
        onSubmit={handleTaskSubmit} 
        submitting={submitting} 
      />
    </header>
  );
}