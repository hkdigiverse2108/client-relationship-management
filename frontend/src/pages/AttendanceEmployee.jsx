import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const AttendanceEmployee = () => {
  // Pagination state for attendanceemployee
  const [currentPage_attendanceemployee, setCurrentPage_attendanceemployee] = useState(1);
  const [rowsPerPage_attendanceemployee, setRowsPerPage_attendanceemployee] = useState(10);
  const [searchQuery_attendanceemployee, setSearchQuery_attendanceemployee] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Employee Attendance"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Employee Attendance', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/attendance-admin"
									className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-brand-days-counter"></i></a>
								<a href="/attendance-admin" className="btn btn-icon btn-sm"><i
										className="ti ti-calendar-event"></i></a>
							</div>
						</div>
						<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-1"></i>Export
								</a>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-pdf me-1"></i>Export as PDF</a>
									</li>
									<li>
										<a href="#" onClick={(e) => e.preventDefault()} className="dropdown-item rounded-1"><i
												className="ti ti-file-type-xls me-1"></i>Export as Excel </a>
									</li>
								</ul>
							</div>
						</div>
						<div className="mb-2">
							<a href="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal"
								data-bs-target="#attendance_report"><i className="ti ti-file-analytics me-2"></i>Report</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="row">
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
										<img src="/assets/img/profiles/avatar-27.jpg" alt="Img" />
									</div>
								</div>
								<div className="text-center">
									<div className="badge badge-md badge-primary mb-3">Production : 3.45 hrs</div>
									<h6 className="fw-medium d-flex align-items-center justify-content-center mb-3">
										<i className="ti ti-fingerprint text-primary me-1"></i>
										Punch In at 10.00 AM
									</h6>
									<a href="#" className="btn btn-dark w-100">Punch Out</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9 col-lg-8 d-flex">
						<div className="row flex-fill">
							<div className="col-xl-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="border-bottom mb-2 pb-2">
											<span className="avatar avatar-sm bg-primary mb-2"><i
													className="ti ti-clock-stop"></i></span>
											<h2 className="mb-2">8.36 / <span className="fs-20 text-gray-5"> 9</span></h2>
											<p className="fw-medium text-truncate">Total Hours Today</p>
										</div>
										<div>
											<p className="d-flex align-items-center fs-13">
												<span
													className="avatar avatar-xs rounded-circle bg-success flex-shrink-0 me-2">
													<i className="ti ti-arrow-up fs-12"></i>
												</span>
												<span>5% This Week</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="border-bottom mb-2 pb-2">
											<span className="avatar avatar-sm bg-dark mb-2"><i
													className="ti ti-clock-up"></i></span>
											<h2 className="mb-2">10 / <span className="fs-20 text-gray-5"> 40</span></h2>
											<p className="fw-medium text-truncate">Total Hours Week</p>
										</div>
										<div>
											<p className="d-flex align-items-center fs-13">
												<span
													className="avatar avatar-xs rounded-circle bg-success flex-shrink-0 me-2">
													<i className="ti ti-arrow-up fs-12"></i>
												</span>
												<span>7% Last Week</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="border-bottom mb-2 pb-2">
											<span className="avatar avatar-sm bg-info mb-2"><i
													className="ti ti-calendar-up"></i></span>
											<h2 className="mb-2">75 / <span className="fs-20 text-gray-5"> 98</span></h2>
											<p className="fw-medium text-truncate">Total Hours Month</p>
										</div>
										<div>
											<p className="d-flex align-items-center fs-13 text-truncate">
												<span
													className="avatar avatar-xs rounded-circle bg-danger flex-shrink-0 me-2">
													<i className="ti ti-arrow-down fs-12"></i>
												</span>
												<span>8% Last Month</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-3 col-md-6">
								<div className="card">
									<div className="card-body">
										<div className="border-bottom mb-2 pb-2">
											<span className="avatar avatar-sm bg-pink mb-2"><i
													className="ti ti-calendar-star"></i></span>
											<h2 className="mb-2">16 / <span className="fs-20 text-gray-5"> 28</span></h2>
											<p className="fw-medium text-truncate">Overtime this Month</p>
										</div>
										<div>
											<p className="d-flex align-items-center fs-13 text-truncate">
												<span
													className="avatar avatar-xs rounded-circle bg-danger flex-shrink-0 me-2">
													<i className="ti ti-arrow-down fs-12"></i>
												</span>
												<span>6% Last Month</span>
											</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-md-12">
								<div className="card">
									<div className="card-body">
										<div className="row">
											<div className="col-xl-3">
												<div className="mb-3">
													<p className="d-flex align-items-center mb-1"><i
															className="ti ti-point-filled text-dark-transparent me-1"></i>Total
														Working hours</p>
													<h3>12h 36m</h3>
												</div>
											</div>
											<div className="col-xl-3">
												<div className="mb-3">
													<p className="d-flex align-items-center mb-1"><i
															className="ti ti-point-filled text-success me-1"></i>Productive
														Hours</p>
													<h3>08h 36m</h3>
												</div>
											</div>
											<div className="col-xl-3">
												<div className="mb-3">
													<p className="d-flex align-items-center mb-1"><i
															className="ti ti-point-filled text-warning me-1"></i>Break hours
													</p>
													<h3>22m 15s</h3>
												</div>
											</div>
											<div className="col-xl-3">
												<div className="mb-3">
													<p className="d-flex align-items-center mb-1"><i
															className="ti ti-point-filled text-info me-1"></i>Overtime</p>
													<h3>02h 15m</h3>
												</div>
											</div>
										</div>
										<div className="row">
											<div className="col-md-12">
												<div className="progress bg-transparent-dark mb-3" style={{height: '24px'}}>
													<div className="progress-bar bg-white rounded" role="progressbar"
														style={{width: '18%'}}></div>
													<div className="progress-bar bg-success rounded me-2" role="progressbar"
														style={{width: '18%'}}></div>
													<div className="progress-bar bg-warning rounded me-2" role="progressbar"
														style={{width: '5%'}}></div>
													<div className="progress-bar bg-success rounded me-2" role="progressbar"
														style={{width: '28%'}}></div>
													<div className="progress-bar bg-warning rounded me-2" role="progressbar"
														style={{width: '17%'}}></div>
													<div className="progress-bar bg-success rounded me-2" role="progressbar"
														style={{width: '22%'}}></div>
													<div className="progress-bar bg-warning rounded me-2" role="progressbar"
														style={{width: '5%'}}></div>
													<div className="progress-bar bg-info rounded me-2" role="progressbar"
														style={{width: '3%'}}></div>
													<div className="progress-bar bg-info rounded" role="progressbar"
														style={{width: '2%'}}></div>
													<div className="progress-bar bg-white rounded" role="progressbar"
														style={{width: '18%'}}></div>
												</div>

											</div>
											<div className="co-md-12">
												<div
													className="d-flex align-items-center justify-content-between flex-wrap row-gap-2">
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
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Employee Attendance</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon position-relative">
									<span className="input-icon-addon">
										<i className="ti ti-calendar text-gray-9"></i>
									</span>
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Present</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Absent</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Sort By : Last 7 Days
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Recently Added</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Ascending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Descending</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last Month</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Last 7 Days</Link>
									</li>
								</ul>
							</div>
						</div>
					</div>
							<div className="card-body p-0">
						
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_attendanceemployee}
											onChange={(e) => { setRowsPerPage_attendanceemployee(Number(e.target.value)); setCurrentPage_attendanceemployee(1); }}
										>
											<option value={10}>10</option>
											<option value={20}>20</option>
											<option value={50}>50</option>
										</select>
									</div>
									<div className="input-icon-start position-relative">
										<span className="input-icon-addon">
											<i className="ti ti-search"></i>
										</span>
										<input
											type="text"
											className="form-control form-control-sm"
											placeholder="Search"
											value={searchQuery_attendanceemployee}
											onChange={(e) => { setSearchQuery_attendanceemployee(e.target.value); setCurrentPage_attendanceemployee(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Date</th>
										<th>Check In</th>
										<th>Status</th>
										<th>Check Out</th>
										<th>Break</th>
										<th>Late</th>
										<th>Overtime</th>
										<th>Production Hours</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											14 Jan 2024
										</td>
										<td>09:32 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											06:45 PM
										</td>
										<td>30 Min</td>
										<td>
											32 Min
										</td>
										<td>20 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.55 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											21 Jan 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											06:12 PM
										</td>
										<td>20 Min</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>7.54 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											20 Feb 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											06:13 PM
										</td>
										<td>50 Min</td>
										<td>
											-
										</td>
										<td>33 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.45 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											15 Mar 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											06:23 PM
										</td>
										<td>41 Min</td>
										<td>
											-
										</td>
										<td>50 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.35 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											12 Apr 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											06:43 PM
										</td>
										<td>23 Min</td>
										<td>
											-
										</td>
										<td>10 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.22 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											20 Apr 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											07:15 PM
										</td>
										<td>03 Min</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.32 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											06 Jul 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											07:13 PM
										</td>
										<td>32 Min</td>
										<td>
											-
										</td>
										<td>75 Min</td>
										<td>
											<span className="badge badge-info d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>9.15 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											02 Sep 2024
										</td>
										<td>09:12 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											09:17 PM
										</td>
										<td>14 Min</td>
										<td>
											12 Min
										</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.35Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											10 Dec 2024
										</td>
										<td>-</td>
										<td>
											<span
												className="badge badge-danger-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Absent
											</span>
										</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>0.00 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											15 Nov 2024
										</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-success-transparent d-inline-flex align-items-center">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>
											08:15 PM
										</td>
										<td>12 Min</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-clock-hour-11 me-1"></i>8.35Hrs
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_attendanceemployee - 1) * rowsPerPage_attendanceemployee + 1, 11)}-{Math.min(currentPage_attendanceemployee * rowsPerPage_attendanceemployee, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_attendanceemployee === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendanceemployee(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_attendanceemployee === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_attendanceemployee(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_attendanceemployee === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendanceemployee(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default AttendanceEmployee;
