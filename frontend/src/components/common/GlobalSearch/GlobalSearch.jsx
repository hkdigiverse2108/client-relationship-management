import React, { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiFile, FiUser, FiTarget, FiX, FiBriefcase, FiUsers, FiFolder } from "react-icons/fi";
import { NAV_SECTIONS } from "@/config/navConfig";
import { useAuth } from "@/context/AuthContext";
import { leadService } from "@/api/services/leadService";
import { userService } from "@/api/services/userService";
import { contactService } from "@/api/services/contactService";
import { clientService } from "@/api/services/clientService";
import "./GlobalSearch.css";

export default function GlobalSearch() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch data only once when first opened
  useEffect(() => {
    if (isOpen && leads.length === 0) {
      leadService.list().then(setLeads).catch(() => setLeads([]));
      userService.getList().then(res => setUsers(res || [])).catch(() => setUsers([]));
      contactService.list().then(res => setContacts(res?.data || res || [])).catch(() => setContacts([]));
      clientService.list().then(res => setClients(res?.data || res || [])).catch(() => setClients([]));
    }
  }, [isOpen]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
        path: `/leads`,
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

    const filteredContacts = Array.isArray(contacts) ? contacts.filter(c => 
      c.contact_name?.toLowerCase().includes(q) ||
      c.company_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    ).map(c => ({
      type: "contact",
      id: c.id || c._id,
      title: c.contact_name,
      subtitle: c.company_name || c.email || "Contact",
      path: `/contacts`,
      icon: FiUsers
    })) : [];

    const filteredClients = Array.isArray(clients) ? clients.filter(c => 
      c.client_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q)
    ).map(c => ({
      type: "client",
      id: c.id || c._id,
      title: c.client_name,
      subtitle: c.email || "Client",
      path: `/clients`,
      icon: FiBriefcase
    })) : [];

    return [...filteredPages, ...filteredLeads, ...filteredUsers, ...filteredContacts, ...filteredClients].slice(0, 15);
  }, [query, pages, leads, users, contacts, clients]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === "Escape") {
        setIsOpen(false);
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
  }, [isOpen, results, activeIndex]);

  const handleSelect = (item) => {
    navigate(item.path);
    setIsOpen(false);
    setQuery("");
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="aio-inline-search-container" ref={wrapperRef}>
      <div className="aio-header__search">
        <FiSearch className="aio-header__search-icon" />
        <input
          ref={inputRef}
          type="text"
          className="aio-header__search-input"
          placeholder="Search CRM (contacts, leads, bills...)"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActiveIndex(0);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button className="aio-inline-search-clear" onClick={() => { setQuery(""); setIsOpen(false); }}>
            <FiX />
          </button>
        )}
      </div>

      {isOpen && query.trim() !== "" && (
        <div className="aio-inline-search-dropdown">
          {results.length === 0 ? (
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
      )}
    </div>
  );
}
