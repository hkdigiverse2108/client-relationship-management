import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiFile, FiUser, FiTarget } from "react-icons/fi";
import { useSearch } from "@/context/SearchContext";
import { NAV_SECTIONS } from "@/config/navConfig";
import { useAuth } from "@/context/AuthContext";
import { leadService } from "@/api/services/leadService";
import { userService } from "@/api/services/userService";
import "./GlobalSearch.css";

export default function GlobalSearch() {
  const { isSearchOpen, closeSearch } = useSearch();
  const { user } = useAuth();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch dynamic data when modal opens
  useEffect(() => {
    if (isSearchOpen) {
      setQuery("");
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      
      // Pre-fetch or fetch on open
      leadService.list().then(setLeads).catch(() => setLeads([]));
      userService.getList().then(res => setUsers(res || [])).catch(() => setUsers([]));
    }
  }, [isSearchOpen]);

  // Flatten and filter pages based on permissions
  const pages = useMemo(() => {
    let allPages = [];
    const perms = user?.permissions || {};
    const isSuperAdmin = user?.role === "Super Admin";

    NAV_SECTIONS.forEach(section => {
      section.items.forEach(item => {
        if (item.subItems) {
          item.subItems.forEach(sub => {
            if (isSuperAdmin || perms[sub.path]?.view) {
              allPages.push({
                type: "page",
                id: sub.path,
                title: sub.label,
                subtitle: `${section.title} > ${item.label}`,
                path: sub.path,
                icon: FiFile
              });
            }
          });
        } else {
          if (isSuperAdmin || perms[item.path]?.view) {
            allPages.push({
              type: "page",
              id: item.path,
              title: item.label,
              subtitle: section.title,
              path: item.path,
              icon: item.icon || FiFile
            });
          }
        }
      });
    });
    return allPages;
  }, [user]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    
    const q = query.toLowerCase();
    
    const filteredPages = pages.filter(p => 
      p.title.toLowerCase().includes(q) || p.subtitle.toLowerCase().includes(q)
    );

    const filteredLeads = leads
      .filter(l => 
        l.name?.toLowerCase().includes(q) || 
        l.company?.toLowerCase().includes(q) ||
        l.email?.toLowerCase().includes(q)
      )
      .map(l => ({
        type: "lead",
        id: l.id,
        title: l.name,
        subtitle: l.company || l.email || "No company",
        path: `/leads`, // Ideally lead details page, but for now navigate to leads
        icon: FiTarget
      }));

    const filteredUsers = users
      .filter(u => 
        u.name?.toLowerCase().includes(q) || 
        u.email?.toLowerCase().includes(q)
      )
      .map(u => ({
        type: "user",
        id: u.id,
        title: u.name,
        subtitle: u.email,
        path: `/user-management`,
        icon: FiUser
      }));

    return [...filteredPages, ...filteredLeads, ...filteredUsers].slice(0, 15);
  }, [query, pages, leads, users]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isSearchOpen) return;
      
      if (e.key === "Escape") {
        closeSearch();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isSearchOpen, results, activeIndex]);

  const handleSelect = (item) => {
    navigate(item.path);
    closeSearch();
  };

  if (!isSearchOpen) return null;

  return (
    <div className="aio-global-search-backdrop" onClick={closeSearch}>
      <div className="aio-global-search-modal" onClick={e => e.stopPropagation()}>
        <div className="aio-global-search-header">
          <FiSearch className="aio-global-search-icon" />
          <input
            ref={inputRef}
            className="aio-global-search-input"
            placeholder="Search pages, leads, users..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActiveIndex(0);
            }}
          />
          <span className="aio-global-search-esc">ESC</span>
        </div>

        <div className="aio-global-search-body">
          {query.trim() === "" ? (
            <div className="aio-global-search-empty">Type to start searching...</div>
          ) : results.length === 0 ? (
            <div className="aio-global-search-empty">No results found for "{query}"</div>
          ) : (
            results.map((item, idx) => (
              <div
                key={`${item.type}-${item.id}`}
                className={`aio-global-search-item ${idx === activeIndex ? "is-active" : ""}`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => handleSelect(item)}
              >
                <div className="aio-global-search-item-icon">
                  <item.icon />
                </div>
                <div className="aio-global-search-item-content">
                  <span className="aio-global-search-item-title">{item.title}</span>
                  <span className="aio-global-search-item-subtitle">{item.subtitle}</span>
                </div>
                <span className="aio-global-search-item-badge">{item.type}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
