import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiFile, FiUser, FiTarget, FiX, FiBriefcase, FiUsers, FiFolder } from 'react-icons/fi';
import axiosClient from '../../api/axiosClient';
import './GlobalSearch.css';

export default function GlobalSearch() {
  const navigate = useNavigate();
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  
  // States for API data
  const [leads, setLeads] = useState([]);
  const [users, setUsers] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [clients, setClients] = useState([]);
  const [projects, setProjects] = useState([]);
  
  const [activeIndex, setActiveIndex] = useState(0);

  // Fetch data only once when first opened
  useEffect(() => {
    if (isOpen && leads.length === 0) {
      // Fetching all entities in parallel just like the old logic
      axiosClient.get('/leads').then(res => setLeads(res?.data || res || [])).catch(() => setLeads([]));
      axiosClient.get('/users').then(res => setUsers(res?.data || res || [])).catch(() => setUsers([]));
      axiosClient.get('/contacts').then(res => setContacts(res?.data || res || [])).catch(() => setContacts([]));
      axiosClient.get('/clients').then(res => setClients(res?.data || res || [])).catch(() => setClients([]));
      axiosClient.get('/projects').then(res => setProjects(res?.data || res || [])).catch(() => setProjects([]));
    }
  }, [isOpen]);

  // Handle outside click to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Hardcoded pages since NAV_SECTIONS isn't strictly defined in the new CRM
  const pages = useMemo(() => [
    { type: 'page', id: 'dashboard', title: 'Dashboard', subtitle: 'Main', path: '/', icon: FiFile },
    { type: 'page', id: 'contacts', title: 'Contacts', subtitle: 'CRM', path: '/contacts', icon: FiUsers },
    { type: 'page', id: 'companies', title: 'Companies', subtitle: 'CRM', path: '/companies-grid', icon: FiBriefcase },
    { type: 'page', id: 'leads', title: 'Leads', subtitle: 'CRM', path: '/leads', icon: FiTarget },
    { type: 'page', id: 'projects', title: 'Projects', subtitle: 'Projects', path: '/projects', icon: FiFolder },
    { type: 'page', id: 'tasks', title: 'Tasks', subtitle: 'Projects', path: '/tasks', icon: FiFile }
  ], []);

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
        type: 'lead',
        id: l.id,
        title: l.name,
        subtitle: l.company || l.email || 'No company',
        path: `/leads`,
        icon: FiTarget
      }));

    const filteredUsers = users
      .filter(u => 
        u.name?.toLowerCase().includes(q) || 
        u.email?.toLowerCase().includes(q)
      )
      .map(u => ({
        type: 'user',
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
      type: 'contact',
      id: c.id || c._id,
      title: c.contact_name,
      subtitle: c.company_name || c.email || 'Contact',
      path: `/contacts`,
      icon: FiUsers
    })) : [];

    const filteredClients = Array.isArray(clients) ? clients.filter(c => 
      c.client_name?.toLowerCase().includes(q) ||
      c.company_name?.toLowerCase().includes(q) ||
      c.email?.toLowerCase().includes(q) ||
      c.mobile_number?.includes(q)
    ).map(c => ({
      type: 'client',
      id: c.id || c._id,
      title: c.client_name || c.company_name,
      subtitle: c.company_name ? `${c.company_name} - ${c.email}` : c.email || 'Client',
      path: `/client-details/${c.id || c._id}`,
      icon: FiBriefcase
    })) : [];

    const filteredProjects = Array.isArray(projects) ? projects.filter(p => 
      p.title?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    ).map(p => ({
      type: 'project',
      id: p.id || p._id,
      title: p.title,
      subtitle: 'Project',
      path: `/all-projects`,
      icon: FiFolder
    })) : [];

    return [...filteredPages, ...filteredLeads, ...filteredUsers, ...filteredContacts, ...filteredClients, ...filteredProjects].slice(0, 15);
  }, [query, pages, leads, users, contacts, clients, projects]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      
      if (e.key === 'Escape') {
        setIsOpen(false);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex(prev => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (results[activeIndex]) {
          handleSelect(results[activeIndex]);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, activeIndex]);

  const handleSelect = (item) => {
    navigate(item.path);
    setIsOpen(false);
    setQuery('');
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  return (
    <div className="input-group input-group-flat d-inline-flex me-2 position-relative global-search-wrapper" ref={wrapperRef}>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Search in CRM..."
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setActiveIndex(0);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={() => setIsOpen(true)}
      />
      {query && (
        <span className="input-group-text bg-transparent border-start-0 px-2 cursor-pointer" onClick={() => { setQuery(''); setIsOpen(false); }}>
          <FiX className="text-muted" />
        </span>
      )}

      {isOpen && query.trim() !== '' && (
        <div className="global-search-dropdown shadow-sm border rounded bg-white position-absolute w-100 mt-1">
          {results.length === 0 ? (
            <div className="p-3 text-muted text-center fs-14">No results found for "{query}"</div>
          ) : (
            <div className="search-results-list">
              {results.map((item, idx) => (
                <div
                  key={`${item.type}-${item.id}`}
                  className={`search-result-item d-flex align-items-center p-2 cursor-pointer ${idx === activeIndex ? 'bg-light' : ''}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onClick={() => handleSelect(item)}
                >
                  <div className="search-result-icon text-primary me-3 bg-primary-transparent rounded p-2 d-flex align-items-center justify-content-center">
                    <item.icon size={16} />
                  </div>
                  <div className="search-result-content flex-grow-1">
                    <h6 className="mb-0 fs-13 fw-semibold">{item.title}</h6>
                    <p className="mb-0 fs-11 text-muted">{item.subtitle}</p>
                  </div>
                  <span className="badge bg-light text-muted border fs-10">{item.type}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
