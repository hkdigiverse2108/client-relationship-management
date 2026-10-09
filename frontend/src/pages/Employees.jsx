import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import EmployeeForm from '../components/hrms/EmployeeForm';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import toast from 'react-hot-toast';



import axiosClient from '../api/axiosClient';
import { useEffect } from 'react';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  const [confirmStatusModal, setConfirmStatusModal] = useState({ isOpen: false, employee: null });
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({ isOpen: false, employeeId: null });

  const backendUrl = import.meta.env.VITE_APP_API_URL?.replace('/api/v1', '') || 'http://localhost:8000';

  const getInitials = (name) => {
    if (!name) return 'UN';
    const parts = name.split(' ').filter(p => p.length > 0);
    if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return 'UN';
  };

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get('/users');
      setEmployees(res || []);
    } catch (err) {
      toast.error('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  // Live Metrics & Percentages
  const getEmpDate = (emp) => {
    if (emp.created_at) return new Date(emp.created_at);
    if (emp.joining_date) return new Date(emp.joining_date);
    if (emp.id && typeof emp.id === 'string' && emp.id.length === 24) {
      return new Date(parseInt(emp.id.substring(0, 8), 16) * 1000);
    }
    return new Date();
  };

  const currentMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
  const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
  const lastMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth(), 0, 23, 59, 59, 999);

  const currentMonthEmps = employees.filter(e => getEmpDate(e) >= currentMonthStart);
  const lastMonthEmps = employees.filter(e => {
    const d = getEmpDate(e);
    return d >= lastMonthStart && d <= lastMonthEnd;
  });

  const calcPercent = (current, previous) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.is_active).length;
  const inactiveEmployees = employees.filter(e => !e.is_active).length;
  const newJoiners = currentMonthEmps.length;

  const prevTotal = totalEmployees - currentMonthEmps.length;
  const prevActive = activeEmployees - currentMonthEmps.filter(e => e.is_active).length;
  const prevInactive = inactiveEmployees - currentMonthEmps.filter(e => !e.is_active).length;

  const totalPercentage = calcPercent(totalEmployees, prevTotal);
  const activePercentage = calcPercent(activeEmployees, prevActive);
  const inactivePercentage = calcPercent(inactiveEmployees, prevInactive);
  const newJoinersPercentage = calcPercent(currentMonthEmps.length, lastMonthEmps.length);

  const renderPercentageBadge = (percent, baseClass) => {
    const isPositive = percent > 0;
    const isZero = percent === 0;
    const icon = isPositive ? 'ti-arrow-wave-right-up' : (isZero ? 'ti-minus' : 'ti-arrow-wave-right-down');
    
    return (
      <span className={`badge ${baseClass} badge-sm fw-normal`}>
        <i className={`ti ${icon}`}></i>
        {isPositive ? '+' : ''}{percent}%
      </span>
    );
  };

  const designationOptions = useMemo(() => {
    const unique = [...new Set(employees.map(e => e.designation).filter(Boolean))];
    return [
      { value: '', label: 'All Designations' },
      ...unique.map(d => ({ value: d, label: d }))
    ];
  }, [employees]);

  // Dynamic Departments
  const departmentOptions = useMemo(() => {
    const unique = [...new Set(employees.map(e => e.department).filter(Boolean))];
    return [
      { value: '', label: 'All Departments' },
      ...unique.map(d => ({ value: d, label: d }))
    ];
  }, [employees]);

  // Dynamic Roles
  const roleOptions = useMemo(() => {
    const unique = [...new Set(employees.map(e => e.role).filter(Boolean))];
    return [
      { value: '', label: 'All Roles' },
      ...unique.map(r => ({ value: r, label: r }))
    ];
  }, [employees]);

  const hasFilters = designationFilter !== '' || departmentFilter !== '' || roleFilter !== '' || statusFilter !== '' || sortFilter !== '' || (startDate && endDate);

  const handleClearFilters = () => {
    setDesignationFilter('');
    setDepartmentFilter('');
    setRoleFilter('');
    setStatusFilter('');
    setSortFilter('');
    setDateRange([null, null]);
    setSearchQuery('');
  };

  const filteredEmployees = useMemo(() => {
    let result = employees.filter(emp => {
      // Search Query Filter
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch = emp.name.toLowerCase().includes(lowerQuery) ||
          emp.email.toLowerCase().includes(lowerQuery) ||
          emp.employee_id.toLowerCase().includes(lowerQuery) ||
          emp.designation.toLowerCase().includes(lowerQuery) ||
          emp.department.toLowerCase().includes(lowerQuery);
        if (!matchesSearch) return false;
      }
      
      // Designation Filter
      if (designationFilter && emp.designation !== designationFilter) {
        return false;
      }

      // Department Filter
      if (departmentFilter && emp.department !== departmentFilter) {
        return false;
      }

      // Role Filter
      if (roleFilter && emp.role !== roleFilter) {
        return false;
      }

      // Status Filter
      if (statusFilter !== '') {
        const isActiveFilter = statusFilter === 'active';
        if (emp.is_active !== isActiveFilter) {
          return false;
        }
      }

      // Date Range Filter
      if (startDate && endDate) {
        if (!emp.joining_date) return false;
        const joining = new Date(emp.joining_date).getTime();
        const start = new Date(startDate).setHours(0, 0, 0, 0);
        const end = new Date(endDate).setHours(23, 59, 59, 999);
        if (joining < start || joining > end) {
          return false;
        }
      }

      return true;
    });

    // Sort Filter
    if (sortFilter === 'asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortFilter === 'desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortFilter === 'recently_added') {
      result.sort((a, b) => {
        if (a.created_at && b.created_at) {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return String(b.id || '').localeCompare(String(a.id || ''));
      });
    }

    return result;
  }, [employees, searchQuery, designationFilter, departmentFilter, roleFilter, statusFilter, sortFilter, startDate, endDate]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setIsModalOpen(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      if (editingEmployee) {
        const res = await axiosClient.put(`/users/${editingEmployee.id}`, data);
        setEmployees(employees.map(e => e.id === editingEmployee.id ? res : e));
        toast.success('Employee updated successfully');
      } else {
        const res = await axiosClient.post('/users', data);
        setEmployees([...employees, res]);
        toast.success('Employee added successfully');
      }
      setIsModalOpen(false);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to save employee');
    }
  };

  const handleDeleteEmployee = (id) => {
    setConfirmDeleteModal({ isOpen: true, employeeId: id });
  };

  const executeDeleteEmployee = async () => {
    const id = confirmDeleteModal.employeeId;
    if (!id) return;
    try {
      await axiosClient.delete(`/users/${id}`);
      setEmployees(employees.filter(e => e.id !== id));
      toast.success('Employee deleted successfully');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to delete employee');
    } finally {
      setConfirmDeleteModal({ isOpen: false, employeeId: null });
    }
  };

  const handleToggleStatus = (emp) => {
    setConfirmStatusModal({ isOpen: true, employee: emp });
  };

  const executeToggleStatus = async () => {
    const emp = confirmStatusModal.employee;
    if (!emp) return;
    try {
      const res = await axiosClient.patch(`/users/${emp.id}/status`, { is_active: !emp.is_active });
      setEmployees(employees.map(e => e.id === emp.id ? { ...e, is_active: res.is_active } : e));
      toast.success(`Employee ${res.is_active ? 'activated' : 'deactivated'} successfully`);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Failed to update status');
    } finally {
      setConfirmStatusModal({ isOpen: false, employee: null });
    }
  };

  const columns = [
    {
      name: 'Emp ID',
      selector: row => row.employee_id || '-',
      sortable: true,
      cell: row => <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">{row.employee_id || '-'}</a>
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center">
          <a href="#" onClick={(e) => e.preventDefault()} className={`avatar avatar-md rounded-circle me-2 text-decoration-none d-flex align-items-center justify-content-center ${(row.profile_photo && (row.profile_photo.startsWith('/') || row.profile_photo.startsWith('http'))) ? '' : 'bg-primary'}`}>
            {(row.profile_photo && (row.profile_photo.startsWith('/') || row.profile_photo.startsWith('http'))) ? (
              <img src={row.profile_photo.startsWith('http') ? row.profile_photo : `${backendUrl}${row.profile_photo}`} className="img-fluid rounded-circle" alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <span className="text-white fw-bold" style={{ fontSize: '14px' }}>{getInitials(row.name)}</span>
            )}
          </a>
          <div>
            <h6 className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="text-dark">{row.name}</a></h6>
            <span className="fs-12 text-muted">{row.department || row.role}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Phone',
      selector: row => row.phone || '-',
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation || '-',
      sortable: true,
    },
    {
      name: 'Department',
      selector: row => row.department || '-',
      sortable: true,
    },
    {
      name: 'Role',
      selector: row => row.role || '-',
      sortable: true,
      cell: row => <span className="badge badge-soft-secondary">{row.role || '-'}</span>
    },
    {
      name: 'Salary',
      selector: row => row.basic_salary || 0,
      sortable: true,
      cell: row => `₹${row.basic_salary ? row.basic_salary.toLocaleString('en-IN') : '0'}`
    },
    {
      name: 'Joining Date',
      selector: row => row.joining_date ? new Date(row.joining_date).toLocaleDateString() : '-',
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.is_active,
      sortable: true,
      cell: row => (
        <div className="dropdown action-drop">
          <span 
            className={`badge ${row.is_active ? 'badge-soft-success' : 'badge-soft-danger'} d-inline-flex align-items-center badge-sm`} 
            data-bs-toggle="dropdown" 
            aria-expanded="false"
            style={{ cursor: 'pointer' }}
          >
            <i className="ti ti-point-filled me-1"></i>{row.is_active ? 'Active' : 'Inactive'}
          </span>
          <div className="dropdown-menu dropdown-menu-end">
            <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); if(!row.is_active) handleToggleStatus(row); }}>
              <i className="ti ti-point-filled text-success me-2"></i>Active
            </a>
            <a className="dropdown-item" href="#" onClick={(e) => { e.preventDefault(); if(row.is_active) handleToggleStatus(row); }}>
              <i className="ti ti-point-filled text-danger me-2"></i>Inactive
            </a>
          </div>
        </div>
      )
    },
    {
      name: 'Action',
      cell: row => (
        <div className="d-flex align-items-center gap-2">
          <button 
            className="btn btn-icon btn-sm" 
            onClick={() => handleEditEmployee(row)}
            title="Edit"
          >
            <i className="ti ti-edit"></i>
          </button>
          <button 
            className={`btn btn-icon btn-sm ${row.is_active ? 'text-warning' : 'text-success'}`}
            onClick={() => handleToggleStatus(row)}
            title={row.is_active ? "Deactivate" : "Activate"}
          >
            <i className="ti ti-power"></i>
          </button>
          <button 
            className="btn btn-icon btn-sm text-danger" 
            onClick={() => handleDeleteEmployee(row.id)}
            title="Delete"
          >
            <i className="ti ti-trash"></i>
          </button>
        </div>
      )
    }
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Employees List"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'HRMS & Payroll' },
              { label: 'Employee Directory', active: true }
            ]}
          >
       
          
            <div className="mb-2">
              <button 
                onClick={handleAddEmployee}
                className="btn btn-primary d-flex align-items-center"
              >
                <i className="ti ti-circle-plus me-2"></i>Add Employee
              </button>
            </div>
          </PageHeader>
          {/* /Breadcrumb */}

          <div className="row">
            {/* Total Employees */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-dark rounded-circle"><i
                          className="ti ti-users"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">Total Employee</p>
                      <h4>{totalEmployees}</h4>
                    </div>
                  </div>
                  <div>
                    {renderPercentageBadge(totalPercentage, "badge-soft-purple")}
                  </div>
                </div>
              </div>
            </div>
            {/* /Total Employees */}

            {/* Active */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-success rounded-circle"><i
                          className="ti ti-user-share"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">Active</p>
                      <h4>{activeEmployees}</h4>
                    </div>
                  </div>
                  <div>
                    {renderPercentageBadge(activePercentage, "badge-soft-primary")}
                  </div>
                </div>
              </div>
            </div>
            {/* /Active */}

            {/* Inactive */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-danger rounded-circle"><i
                          className="ti ti-user-pause"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">Inactive</p>
                      <h4>{inactiveEmployees}</h4>
                    </div>
                  </div>
                  <div>
                    {renderPercentageBadge(inactivePercentage, "badge-soft-dark")}
                  </div>
                </div>
              </div>
            </div>
            {/* /Inactive */}

            {/* New Joiners  */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-info rounded-circle"><i
                          className="ti ti-user-plus"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate">New Joiners</p>
                      <h4>{newJoiners}</h4>
                    </div>
                  </div>
                  <div>
                    {renderPercentageBadge(newJoinersPercentage, "badge-soft-secondary")}
                  </div>
                </div>
              </div>
            </div>
            {/* /New Joiners */}
          </div>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Employee Directory List</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-3" style={{ minWidth: '220px' }}>
                  <CustomDatePicker
                    isRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={(update) => setDateRange(update)}
                    placeholderText="Joining Date Range"
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={designationOptions}
                    value={designationOptions.find(o => o.value === designationFilter) || { value: '', label: 'All Designations' }}
                    onChange={(selected) => setDesignationFilter(selected ? selected.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={departmentOptions}
                    value={departmentOptions.find(o => o.value === departmentFilter) || { value: '', label: 'All Departments' }}
                    onChange={(selected) => setDepartmentFilter(selected ? selected.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '130px' }}>
                  <CustomSelect
                    options={roleOptions}
                    value={roleOptions.find(o => o.value === roleFilter) || { value: '', label: 'All Roles' }}
                    onChange={(selected) => setRoleFilter(selected ? selected.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '140px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'All Statuses' },
                      { value: 'active', label: 'Active' },
                      { value: 'inactive', label: 'Inactive' }
                    ]}
                    value={statusFilter ? { value: statusFilter, label: statusFilter === 'active' ? 'Active' : 'Inactive' } : { value: '', label: 'Status' }}
                    onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'Default Sort' },
                      { value: 'recently_added', label: 'Recently Added' },
                      { value: 'asc', label: 'Ascending' },
                      { value: 'desc', label: 'Descending' }
                    ]}
                    value={sortFilter ? { value: sortFilter, label: sortFilter === 'asc' ? 'Ascending' : sortFilter === 'desc' ? 'Descending' : 'Recently Added' } : { value: '', label: 'Sort By' }}
                    onChange={(selected) => setSortFilter(selected ? selected.value : '')}
                  />
                </div>
                
                {hasFilters && (
                  <div className="me-0">
                    <button 
                      className="btn btn-outline-danger btn-sm d-flex align-items-center"
                      onClick={handleClearFilters}
                      style={{ height: '36px' }}
                    >
                      <i className="ti ti-x me-1"></i>Clear
                    </button>
                  </div>
                )}
              </div>
            </div>
            {loading ? (
              <div className="card-body text-center p-5">
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <CustomDataTable
                columns={columns}
                data={filteredEmployees}
                rowClassName={(row) => !row.is_active ? 'opacity-50 bg-light' : ''}
              />
            )}
          </div>
        </div>
      </div>

      <EmployeeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingData={editingEmployee}
      />

      {confirmStatusModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Action</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmStatusModal({ isOpen: false, employee: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body">
                Are you sure you want to <strong>{confirmStatusModal.employee?.is_active ? 'deactivate' : 'activate'}</strong> this employee? 
                {confirmStatusModal.employee?.is_active && " They will no longer be able to log in."}
              </div>
              <div className="modal-footer">
                <button className="btn btn-light" onClick={() => setConfirmStatusModal({ isOpen: false, employee: null })}>Cancel</button>
                <button className="btn btn-primary" onClick={executeToggleStatus}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirmDeleteModal.isOpen && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Employee</h5>
                <button type="button" className="btn-close" onClick={() => setConfirmDeleteModal({ isOpen: false, employeeId: null })} aria-label="Close"></button>
              </div>
              <div className="modal-body text-center py-4">
                <i className="ti ti-alert-circle text-danger mb-3" style={{ fontSize: '48px' }}></i>
                <h5 className="mb-2">Are you sure?</h5>
                <p className="text-muted mb-0">Do you really want to delete this employee? This process cannot be undone.</p>
              </div>
              <div className="modal-footer justify-content-center border-0 pt-0">
                <button className="btn btn-light px-4" onClick={() => setConfirmDeleteModal({ isOpen: false, employeeId: null })}>Cancel</button>
                <button className="btn btn-danger px-4" onClick={executeDeleteEmployee}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Employees;
