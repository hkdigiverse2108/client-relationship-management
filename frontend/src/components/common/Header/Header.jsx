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
import { useAuth } from "@/context/AuthContext";
import Avatar from "@/components/common/Avatar/Avatar";
import Dropdown from "@/components/common/Dropdown/Dropdown";
import { confirmDialog } from "@/components/common/ConfirmDialog/confirmDialog";
import toast from "react-hot-toast";
import "./Header.css";
import { LuClipboardList, LuPalette} from "react-icons/lu";
import { getProfilePhotoUrl } from "@/utils/helpers";

export default function Header() {
  const { openMobile } = useSidebar();
  const { isDark, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // WhatsApp API Connection status state (ON by default)
  const [waConnected, setWaConnected] = useState(true);

  const toggleWaApi = () => {
    if (waConnected) {
      setWaConnected(false);
      toast.error("Whatsapp API disconnected");
    } else {
      setWaConnected(true);
      toast.success("Whatsapp API Connection Restored");
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
        <div className="aio-header__search">
          <FiSearch className="aio-header__search-icon" />
          <input
            type="text"
            placeholder="Search CRM (contacts, leads, bills...)"
            className="aio-header__search-input"
          />
          <kbd className="aio-header__kbd">Ctrl + K</kbd>
        </div>
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
            { label: "New Lead", icon: FiTarget, onClick: () => navigate("/leads") },
            { label: "New Invoice", icon: FiFileText, onClick: () => navigate("/invoices") },
            { label: "New Task", icon: LuClipboardList, onClick: () => navigate("/tasks") },
          ]}
        />

        {/* Notifications Icon */}
        <button className="aio-header__icon-btn" aria-label="Notifications">
          <FiBell />
        </button>

        {/* Theme Toggle Icon */}
        <button className="aio-header__icon-btn" onClick={toggleTheme} aria-label="Toggle theme">
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
            {
              label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
              icon: isDark ? FiSun : FiMoon,
              onClick: toggleTheme,
            },
            { label: "Appearance & Theme", icon: LuPalette, onClick: () => navigate("/appearance") },
            { type: "divider" },
            { label: "Sign out", icon: FiLogOut, onClick: handleLogout, danger: true },
          ]}
        />
      </div>
    </header>
  );
}