import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';
import LeaveForm from '../components/hrms/LeaveForm';
import toast from 'react-hot-toast';

const initialLeaves = [
  { id: 1, employee_id: 'Emp-001', employee_name: 'Anthony Lewis', leave_type: 'Sick Leave', start_date: '2024-10-15', end_date: '2024-10-16', days: 2, reason: 'Viral Fever', status: 'Pending' },
  { id: 2, employee_id: 'Emp-002', employee_name: 'Brian Villalobos', leave_type: 'Casual Leave', start_date: '2024-10-20', end_date: '2024-10-20', days: 1, reason: 'Personal work', status: 'Approved' },
  { id: 3, employee_id: 'Emp-003', employee_name: 'Harvey Smith', leave_type: 'Annual Leave', start_date: '2024-11-01', end_date: '2024-11-05', days: 5, reason: 'Family trip', status: 'Approved' },
  { id: 4, employee_id: 'Emp-004', employee_name: 'Stephan Peralt', leave_type: 'Sick Leave', start_date: '2024-10-10', end_date: '2024-10-10', days: 1, reason: 'Doctor appointment', status: 'Rejected' },
  { id: 5, employee_id: 'Emp-005', employee_name: 'Doglas Martini', leave_type: 'Casual Leave', start_date: '2024-10-18', end_date: '2024-10-19', days: 2, reason: 'Attending a wedding', status: 'Pending' }
];

const Leaves = () => {
  const [leaves, setLeaves] = useState(initialLeaves);
  const [activeTab, setActiveTab] = useState('Leave History'); // 'Leave History' or 'Upcoming Time Off'

  // Filters
  const [filterEmployee, setFilterEmployee] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Form
  const [isModalOpen, setIsModalOpen] = useState(false);

  // KPIs
  const totalEmployees = 200;
  const totalPresent = 180;
  const plannedLeaves = leaves.filter(l => l.status === 'Approved' && l.leave_type !== 'Sick Leave').length;
  const unplannedLeaves = leaves.filter(l => l.status === 'Approved' && l.leave_type === 'Sick Leave').length;
  const pendingRequests = leaves.filter(l => l.status === 'Pending').length;

  const handleStatusChange = (id, newStatus) => {
    setLeaves(leaves.map(l => l.id === id ? { ...l, status: newStatus } : l));
    toast.success(`Leave request ${newStatus.toLowerCase()} successfully`);
  };

  const handleAddLeave = (newLeave) => {
    setLeaves([{ ...newLeave, employee_id: `Emp-${Math.floor(Math.random() * 1000)}` }, ...leaves]);
    setIsModalOpen(false);
    toast.success('Leave request added successfully');
  };

  const filteredLeaves = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);

    return leaves.filter(l => {
      // Tab filter
      const startDateObj = new Date(l.start_date);
      startDateObj.setHours(0,0,0,0);
      const isUpcoming = startDateObj > today;

      if (activeTab === 'Upcoming Time Off' && !isUpcoming) return false;
      if (activeTab === 'Leave History' && isUpcoming) return false;

      // Custom Filters
      if (filterStatus && l.status !== filterStatus) return false;
      if (filterEmployee) {
        const lowerName = l.employee_name.toLowerCase();
        if (!lowerName.includes(filterEmployee.toLowerCase())) return false;
      }
      if (filterType && l.leave_type !== filterType) return false;
      if (startDate && new Date(l.start_date) < new Date(startDate)) return false;
      if (endDate && new Date(l.end_date) > new Date(endDate)) return false;

      return true;
    });
  }, [leaves, activeTab, filterEmployee, filterType, filterStatus, startDate, endDate]);

  const columns = [
    {
      name: 'Leave Type',
      selector: row => row.leave_type,
      sortable: true,
    },
    {
      name: 'Day Type',
      selector: row => row.day_type || 'Full Day',
      sortable: true,
    },
    {
      name: 'From',
      selector: row => row.start_date,
      sortable: true,
    },
    {
      name: 'Approved By',
      selector: row => row.reviewer_name || '-',
      sortable: true,
    },
    {
      name: 'To',
      selector: row => row.end_date,
      sortable: true,
    },
    {
      name: 'No of Days',
      selector: row => row.days,
      sortable: true,
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => {
        let badgeClass = 'badge-soft-secondary';
        if (row.status === 'Approved') badgeClass = 'badge-soft-success';
        if (row.status === 'Pending') badgeClass = 'badge-soft-warning';
        if (row.status === 'Rejected') badgeClass = 'badge-soft-danger';
        if (row.status === 'Cancelled') badgeClass = 'badge-soft-dark';
        
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-sm`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  // Tab counts
  const today = new Date();
  today.setHours(0,0,0,0);
  const historyCount = leaves.filter(l => {
    const d = new Date(l.start_date);
    d.setHours(0,0,0,0);
    return d <= today;
  }).length;
  const upcomingCount = leaves.filter(l => {
    const d = new Date(l.start_date);
    d.setHours(0,0,0,0);
    return d > today;
  }).length;

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Leave Management"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'HRMS & Payroll' },
              { label: 'Leaves', active: true }
            ]}
          >
            <div className="me-2 mb-2">
              
            </div>
            <div className="mb-2">
              <button onClick={() => setIsModalOpen(true)} className="btn btn-primary d-flex align-items-center">
                <i className="ti ti-circle-plus me-2"></i>Add Leave
              </button>
            </div>
          </PageHeader>
          {/* /Breadcrumb */}

          {/* Leaves KPI Info */}
          <div className="row g-3 mb-4">
            {/* Card 1 */}
            <div className="col">
              <div className="card bg-green-img h-100 mb-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-calendar text-success fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Monthly Leave</p>
                      <h4 className="text-dark">0 <span className="fs-12 text-muted fw-normal">Days</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">0 Days</h6>
                    </div>
                    <div>
                      <p className="text-muted fs-11 mb-1">Allowance</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">1 Free Day</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Unpaid</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">0 Day(s)</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col">
              <div className="card bg-pink-img h-100 mb-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-activity text-pink fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Sick Leave</p>
                      <h4 className="text-dark">1 <span className="fs-12 text-muted fw-normal">Days</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">0 Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">1 Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col">
              <div className="card bg-yellow-img h-100 mb-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-cup text-warning fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Casual Leave</p>
                      <h4 className="text-dark">0 <span className="fs-12 text-muted fw-normal">Days</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">0 Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">0 Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="col">
              <div className="card bg-blue-img h-100 mb-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-user-x text-info fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Unpaid Leave</p>
                      <h4 className="text-dark">1 <span className="fs-12 text-muted fw-normal">Days</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">0 Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">1 Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 5 */}
            <div className="col">
              <div className="card bg-green-img h-100 mb-0">
                <div className="card-body p-3">
                  <div className="d-flex align-items-center justify-content-between mb-3">
                    <div className="flex-shrink-0">
                      <span className="avatar avatar-md rounded-circle bg-white d-flex align-items-center justify-content-center">
                        <i className="ti ti-dots text-info fs-18"></i>
                      </span>
                    </div>
                    <div className="text-end">
                      <p className="mb-1 fw-medium text-dark">Other Leave</p>
                      <h4 className="text-dark">0 <span className="fs-12 text-muted fw-normal">Days</span></h4>
                    </div>
                  </div>
                  <hr className="my-2" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }} />
                  <div className="d-flex justify-content-between text-start mt-2">
                    <div>
                      <p className="text-muted fs-11 mb-1">Pending</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-dark">2 Days</h6>
                    </div>
                    <div className="text-end">
                      <p className="text-muted fs-11 mb-1">Overall</p>
                      <h6 className="fs-12 fw-semibold mb-0 text-warning">2 Days</h6>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /Leaves KPI Info */}

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs nav-tabs-bottom mb-4">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Leave History' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Leave History'); }}
              >
                Leave History ({historyCount})
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Upcoming Time Off' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Upcoming Time Off'); }}
              >
                Upcoming Time Off ({upcomingCount})
              </a>
            </li>
          </ul>

          <div className="card">
            <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
              <h5>Leave Requests</h5>
              <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                <div className="me-2" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'All Status' },
                      { value: 'Pending', label: 'Pending' },
                      { value: 'Approved', label: 'Approved' },
                      { value: 'Rejected', label: 'Rejected' },
                      { value: 'Cancelled', label: 'Cancelled' }
                    ]}
                    value={filterStatus ? { value: filterStatus, label: filterStatus } : { value: '', label: 'Status' }}
                    onChange={(selected) => setFilterStatus(selected ? selected.value : '')}
                  />
                </div>

                <div className="me-2" style={{ minWidth: '150px' }}>
                  <CustomSelect
                    options={[
                      { value: '', label: 'All Leave Types' },
                      { value: 'Sick Leave', label: 'Sick Leave' },
                      { value: 'Casual Leave', label: 'Casual Leave' },
                      { value: 'Annual Leave', label: 'Annual Leave' }
                    ]}
                    value={filterType ? { value: filterType, label: filterType } : { value: '', label: 'Leave Type' }}
                    onChange={(selected) => setFilterType(selected ? selected.value : '')}
                  />
                </div>
                
                <div className="me-2 date-picker-wrapper" style={{ width: '130px' }}>
                  <CustomDatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    className="form-control"
                    placeholderText="From Date"
                  />
                </div>
                
                <div className="me-2 date-picker-wrapper" style={{ width: '130px' }}>
                  <CustomDatePicker
                    selected={endDate}
                    onChange={(date) => setEndDate(date)}
                    className="form-control"
                    placeholderText="To Date"
                  />
                </div>

              
                
                { (filterEmployee || filterType || filterStatus || startDate || endDate) && (
                  <button 
                    className="btn btn-sm btn-soft-secondary ms-2"
                    onClick={() => {
                      setFilterEmployee('');
                      setFilterType('');
                      setFilterStatus('');
                      setStartDate(null);
                      setEndDate(null);
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            <div className="card-body p-0">
              <CustomDataTable
                columns={columns}
                data={filteredLeaves}
              />
            </div>
          </div>

        </div>
      </div>

      <LeaveForm
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddLeave}
      />
    </>
  );
};

export default Leaves;
