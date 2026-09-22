import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import EmployeeForm from '../components/hrms/EmployeeForm';
import CustomSelect from '../components/common/CustomSelect';
import toast from 'react-hot-toast';

const initialEmployees = [
  { id: 1, employee_id: 'Emp-001', name: 'Anthony Lewis', email: 'anthony@example.com', phone: '(123) 4567 890', role: 'sales', designation: 'Finance', department: 'Finance', joining_date: '2024-09-12', manager_id: 'Manager 1', attendance_status: 'Present', gender: 'Male', dob: '1990-01-01', basic_salary: 50000, is_active: true },
  { id: 2, employee_id: 'Emp-002', name: 'Brian Villalobos', email: 'brian@example.com', phone: '(179) 7382 829', role: 'admin', designation: 'Developer', department: 'IT', joining_date: '2024-10-24', manager_id: 'Manager 2', attendance_status: 'Present', gender: 'Male', dob: '1992-05-15', basic_salary: 60000, is_active: true },
  { id: 3, employee_id: 'Emp-003', name: 'Harvey Smith', email: 'harvey@example.com', phone: '(184) 2719 738', role: 'support', designation: 'Developer', department: 'IT', joining_date: '2024-02-18', manager_id: '', attendance_status: 'Present', gender: 'Male', dob: '1991-08-20', basic_salary: 55000, is_active: true },
  { id: 4, employee_id: 'Emp-004', name: 'Stephan Peralt', email: 'peral@example.com', phone: '(193) 7839 748', role: 'manager', designation: 'Executive Officer', department: 'Management', joining_date: '2024-10-17', manager_id: '', attendance_status: 'Present', gender: 'Male', dob: '1985-11-30', basic_salary: 80000, is_active: true },
  { id: 5, employee_id: 'Emp-005', name: 'Doglas Martini', email: 'martniwr@example.com', phone: '(183) 9302 890', role: 'manager', designation: 'Manager', department: 'Operations', joining_date: '2024-07-20', manager_id: 'Manager 1', attendance_status: 'Present', gender: 'Male', dob: '1988-03-25', basic_salary: 75000, is_active: true },
  { id: 6, employee_id: 'Emp-006', name: 'Linda Ray', email: 'ray456@example.com', phone: '(120) 3728 039', role: 'sales', designation: 'Finance', department: 'Finance', joining_date: '2024-04-10', manager_id: 'Manager 2', attendance_status: 'Present', gender: 'Female', dob: '1993-07-12', basic_salary: 52000, is_active: true },
  { id: 7, employee_id: 'Emp-007', name: 'Elliot Murray', email: 'murray@example.com', phone: '(102) 8480 832', role: 'admin', designation: 'Finance', department: 'Finance', joining_date: '2024-08-29', manager_id: '', attendance_status: 'Present', gender: 'Male', dob: '1990-09-05', basic_salary: 53000, is_active: true },
  { id: 8, employee_id: 'Emp-008', name: 'Rebecca Smtih', email: 'smtih@example.com', phone: '(162) 8920 713', role: 'support', designation: 'Executive', department: 'Management', joining_date: '2024-02-22', manager_id: '', attendance_status: 'Absent', gender: 'Female', dob: '1994-12-18', basic_salary: 60000, is_active: false },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [searchQuery, setSearchQuery] = useState('');
  const [designationFilter, setDesignationFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortFilter, setSortFilter] = useState('');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(e => e.is_active).length;
  const inactiveEmployees = employees.filter(e => !e.is_active).length;
  // Let's pretend New Joiners are those added in the last 6 months, for now mock it as 20% of total
  const newJoiners = Math.floor(totalEmployees * 0.2) || 1;

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

      // Status Filter
      if (statusFilter !== '') {
        const isActiveFilter = statusFilter === 'active';
        if (emp.is_active !== isActiveFilter) {
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
      result.sort((a, b) => b.id - a.id);
    }

    return result;
  }, [employees, searchQuery, designationFilter, statusFilter, sortFilter]);

  const handleAddEmployee = () => {
    setEditingEmployee(null);
    setIsModalOpen(true);
  };

  const handleEditEmployee = (emp) => {
    setEditingEmployee(emp);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (data) => {
    if (editingEmployee) {
      setEmployees(employees.map(e => e.id === data.id ? data : e));
      toast.success('Employee updated successfully');
    } else {
      setEmployees([{ ...data, id: Date.now() }, ...employees]);
      toast.success('Employee added successfully');
    }
    setIsModalOpen(false);
  };

  const handleDeleteEmployee = (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this employee?');
    if (isConfirmed) {
      setEmployees(employees.filter(e => e.id !== id));
      toast.success('Employee deleted successfully');
    }
  };

  const handleToggleStatus = (emp) => {
    const action = emp.is_active ? 'deactivate' : 'activate';
    const isConfirmed = window.confirm(`Are you sure you want to ${action} this employee?`);
    if (isConfirmed) {
      setEmployees(employees.map(e => e.id === emp.id ? { ...e, is_active: !e.is_active } : e));
      toast.success(`Employee ${action}d successfully`);
    }
  };

  const columns = [
    {
      name: 'Emp ID',
      selector: row => row.employee_id,
      sortable: true,
      cell: row => <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">{row.employee_id}</a>
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center">
          <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-md rounded-circle bg-primary-transparent text-primary me-2">
            {row.name.charAt(0)}
          </a>
          <div>
            <h6 className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="text-dark">{row.name}</a></h6>
            <span className="fs-12 text-muted">{row.department}</span>
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
      selector: row => row.phone,
      sortable: true,
    },
    {
      name: 'Designation',
      selector: row => row.designation,
      sortable: true,
    },
    {
      name: 'Joining Date',
      selector: row => row.joining_date,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.is_active,
      sortable: true,
      cell: row => (
        <span className={`badge ${row.is_active ? 'badge-soft-success' : 'badge-soft-danger'} d-inline-flex align-items-center badge-sm`}>
          <i className="ti ti-point-filled me-1"></i>{row.is_active ? 'Active' : 'Inactive'}
        </span>
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
                    <span className="badge badge-soft-purple badge-sm fw-normal">
                      <i className="ti ti-arrow-wave-right-down"></i>
                      +19.01%
                    </span>
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
                    <span className="badge badge-soft-primary badge-sm fw-normal">
                      <i className="ti ti-arrow-wave-right-down"></i>
                      +19.01%
                    </span>
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
                    <span className="badge badge-soft-dark badge-sm fw-normal">
                      <i className="ti ti-arrow-wave-right-down"></i>
                      +19.01%
                    </span>
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
                    <span className="badge badge-soft-secondary badge-sm fw-normal">
                      <i className="ti ti-arrow-wave-right-down"></i>
                      +19.01%
                    </span>
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
                <div className="me-3" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'All Designations' },
                      { value: 'Finance', label: 'Finance' },
                      { value: 'Developer', label: 'Developer' },
                      { value: 'Executive', label: 'Executive' },
                      { value: 'Manager', label: 'Manager' },
                    ]}
                    value={designationFilter ? { value: designationFilter, label: designationFilter } : { value: '', label: 'Designation' }}
                    onChange={(selected) => setDesignationFilter(selected ? selected.value : '')}
                  />
                </div>
                <div className="me-3" style={{ minWidth: '150px' }}>
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
                <div className="me-0" style={{ minWidth: '150px' }}>
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
               
              </div>
            </div>
            <div className="card-body p-0">
              <CustomDataTable
                columns={columns}
                data={filteredEmployees}
                rowClassName={(row) => !row.is_active ? 'opacity-50 bg-light' : ''}
              />
            </div>
          </div>
        </div>
      </div>

      <EmployeeForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        editingData={editingEmployee}
      />
    </>
  );
};

export default Employees;
