import { Outlet } from "react-router-dom";
import Sidebar from "@/components/common/Sidebar/Sidebar";
import Header from "@/components/common/Header/Header";
import { useSidebar } from "@/context/SidebarContext";
import { classNames } from "@/utils/helpers";
import "./MainLayout.css";
export default function MainLayout() {
  const { collapsed } = useSidebar();
  return (
    <div className={classNames("aio-shell", collapsed && "is-collapsed")}>
      <Sidebar />
      <div className="aio-shell__main">
        <Header />
        <main className="aio-shell__content">
          <div className="aio-shell__container fade-in">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}