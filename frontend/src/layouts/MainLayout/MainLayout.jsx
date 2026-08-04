import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Header from "@/components/common/Header/Header";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { NAV_SECTIONS } from "@/config/navConfig";
import PermissionDenied from "@/pages/PermissionDenied";
import GlobalSearch from "@/components/common/GlobalSearch/GlobalSearch";
import { classNames } from "@/utils/helpers";
import "./MainLayout.css";

export default function MainLayout() {
  const { collapsed } = useSidebar();
  const { user } = useAuth();
  const location = useLocation();

  const hasPermission = () => {
    if (!user) return false;
    if (user.role === "Super Admin") return true;

    // Helper to check if a path is configured in the permissions matrix (navConfig)
    const isConfiguredPath = (path) => {
      for (const section of NAV_SECTIONS) {
        for (const item of section.items) {
          if (item.path === path) return true;
          if (item.subItems) {
            for (const sub of item.subItems) {
              if (sub.path === path) return true;
            }
          }
        }
      }
      return false;
    };

    if (isConfiguredPath(location.pathname)) {
      if (user.permissions && user.permissions[location.pathname]) {
        return user.permissions[location.pathname].view;
      }
      return false; // Path is configured but user lacks permission
    }

    return true; // Path not part of permission matrix (e.g. general settings)
  };

  const isAllowed = hasPermission();
  return (
    <div className={classNames("aio-shell", collapsed && "is-collapsed")}>
      <GlobalSearch />
      <Sidebar />
      <div className="aio-shell__main">
        <Header />
        <main className="aio-shell__content">
          <div className="aio-shell__container fade-in">
            {isAllowed ? <Outlet /> : <PermissionDenied />}
          </div>
        </main>
      </div>
    </div>
  );
}