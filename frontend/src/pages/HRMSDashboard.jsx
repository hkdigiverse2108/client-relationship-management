import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import { WeeklyAttendanceChart } from '../components/charts/AiAttendanceCharts';
import CustomDatePicker from '../components/common/CustomDatePicker';
import CustomSelect from '../components/common/CustomSelect';
import ATSPipeline from '../components/hrms/ATSPipeline';
import CompanyAssets from '../components/hrms/CompanyAssets';
import PerformanceAppraisals from '../components/hrms/PerformanceAppraisals';

const MiniCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const days = [];
  const prevMonthDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({ day: prevMonthDays - i, isCurrentMonth: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }
  const remaining = (7 - (days.length % 7)) % 7;
  for (let i = 1; i <= remaining; i++) {
    days.push({ day: i, isCurrentMonth: false });
  }

  const rows = [];
  for (let i = 0; i < days.length; i += 7) {
    rows.push(days.slice(i, i + 7));
  }

  const today = new Date();
  const isToday = (day) => {
    return currentDate.getMonth() === today.getMonth() && 
           currentDate.getFullYear() === today.getFullYear() && 
           day === today.getDate();
  };

  return (
    <div className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3 px-2">
        <a href="#" className="text-muted" onClick={(e) => { e.preventDefault(); prevMonth(); }}><i className="ti ti-chevron-left fs-14"></i></a>
        <span className="fw-bold text-dark fs-14">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</span>
        <a href="#" className="text-muted" onClick={(e) => { e.preventDefault(); nextMonth(); }}><i className="ti ti-chevron-right fs-14"></i></a>
      </div>
      
      <div className="row text-center mb-2 px-2 text-dark fw-medium fs-11">
        <div className="col">S</div><div className="col">M</div><div className="col">T</div>
        <div className="col">W</div><div className="col">T</div><div className="col">F</div><div className="col">S</div>
      </div>
      
      {rows.map((row, rIdx) => (
        <div key={rIdx} className="row text-center mb-3 px-2 fs-13 text-dark">
          {row.map((d, cIdx) => (
            <div key={cIdx} className="col" style={{ color: !d.isCurrentMonth ? '#ced4da' : 'inherit' }}>
              {d.isCurrentMonth && isToday(d.day) ? (
                <span className="bg-primary text-white rounded px-2 py-1 shadow-sm">{d.day}</span>
              ) : (
                <span>{d.day}</span>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

const HRDashboard = () => {
  return (
    <div className="page-wrapper">
      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      <div className="content">
        <PageHeader 
          title="HRMS Dashboard"
          breadcrumbs={[
            { label: 'Dashboard' },
            { label: 'HRMS & Payroll' },
            { label: 'HRMS Dashboard', active: true }
          ]}
        >
          <div className="ms-2 head-icons">
            <a href="#" className="" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-original-title="Collapse" id="collapse-header">
              <i className="ti ti-chevrons-up"></i>
            </a>
          </div>
        </PageHeader>

        <div className="row">
          {/* Left Column: Punch In/Out */}
          <div className="col-xl-3 col-lg-4 d-flex">
            <div className="card flex-fill">
              <div className="card-body">
                <div className="mb-3 text-center">
                  <h6 className="fw-medium text-gray-5 mb-2">Good Morning, Adrian</h6>
                  <h4>08:35 AM, 11 Mar 2025</h4>
                </div>
                <div className="attendance-circle-progress mx-auto mb-3" data-value='65'>
                  <span className="progress-left">
                    <span className="progress-bar border-success"></span>
                  </span>
                  <span className="progress-right">
                    <span className="progress-bar border-success"></span>
                  </span>
                  <div className="avatar avatar-xxl avatar-rounded">
                    <img src="/assets/img/profiles/avatar-27.jpg" alt="User Profile" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="badge badge-md badge-primary mb-3">Production : 3.45 hrs</div>
                  <h6 className="fw-medium d-flex align-items-center justify-content-center mb-3">
                    <i className="ti ti-fingerprint text-primary me-1"></i>
                    Punch In at 10.00 AM
                  </h6>
                  <div className="d-flex flex-column gap-2">
                    <button className="btn btn-dark w-100">Punch Out</button>
                    <button className="btn btn-outline-dark w-100">Take Break</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Cards & Timeline */}
          <div className="col-xl-9 col-lg-8 d-flex flex-column">
            
            {/* 5 Metrics Cards */}
            <div className="row flex-wrap g-2 mb-4">
              <div className="col" style={{ minWidth: '150px' }}>
                <div className="card h-100 mb-0">
                  <div className="card-body p-3">
                    <span className="avatar avatar-sm bg-primary mb-2">
                      <i className="ti ti-users"></i>
                    </span>
                    <h2 className="mb-1">8.36 / <span className="fs-20 text-gray-5"> 9</span></h2>
                    <p className="fw-medium text-truncate mb-0 fs-13">Total Staff</p>
                  </div>
                </div>
              </div>
              <div className="col" style={{ minWidth: '150px' }}>
                <div className="card h-100 mb-0">
                  <div className="card-body p-3">
                    <span className="avatar avatar-sm bg-dark mb-2">
                      <i className="ti ti-user-check"></i>
                    </span>
                    <h2 className="mb-1">10 / <span className="fs-20 text-gray-5"> 40</span></h2>
                    <p className="fw-medium text-truncate mb-0 fs-13">Present Today</p>
                  </div>
                </div>
              </div>
              <div className="col" style={{ minWidth: '150px' }}>
                <div className="card h-100 mb-0">
                  <div className="card-body p-3">
                    <span className="avatar avatar-sm bg-info mb-2">
                      <i className="ti ti-user-x"></i>
                    </span>
                    <h2 className="mb-1">75 / <span className="fs-20 text-gray-5"> 98</span></h2>
                    <p className="fw-medium text-truncate mb-0 fs-13">Absent Today</p>
                  </div>
                </div>
              </div>
              <div className="col" style={{ minWidth: '150px' }}>
                <div className="card h-100 mb-0">
                  <div className="card-body p-3">
                    <span className="avatar avatar-sm bg-warning mb-2">
                      <i className="ti ti-clock-exclamation"></i>
                    </span>
                    <h2 className="mb-1">5.5 / <span className="fs-20 text-gray-5"> 15</span></h2>
                    <p className="fw-medium text-truncate mb-0 fs-13">late Today</p>
                  </div>
                </div>
              </div>
              <div className="col" style={{ minWidth: '150px' }}>
                <div className="card h-100 mb-0">
                  <div className="card-body p-3">
                    <span className="avatar avatar-sm bg-pink mb-2">
                      <i className="ti ti-calendar-time"></i>
                    </span>
                    <h2 className="mb-1">16 / <span className="fs-20 text-gray-5"> 28</span></h2>
                    <p className="fw-medium text-truncate mb-0 fs-13">Pending Leaves</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="card flex-fill mb-4">
              <div className="card-body p-3">
                <div className="row">
                  <div className="col-xl-3 col-sm-6">
                    <div className="mb-2">
                      <p className="d-flex align-items-center mb-1 fs-13">
                        <i className="ti ti-point-filled text-dark-transparent me-1"></i>
                        Total Working hours
                      </p>
                      <h4 className="mb-0">12h 36m</h4>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div className="mb-2">
                      <p className="d-flex align-items-center mb-1 fs-13">
                        <i className="ti ti-point-filled text-success me-1"></i>
                        Productive Hours
                      </p>
                      <h4 className="mb-0">08h 36m</h4>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div className="mb-2">
                      <p className="d-flex align-items-center mb-1 fs-13">
                        <i className="ti ti-point-filled text-warning me-1"></i>
                        Break hours
                      </p>
                      <h4 className="mb-0">22m 15s</h4>
                    </div>
                  </div>
                  <div className="col-xl-3 col-sm-6">
                    <div className="mb-2">
                      <p className="d-flex align-items-center mb-1 fs-13">
                        <i className="ti ti-point-filled text-info me-1"></i>
                        Overtime
                      </p>
                      <h4 className="mb-0">02h 15m</h4>
                    </div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="progress bg-transparent-dark mb-3" style={{ height: '24px' }}>
                      <div className="progress-bar bg-white rounded" role="progressbar" style={{ width: '18%' }}></div>
                      <div className="progress-bar bg-success rounded me-2" role="progressbar" style={{ width: '18%' }}></div>
                      <div className="progress-bar bg-warning rounded me-2" role="progressbar" style={{ width: '5%' }}></div>
                      <div className="progress-bar bg-success rounded me-2" role="progressbar" style={{ width: '28%' }}></div>
                      <div className="progress-bar bg-warning rounded me-2" role="progressbar" style={{ width: '17%' }}></div>
                      <div className="progress-bar bg-success rounded me-2" role="progressbar" style={{ width: '22%' }}></div>
                      <div className="progress-bar bg-warning rounded me-2" role="progressbar" style={{ width: '5%' }}></div>
                      <div className="progress-bar bg-info rounded me-2" role="progressbar" style={{ width: '3%' }}></div>
                      <div className="progress-bar bg-info rounded" role="progressbar" style={{ width: '2%' }}></div>
                      <div className="progress-bar bg-white rounded" role="progressbar" style={{ width: '18%' }}></div>
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
                      <span className="fs-10">06:00</span>
                      <span className="fs-10">07:00</span>
                      <span className="fs-10">08:00</span>
                      <span className="fs-10">09:00</span>
                      <span className="fs-10">10:00</span>
                      <span className="fs-10">11:00</span>
                      <span className="fs-10">12:00</span>
                      <span className="fs-10">01:00</span>
                      <span className="fs-10">02:00</span>
                      <span className="fs-10">03:00</span>
                      <span className="fs-10">04:00</span>
                      <span className="fs-10">05:00</span>
                      <span className="fs-10">06:00</span>
                      <span className="fs-10">07:00</span>
                      <span className="fs-10">08:00</span>
                      <span className="fs-10">09:00</span>
                      <span className="fs-10">10:00</span>
                      <span className="fs-10">11:00</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Inline Tabs Section */}
        <div className="card mt-2">
          <div className="card-body p-0 mb-4">
            <ul className="nav nav-tabs nav-tabs-bottom mb-0 p-3 pb-0 border-bottom-0" role="tablist">
              <li className="nav-item" role="presentation">
                <a className="nav-link active fw-medium" data-bs-toggle="tab" href="#tab_attendance" role="tab" aria-selected="true">
                  <i className="ti ti-activity me-1"></i> Stats & Feed
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link fw-medium" data-bs-toggle="tab" href="#tab_leaves" role="tab" aria-selected="false">
                  <i className="ti ti-user-plus me-1"></i> ATS Recruitment Pipeline
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link fw-medium" data-bs-toggle="tab" href="#tab_payroll" role="tab" aria-selected="false">
                  <i className="ti ti-devices me-1"></i> Company Assets Cabinet
                </a>
              </li>
              <li className="nav-item" role="presentation">
                <a className="nav-link fw-medium" data-bs-toggle="tab" href="#tab_performance" role="tab" aria-selected="false">
                  <i className="ti ti-chart-bar me-1"></i> Performance Appraisals
                </a>
              </li>
            </ul>
            <div className="tab-content p-4">
              <div className="tab-pane fade show active" id="tab_attendance" role="tabpanel">
                <div className="row">
                  {/* Left Column */}
                  <div className="col-xl-7 d-flex flex-column gap-3">
                    
                    {/* Department Allocations & Distribution */}
                    <div className="card shadow-sm border mb-0">
                      <div className="card-header bg-white border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold text-dark fs-18">Department Allocations & Distribution</h5>
                          <p className="text-muted fs-13 mb-0">Ratio analysis of staff counts across divisions.</p>
                        </div>
                        <button className="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center fw-medium px-3 py-1">
                          <i className="ti ti-download me-1"></i> Export CSV
                        </button>
                      </div>
                      <div className="card-body px-4 pb-4 pt-3">
                        <div className="d-flex justify-content-between py-3 border-bottom border-light">
                          <span className="fw-bold text-dark fs-14">Creative</span>
                          <span className="text-muted fs-13">0 Employees (0%)</span>
                        </div>
                        <div className="d-flex justify-content-between py-3 border-bottom border-light">
                          <span className="fw-bold text-dark fs-14">Engineering</span>
                          <span className="text-muted fs-13">0 Employees (0%)</span>
                        </div>
                        <div className="d-flex justify-content-between py-3 border-bottom border-light">
                          <span className="fw-bold text-dark fs-14">Unassigned</span>
                          <span className="text-muted fs-13">17 Employees (85%)</span>
                        </div>
                        <div className="d-flex justify-content-between py-3 border-bottom border-light">
                          <span className="fw-bold text-dark fs-14">support</span>
                          <span className="text-muted fs-13">1 Employees (5%)</span>
                        </div>
                        <div className="d-flex justify-content-between py-3">
                          <span className="fw-bold text-dark fs-14">Sales</span>
                          <span className="text-muted fs-13">2 Employees (10%)</span>
                        </div>
                      </div>
                    </div>

                    {/* Weekly Attendance Analytics */}
                    <div className="card shadow-sm border mb-0">
                      <div className="card-header bg-white border-0 pb-0 pt-4 px-4">
                        <h5 className="mb-1 fw-bold text-dark fs-18">Weekly Attendance Analytics</h5>
                        <p className="text-muted fs-13 mb-0">Present ratio percentages for the past 6 operational days.</p>
                      </div>
                      <div className="card-body px-4 pb-4">
                        <div className="mt-4">
                          <WeeklyAttendanceChart />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Right Column */}
                  <div className="col-xl-5 d-flex flex-column gap-3 mt-3 mt-xl-0">
                    
                    {/* View Events */}
                    <div className="card shadow-sm border mb-0">
                      <div className="card-header bg-white border-0 pb-0 pt-4 px-4 d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="mb-1 fw-bold text-dark fs-18">View Events</h5>
                          <p className="text-muted fs-13 mb-0">Manage company calendar</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                          <button className="btn btn-outline-primary btn-sm rounded-pill d-inline-flex align-items-center fw-medium px-3 py-1" data-bs-toggle="modal" data-bs-target="#add_event_modal">
                            <i className="ti ti-plus me-1"></i> Add Event
                          </button>
                          <a href="#" className="text-muted fs-12 fw-medium text-decoration-none" data-bs-toggle="modal" data-bs-target="#view_all_events_modal">View all</a>
                        </div>
                      </div>
                      <div className="card-body px-4 pb-4 pt-3">
                        
                        {/* Mini Calendar */}
                        <MiniCalendar />

                        {/* Event List */}
                        <div className="bg-light p-3 rounded d-flex justify-content-between align-items-center border border-light-subtle shadow-sm">
                          <div className="d-flex align-items-center gap-3">
                            <span className="avatar avatar-md bg-purple text-white rounded-circle flex-shrink-0 shadow-sm d-flex justify-content-center align-items-center">
                              <i className="ti ti-calendar-event fs-18"></i>
                            </span>
                            <div>
                              <h6 className="fw-bold text-dark mb-1 fs-14">Janmashtami</h6>
                              <p className="text-muted mb-0 fs-12">happy janmashtami</p>
                            </div>
                          </div>
                          <div className="text-end">
                            <h6 className="fw-bold text-dark mb-1 fs-14">04 Sep</h6>
                            <p className="text-muted mb-1 fs-11">Full Day</p>
                            <div className="d-flex gap-2 justify-content-end">
                              <a href="#" className="text-primary fs-14"><i className="ti ti-pencil"></i></a>
                              <a href="#" className="text-danger fs-14"><i className="ti ti-trash"></i></a>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* HR Updates Bulletin (Design from Upcoming Interview) */}
                    <div className="card shadow-sm border mb-0 flex-fill">
                      <div className="card-body d-flex justify-content-between flex-column p-4">
                        <div className="hide-scrollbar" style={{ maxHeight: '310px', overflowY: 'auto', paddingRight: '4px' }}>
                          
                          {/* Header */}
                          <div className="border rounded border-start border-start-primary d-flex align-items-center justify-content-between p-2 gap-2 flex-wrap mb-2">
                            <h2 className="card-title mb-0 fs-16 fw-bold">HR Updates Bulletin</h2>
                            <button className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="modal" data-bs-target="#post_new_modal">
                              <i className="ti ti-calendar me-1 fs-14"></i>Post New
                            </button>
                          </div>

                          {/* Update 1 */}
                          <div className="p-3 rounded border border-start border-start-4 border-start-primary mb-2">
                            <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-0">
                              <div>
                                <p className="text-dark fw-semibold mb-1">Meeting <span className="text-primary fs-12 ms-2 fw-normal">- HR Dept</span></p>
                                <p className="fs-13 mb-0">2026-08-27</p>
                                <p className="text-muted fs-13 mb-0 mt-1">All You are present in meeting</p>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <a href="#" className="text-primary fs-16"><i className="ti ti-pencil"></i></a>
                                <a href="#" className="text-danger fs-16"><i className="ti ti-trash"></i></a>
                              </div>
                            </div>
                           
                          </div>

                          {/* Update 2 */}
                          <div className="p-3 rounded border border-start border-start-4 border-start-secondary mb-2">
                            <div className="d-flex align-items-center justify-content-between gap-2 flex-wrap mb-0">
                              <div>
                                <p className="text-dark fw-semibold mb-1">Notice</p>
                                <p className="fs-13 mb-0">2026-08-27</p>
                                <p className="text-muted fs-13 mb-0 mt-1">The all employee are informed that you have to reach the office at 9'o clock</p>
                              </div>
                              <div className="d-flex align-items-center gap-2">
                                <a href="#" className="text-primary fs-16"><i className="ti ti-pencil"></i></a>
                                <a href="#" className="text-danger fs-16"><i className="ti ti-trash"></i></a>
                              </div>
                            </div>
                          
                          </div>

                        </div>

                        <a href="#" className="btn btn-light w-100 fw-medium" data-bs-toggle="modal" data-bs-target="#view_all_updates_modal">
                          View All <i className="ti ti-arrow-right ms-1"></i>
                        </a>

                      </div>
                    </div>

                  </div>
                </div>
              </div>
              <div className="tab-pane fade p-0" id="tab_leaves" role="tabpanel">
                <ATSPipeline />
              </div>
              <div className="tab-pane fade p-0" id="tab_payroll" role="tabpanel">
                <CompanyAssets />
              </div>
              <div className="tab-pane fade p-0" id="tab_performance" role="tabpanel">
                <PerformanceAppraisals />
              </div>
            </div>
          </div>
        </div>

      </div>
      
      {/* Modals */}
      {/* Export CSV Modal */}
      <div className="modal fade" id="export_csv_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Export Department Allocations</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <p className="text-muted">Choose the date range for the department allocation data you wish to export.</p>
              <div className="mb-3">
                <label className="form-label fw-medium">Select Date Range</label>
                <input type="text" className="form-control" placeholder="DD/MM/YYYY - DD/MM/YYYY" />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white border" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Download CSV</button>
            </div>
          </div>
        </div>
      </div>

      {/* Add Event Modal */}
      <div className="modal fade" id="add_event_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Add Event</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-medium">Event Date <span className="text-danger">*</span></label>
                <CustomDatePicker placeholderText="Select Date" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Event Title <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Enter event title" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Event Description</label>
                <input type="text" className="form-control" placeholder="e.g. National Holiday, Happy Birthday!" />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Event Type</label>
                <CustomSelect 
                  options={[
                    { value: 'holiday', label: 'Holiday' },
                    { value: 'birthday', label: 'Birthday' }
                  ]} 
                  placeholder="Select Type" 
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Duration</label>
                <CustomSelect 
                  options={[
                    { value: 'Full Day', label: 'Full Day' },
                    { value: 'First Half', label: 'First Half' },
                    { value: 'Second Half', label: 'Second Half' }
                  ]} 
                  placeholder="Select Duration" 
                />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white border" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Save Event</button>
            </div>
          </div>
        </div>
      </div>

      {/* Post New Update Modal */}
      <div className="modal fade" id="post_new_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">Publish Notice / Announcement</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label fw-medium">Notice/Announcement Title <span className="text-danger">*</span></label>
                <input type="text" className="form-control" placeholder="Enter title..." />
              </div>
              <div className="mb-3">
                <label className="form-label fw-medium">Notice/Announcement Content <span className="text-danger">*</span></label>
                <textarea className="form-control" rows="4" placeholder="Write the announcement content here..."></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white border" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary">Publish Notice</button>
            </div>
          </div>
        </div>
      </div>

      {/* View All Events Modal */}
      <div className="modal fade" id="view_all_events_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">All Events</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center py-4">
                <p className="text-muted mb-0">List of all events categorized by month will appear here.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white border" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      {/* View All Updates Modal */}
      <div className="modal fade" id="view_all_updates_modal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title fw-bold">All Announcements & Notices</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="text-center py-4">
                <p className="text-muted mb-0">List of all announcements categorized by month will appear here.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-white border" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default HRDashboard;
