import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import CustomDataTable from '../components/common/CustomDataTable';
import CustomSelect from '../components/common/CustomSelect';
import CustomDatePicker from '../components/common/CustomDatePicker';

const initialAttendanceRecords = [
  { id: 1, employee_id: 'Emp-001', employee_name: 'Anthony Lewis', punch_in: '09:00 AM', punch_out: '06:00 PM', work_hours: '9h 0m', break_duration: '1h 0m', overtime: '-', method: 'Biometric', status: 'On Time' },
  { id: 2, employee_id: 'Emp-002', employee_name: 'Brian Villalobos', punch_in: '09:45 AM', punch_out: '06:30 PM', work_hours: '8h 45m', break_duration: '1h 0m', overtime: '-', method: 'Mobile App', status: 'Late' },
  { id: 3, employee_id: 'Emp-003', employee_name: 'Harvey Smith', punch_in: '-', punch_out: '-', work_hours: '-', break_duration: '-', overtime: '-', method: '-', status: 'Absent' },
  { id: 4, employee_id: 'Emp-004', employee_name: 'Stephan Peralt', punch_in: '09:00 AM', punch_out: '07:30 PM', work_hours: '10h 30m', break_duration: '1h 0m', overtime: '1h 30m', method: 'Biometric', status: 'On Time' },
  { id: 5, employee_id: 'Emp-005', employee_name: 'Doglas Martini', punch_in: '09:10 AM', punch_out: '02:00 PM', work_hours: '4h 50m', break_duration: '30m', overtime: '-', method: 'Web Portal', status: 'Half Day' },
  { id: 6, employee_id: 'Emp-006', employee_name: 'Linda Ray', punch_in: '10:00 AM', punch_out: '07:00 PM', work_hours: '9h 0m', break_duration: '1h 0m', overtime: '-', method: 'Biometric', status: 'Late' },
  { id: 7, employee_id: 'Emp-007', employee_name: 'Elliot Murray', punch_in: '08:50 AM', punch_out: '06:00 PM', work_hours: '9h 10m', break_duration: '1h 0m', overtime: '-', method: 'Biometric', status: 'On Time' },
  { id: 8, employee_id: 'Emp-008', employee_name: 'Rebecca Smtih', punch_in: '-', punch_out: '-', work_hours: '-', break_duration: '-', overtime: '-', method: '-', status: 'Absent' },
];

const AttendanceAdmin = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [records] = useState(initialAttendanceRecords);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [employeeFilter, setEmployeeFilter] = useState('');
  const [singleDate, setSingleDate] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);

  // Extract unique employees for the dropdown
  const employeeOptions = useMemo(() => {
    const unique = [...new Set(records.map(r => r.employee_name))];
    return [
      { value: '', label: 'All Employees' },
      ...unique.map(name => ({ value: name, label: name }))
    ];
  }, [records]);

  // KPIs
  const totalStaff = 8;
  const presentCount = records.filter(r => r.status !== 'Absent').length;
  const absentCount = records.filter(r => r.status === 'Absent').length;
  const lateCount = records.filter(r => r.status === 'Late').length;
  const punctuality = Math.round(((presentCount - lateCount) / totalStaff) * 100) || 0;

  const filteredRecords = useMemo(() => {
    return records.filter(r => {
      if (searchQuery) {
        const lowerQuery = searchQuery.toLowerCase();
        const matchesSearch = r.employee_name.toLowerCase().includes(lowerQuery) ||
          r.employee_id.toLowerCase().includes(lowerQuery);
        if (!matchesSearch) return false;
      }
      if (statusFilter && r.status !== statusFilter) {
        return false;
      }
      if (employeeFilter && r.employee_name !== employeeFilter) {
        return false;
      }
      return true;
    });
  }, [records, searchQuery, statusFilter, employeeFilter]);

  const columns = [
    {
      name: 'Employee',
      selector: row => row.employee_name,
      sortable: true,
      cell: row => (
        <div className="d-flex align-items-center">
          <a href="#" onClick={(e) => e.preventDefault()} className="avatar avatar-md rounded-circle bg-primary-transparent text-primary me-2">
            {row.employee_name.charAt(0)}
          </a>
          <div>
            <h6 className="mb-0"><a href="#" onClick={(e) => e.preventDefault()} className="text-dark">{row.employee_name}</a></h6>
            <span className="fs-12 text-muted">{row.employee_id}</span>
          </div>
        </div>
      )
    },
    {
      name: 'Punch In',
      selector: row => row.punch_in,
      sortable: true,
    },
    {
      name: 'Punch Out',
      selector: row => row.punch_out,
      sortable: true,
    },
    {
      name: 'Working Hrs',
      selector: row => row.work_hours,
      sortable: true,
    },
    {
      name: 'Break',
      selector: row => row.break_duration,
      sortable: true,
    },
    {
      name: 'Overtime',
      selector: row => row.overtime,
      sortable: true,
      cell: row => (
        <span className={row.overtime !== '-' ? 'text-success fw-medium' : ''}>{row.overtime}</span>
      )
    },
    {
      name: 'Verification Method',
      selector: row => row.method,
      sortable: true,
      cell: row => {
        if (row.method === 'Biometric') return <span className="text-muted"><i className="ti ti-check-circle me-1"></i> Biometric</span>;
        if (row.method === 'Mobile App') return <span className="text-muted"><i className="ti ti-device-mobile me-1"></i> Mobile</span>;
        if (row.method === 'Web Portal') return <span className="text-muted"><i className="ti ti-device-desktop me-1"></i> Web</span>;
        return <span>-</span>;
      }
    },
    {
      name: 'Status',
      selector: row => row.status,
      sortable: true,
      cell: row => {
        let badgeClass = 'badge-soft-secondary';
        if (row.status === 'On Time') badgeClass = 'badge-soft-success';
        if (row.status === 'Late') badgeClass = 'badge-soft-warning';
        if (row.status === 'Absent') badgeClass = 'badge-soft-danger';
        if (row.status === 'Half Day') badgeClass = 'badge-soft-info';
        
        return (
          <span className={`badge ${badgeClass} d-inline-flex align-items-center badge-sm`}>
            {row.status}
          </span>
        );
      }
    }
  ];

  return (
    <>
      <div className="page-wrapper">
        <div className="content">

          {/* Breadcrumb */}
          <PageHeader 
            title="Attendance Management"
            breadcrumbs={[
              { label: 'Dashboard' },
              { label: 'HRMS & Payroll' },
              { label: 'Attendance', active: true }
            ]}
          >
          </PageHeader>
          {/* /Breadcrumb */}

          <div className="row">
            {/* Present Today */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-success-transparent rounded-circle"><i
                          className="ti ti-users text-success"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate text-uppercase">Staff Present Today</p>
                      <h4>{presentCount} <span className="fs-14 text-muted fw-normal">/ {totalStaff}</span></h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Present Today */}

            {/* Absent Today */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-danger-transparent rounded-circle"><i
                          className="ti ti-user-off text-danger"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate text-uppercase">Absent Today</p>
                      <h4>{absentCount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Absent Today */}

            {/* Late Punch In */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-warning-transparent rounded-circle"><i
                          className="ti ti-clock text-warning"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate text-uppercase">Late Punch In</p>
                      <h4>{lateCount}</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Late Punch In */}

            {/* Punctuality Ratio */}
            <div className="col-lg-3 col-md-6 d-flex">
              <div className="card flex-fill">
                <div className="card-body d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center overflow-hidden">
                    <div>
                      <span className="avatar avatar-lg bg-primary-transparent rounded-circle"><i
                          className="ti ti-percentage text-primary"></i></span>
                    </div>
                    <div className="ms-2 overflow-hidden">
                      <p className="fs-12 fw-medium mb-1 text-truncate text-uppercase">Punctuality Ratio</p>
                      <h4>{punctuality}%</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* /Punctuality Ratio */}
          </div>

          {/* Navigation Tabs */}
          <ul className="nav nav-tabs nav-tabs-bottom mb-4">
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Overview' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Overview'); }}
              >
                Overview
              </a>
            </li>
            <li className="nav-item">
              <a 
                className={`nav-link ${activeTab === 'Shift Schedules' ? 'active' : ''}`} 
                href="#" 
                onClick={(e) => { e.preventDefault(); setActiveTab('Shift Schedules'); }}
              >
                Shift Schedules
              </a>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'Overview' && (
              <div className="card">
                <div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
                  <h5>Attendance Logs</h5>
                  <div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
                    <div className="me-2" style={{ minWidth: '160px' }}>
                      <CustomSelect
                        options={employeeOptions}
                        value={employeeOptions.find(opt => opt.value === employeeFilter) || employeeOptions[0]}
                        onChange={(selected) => setEmployeeFilter(selected ? selected.value : '')}
                      />
                    </div>
                    
                    <div className="me-2">
                      <div className="input-icon position-relative" style={{ width: '160px' }}>
                        <span className="input-icon-addon">
                          <i className="ti ti-calendar text-gray-9"></i>
                        </span>
                        <CustomDatePicker
                          selected={singleDate}
                          onChange={(date) => setSingleDate(date)}
                          className="form-control"
                          placeholderText="Select Date"
                        />
                      </div>
                    </div>

                    <div className="me-0">
                      <div className="input-icon position-relative" style={{ width: '220px' }}>
                        <span className="input-icon-addon">
                          <i className="ti ti-calendar text-gray-9"></i>
                        </span>
                        <CustomDatePicker
                          isRange={true}
                          selected={dateRange[0]}
                          startDate={dateRange[0]}
                          endDate={dateRange[1]}
                          onChange={(update) => setDateRange(update)}
                          className="form-control date-range bookingrange"
                          placeholderText="Select Date Range"
                        />
                      </div>
                    </div>

                    <div className="me-0" style={{ minWidth: '140px' }}>
                      <CustomSelect
                        options={[
                          { value: '', label: 'All Statuses' },
                          { value: 'On Time', label: 'On Time' },
                          { value: 'Late', label: 'Late' },
                          { value: 'Absent', label: 'Absent' },
                          { value: 'Half Day', label: 'Half Day' }
                        ]}
                        value={statusFilter ? { value: statusFilter, label: statusFilter } : { value: '', label: 'Status' }}
                        onChange={(selected) => setStatusFilter(selected ? selected.value : '')}
                      />
                    </div>
                  </div>
                </div>
                <div className="card-body p-0">
                  <CustomDataTable
                    columns={columns}
                    data={filteredRecords}
                  />
                </div>
              </div>
            )}

            {activeTab === 'Shift Schedules' && (
              <div className="row g-4 mt-2">
                {/* General Shift */}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-white border-2 overlay-bg-3 position-relative h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <div>
                          <p className="fw-medium mb-1">General Shift</p>
                          <p className="fs-13 mb-0"><span className="text-dark fs-12"><i className="ti ti-clock me-1"></i>09:30 AM - 06:30 PM</span></p>
                        </div>
                        <div className="avatar avatar-md br-10 icon-rotate bg-primary">
                          <span className="d-flex align-items-center"><i className="ti ti-sun text-white fs-16"></i></span>
                        </div>
                      </div>
                      <p className="fw-bold fs-14 mb-0">Assigned Count: <span className="text-primary ms-1">12 Staff</span></p>
                    </div>
                  </div>
                </div>

                {/* Morning Shift */}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-white border-2 overlay-bg-3 position-relative h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <div>
                          <p className="fw-medium mb-1">Morning Shift</p>
                          <p className="fs-13 mb-0"><span className="text-dark fs-12"><i className="ti ti-clock me-1"></i>06:00 AM - 02:00 PM</span></p>
                        </div>
                        <div className="avatar avatar-md br-10 icon-rotate bg-warning">
                          <span className="d-flex align-items-center"><i className="ti ti-sunrise text-white fs-16"></i></span>
                        </div>
                      </div>
                      <p className="fw-bold fs-14 mb-0">Assigned Count: <span className="text-warning ms-1">4 Staff</span></p>
                    </div>
                  </div>
                </div>

                {/* Evening Shift */}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-white border-2 overlay-bg-3 position-relative h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <div>
                          <p className="fw-medium mb-1">Evening Shift</p>
                          <p className="fs-13 mb-0"><span className="text-dark fs-12"><i className="ti ti-clock me-1"></i>02:00 PM - 10:00 PM</span></p>
                        </div>
                        <div className="avatar avatar-md br-10 icon-rotate bg-info">
                          <span className="d-flex align-items-center"><i className="ti ti-sunset text-white fs-16"></i></span>
                        </div>
                      </div>
                      <p className="fw-bold fs-14 mb-0">Assigned Count: <span className="text-info ms-1">6 Staff</span></p>
                    </div>
                  </div>
                </div>

                {/* Night Shift */}
                <div className="col-12 col-md-6 col-lg-3">
                  <div className="card border-white border-2 overlay-bg-3 position-relative h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
                        <div>
                          <p className="fw-medium mb-1">Night Shift</p>
                          <p className="fs-13 mb-0"><span className="text-dark fs-12"><i className="ti ti-clock me-1"></i>10:00 PM - 06:00 AM</span></p>
                        </div>
                        <div className="avatar avatar-md br-10 icon-rotate bg-secondary">
                          <span className="d-flex align-items-center"><i className="ti ti-moon text-white fs-16"></i></span>
                        </div>
                      </div>
                      <p className="fw-bold fs-14 mb-0">Assigned Count: <span className="text-secondary ms-1">3 Staff</span></p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </>
  );
};

export default AttendanceAdmin;
