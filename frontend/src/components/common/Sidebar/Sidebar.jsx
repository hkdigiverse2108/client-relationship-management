import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FiChevronDown, FiSidebar, } from "react-icons/fi";
import { NAV_SECTIONS } from "@/config/navConfig";
import { useSidebar } from "@/context/SidebarContext";
import { classNames } from "@/utils/helpers";
import "./Sidebar.css";

// Helper: check if a section has any active child link
function sectionHasActiveChild(section, pathname) {
  return section.items.some((item) => {
    if (item.subItems) {
      return item.subItems.some((sub) => pathname === sub.path);
    }
    return pathname === item.path;
  });
}

// Helper: check if a subgroup has any active child link
function subGroupHasActiveChild(item, pathname) {
  if (!item.subItems) return false;
  return item.subItems.some((sub) => pathname === sub.path);
}

import { useAuth } from "@/context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();
  const { collapsed, toggleCollapsed, mobileOpen, closeMobile } = useSidebar();
  const location = useLocation();

  // Keep track of expanded sections and sub-groups
  const [openSections, setOpenSections] = useState({
    dashboards: true,
    crm: true,
    projects: true,
    omnichannel: true,
    ecommerce: true,
  });

  const [openSubGroups, setOpenSubGroups] = useState({
    whatsapp: true,
  });

  const toggleSection = (id) => {
    setOpenSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSubGroup = (id) => {
    setOpenSubGroups((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      {mobileOpen && <div className="aio-sidebar__backdrop" onClick={closeMobile} />}
      <aside
        className={classNames(
          "aio-sidebar",
          collapsed && "is-collapsed",
          mobileOpen && "is-mobile-open"
        )}
      >
        {/* Brand Header */}
        <div className="aio-sidebar__brand">
          <div className="aio-sidebar__logo">A</div>
          <div className="aio-sidebar__brand-text">
            <span className="aio-sidebar__name">AIO CRM Platform</span>
          </div>
          <button
            className="aio-sidebar__collapse"
            onClick={toggleCollapsed}
            aria-label="Toggle sidebar"
          >
            <FiSidebar />
          </button>
        </div>

        {/* Navigation Sections */}
        <nav className="aio-sidebar__nav">
          {NAV_SECTIONS.map((section) => {
            // Apply permission checks
            const perms = user?.permissions || {};
            
            const isSuperAdmin = user?.role === "Super Admin";
            
            // Filter items based on permissions
            const filteredItems = section.items.map(item => {
              if (item.subItems) {
                const filteredSub = item.subItems.filter(sub => isSuperAdmin || perms[sub.path]?.view);
                return filteredSub.length > 0 ? { ...item, subItems: filteredSub } : null;
              } else {
                return isSuperAdmin || perms[item.path]?.view ? item : null;
              }
            }).filter(Boolean);

            if (filteredItems.length === 0) return null;

            const SectionIcon = section.icon;
            const isOpen = !!openSections[section.id];
            
            // Update isActive logic to use filteredItems
            const sectionIsActive = filteredItems.some((item) => {
              if (item.subItems) {
                return item.subItems.some((sub) => location.pathname === sub.path);
              }
              return location.pathname === item.path;
            });

            return (
              <div key={section.id} className="aio-sidebar__section">
                {/* Section Header */}
                <button
                  type="button"
                  className={classNames(
                    "aio-sidebar__section-header",
                    isOpen && "is-open",
                    sectionIsActive && "has-active-child"
                  )}
                  onClick={() => toggleSection(section.id)}
                >
                  <div className="aio-sidebar__section-title-wrap">
                    <SectionIcon className="aio-sidebar__section-icon" />
                    <span className="aio-sidebar__section-title">
                      {section.title}
                    </span>
                  </div>
                  <FiChevronDown className="aio-sidebar__chevron" />
                </button>

                {/* Sub-items Container */}
                {isOpen && (
                  <div className="aio-sidebar__items">
                    {filteredItems.map((item, idx) => {
                      // Sub-group (e.g. WhatsApp)
                      if (item.subItems) {
                        const isSubGroupOpen = !!openSubGroups[item.id];
                        const subGroupIsActive = subGroupHasActiveChild(item, location.pathname);
                        return (
                          <div key={item.id || idx} className="aio-sidebar__subgroup">
                            <button
                              type="button"
                              className={classNames(
                                "aio-sidebar__subgroup-header",
                                isSubGroupOpen && "is-open",
                                subGroupIsActive && "has-active-child"
                              )}
                              onClick={() => toggleSubGroup(item.id)}
                            >
                              <span className="aio-sidebar__subgroup-label">
                                {item.label}
                              </span>
                              <FiChevronDown className="aio-sidebar__chevron-sm" />
                            </button>

                            {isSubGroupOpen && (
                              <div className="aio-sidebar__subitems">
                                {item.subItems.map((sub, sIdx) => (
                                  <NavLink
                                    key={sub.path + sIdx}
                                    to={sub.path}
                                    onClick={closeMobile}
                                    className={({ isActive }) =>
                                      classNames(
                                        "aio-sidebar__link",
                                        "aio-sidebar__link--nested",
                                        isActive &&
                                          location.pathname === sub.path &&
                                          "is-active"
                                      )
                                    }
                                  >
                                    <span className="aio-sidebar__label">
                                      
                                      {sub.label}
                                    </span>
                                  </NavLink>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      }

                      // Regular Item
                      return (
                        <NavLink
                          key={item.label + idx}
                          to={item.path}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            classNames(
                              "aio-sidebar__link",
                              isActive &&
                                location.pathname === item.path &&
                                "is-active"
                            )
                          }
                          end={item.path === "/dashboard"}
                        >
                          <span className="aio-sidebar__label">{item.icon && <item.icon className="aio-sidebar__item-icon" />}{item.label}</span>
                        </NavLink>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

       
      </aside>
    </>
  );
}