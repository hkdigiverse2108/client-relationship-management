import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CustomDataTable from './common/CustomDataTable';
import CustomDatePicker from './common/CustomDatePicker';

import { APP_CONFIG } from '../config/appConfig';
import axiosClient from '../api/axiosClient';

const getInitials = (name) => {
  if (!name) return '??';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const TeamRosterTable = ({ data = [] }) => {
  const [selectedRole, setSelectedRole] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    if (dateRange && dateRange[0] && dateRange[1]) {
      const fetchByDate = async () => {
        try {
          const sd = dateRange[0].toISOString();
          const ed = dateRange[1].toISOString();
          const res = await axiosClient.get(`/dashboard/team-metrics?start_date=${sd}&end_date=${ed}`);
          setLocalData(res.data?.workload || []);
        } catch (e) {
          console.error("Error fetching filtered roster data:", e);
        }
      };
      fetchByDate();
    } else {
      setLocalData(null);
    }
  }, [dateRange]);

  const activeData = localData || data;

  const uniqueRoles = useMemo(() => {
    const roles = activeData.map(r => r.role).filter(Boolean);
    return [...new Set(roles)].sort();
  }, [activeData]);

  const filteredData = useMemo(() => {
    let filtered = activeData.filter(row => row.total_items > 0);
    if (selectedRole) {
      filtered = filtered.filter(row => row.role === selectedRole);
    }
    return filtered;
  }, [activeData, selectedRole]);

  const columns = [
    {
      name: 'NAME',
      sortable: true,
      selector: row => row.name,
      cell: row => (
        <div className="d-flex align-items-center file-name-icon">
          <Link to="#" className="avatar avatar-md border avatar-rounded d-flex align-items-center justify-content-center bg-primary text-white" title={row.name}>
            {row.profile_photo ? (
              <img src={row.profile_photo.startsWith('http') ? row.profile_photo : `${APP_CONFIG.apiBaseUrl.replace('/api/v1', '')}${row.profile_photo.startsWith('/') ? '' : '/'}${row.profile_photo}`} className="w-100 h-100 rounded-circle" style={{objectFit: 'cover'}} alt={row.name} />
            ) : (
              <span className="fs-12 fw-bold">{getInitials(row.name)}</span>
            )}
          </Link>
          <div className="ms-2">
            <h6 className="fw-medium fs-14"><Link to="#" title={row.name}>{row.name}</Link></h6>
          </div>
        </div>
      )
    },
    {
      name: 'ROLE',
      sortable: true,
      selector: row => row.role,
    },
    {
      name: 'DEALS',
      sortable: true,
      selector: row => row.deals,
    },
    {
      name: 'PROJECTS',
      sortable: true,
      selector: row => row.projects,
    },
    {
      name: 'TASKS',
      sortable: true,
      selector: row => row.tasks,
    },
    {
      name: 'TOTAL ITEMS',
      sortable: true,
      selector: row => row.total_items,
    }
  ];

  return (
    <div className="card flex-fill w-100">
      <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
        <h5>Team Roster</h5>
        <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
          <div className="me-3">
            <CustomDatePicker 
              isRange={true} 
              selected={dateRange[0]}
              startDate={dateRange[0]}
              endDate={dateRange[1]}
              onChange={(update) => setDateRange(update)}
              placeholderText="Select Date" 
            />
          </div>
          <div className="dropdown me-3">
            <Link to="#"
              className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
              data-bs-toggle="dropdown">
              {selectedRole ? `Role: ${selectedRole}` : 'Role'}
            </Link>
            <ul className="dropdown-menu dropdown-menu-end p-3">
              <li>
                <Link to="#" onClick={(e) => { e.preventDefault(); setSelectedRole(null); }} className="dropdown-item rounded-1 fw-bold">All Roles</Link>
              </li>
              {uniqueRoles.map(role => (
                <li key={role}>
                  <Link to="#" onClick={(e) => { e.preventDefault(); setSelectedRole(role); }} className={`dropdown-item rounded-1 ${selectedRole === role ? 'active' : ''}`}>{role}</Link>
                </li>
              ))}
            </ul>
          </div>
          {(selectedRole || (dateRange && dateRange[0] && dateRange[1])) && (
            <div className="me-3">
              <button 
                onClick={() => {
                  setSelectedRole(null);
                  setDateRange([null, null]);
                }} 
                className="btn btn-outline-danger d-inline-flex align-items-center"
              >
                <i className="ti ti-x me-1"></i> Clear
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="card-body p-0 d-flex flex-column">
        <CustomDataTable columns={columns} data={filteredData} defaultRowsPerPage={10} />
      </div>
    </div>
  );
};

export default TeamRosterTable;
