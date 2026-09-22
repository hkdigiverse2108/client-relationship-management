import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const AttendanceAdmin = () => {
  // Pagination state for attendanceadmin
  const [currentPage_attendanceadmin, setCurrentPage_attendanceadmin] = useState(1);
  const [rowsPerPage_attendanceadmin, setRowsPerPage_attendanceadmin] = useState(10);
  const [searchQuery_attendanceadmin, setSearchQuery_attendanceadmin] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Attendance Admin"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Attendance' },
						{ label: 'Attendance Admin', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/attendance-employee" className="btn btn-icon btn-sm  me-1"><i
										className="ti ti-brand-days-counter"></i></a>
								<a href="/attendance-admin"
									className="btn btn-icon btn-sm active bg-primary text-white"><i
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
							<a href="#" className="btn btn-primary d-flex align-items-center"
								data-bs-target="#attendance_report" data-bs-toggle="modal"><i
									className="ti ti-file-analytics me-2"></i>Report</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card border-0">
					<div className="card-body">
						<div className="row align-items-center mb-4">
							<div className="col-md-5">
								<div className="mb-3 mb-md-0">
									<h4 className="mb-1">Attendance Details Today</h4>
									<p>Data from the 800+ total no of employees</p>
								</div>
							</div>
							<div className="col-md-7">
								<div className="d-flex align-items-center justify-content-md-end">
									<h6>Total Absenties today</h6>
									<div className="avatar-list-stacked avatar-group-sm ms-4">
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-02.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-03.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-05.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-06.jpg"
												alt="img" />
										</span>
										<span className="avatar avatar-rounded">
											<img className="border border-white" src="/assets/img/profiles/avatar-07.jpg"
												alt="img" />
										</span>
										<a className="avatar bg-primary avatar-rounded text-fixed-white fs-12"
											href="#" onClick={(e) => e.preventDefault()}>
											+1
										</a>
									</div>
								</div>
							</div>
						</div>
						<div className="border rounded">
							<div className="row gx-0">
								<div className="col-md col-sm-4 border-end">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Present</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>250</h5>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Late Login</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>45</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Uninformed</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>15</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-12%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4 border-end">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Permisson</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>03</h5>
											<span className="badge badge-success d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												+1%
											</span>
										</div>
									</div>
								</div>
								<div className="col-md col-sm-4">
									<div className="p-3">
										<span className="fw-medium mb-1 d-block">Absent</span>
										<div className="d-flex align-items-center justify-content-between">
											<h5>12</h5>
											<span className="badge badge-danger d-inline-flex align-items-center">
												<i className="ti ti-arrow-wave-right-down me-1"></i>
												-19%
											</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Admin Attendance</h5>
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
									Department
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Finance</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Application
											Development</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">IT Management</Link>
									</li>
								</ul>
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
											value={rowsPerPage_attendanceadmin}
											onChange={(e) => { setRowsPerPage_attendanceadmin(Number(e.target.value)); setCurrentPage_attendanceadmin(1); }}
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
											value={searchQuery_attendanceadmin}
											onChange={(e) => { setSearchQuery_attendanceadmin(e.target.value); setCurrentPage_attendanceadmin(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th className="no-sort">
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" id="select-all" />
											</div>
										</th>
										<th>Employee</th>
										<th>Status</th>
										<th>Check In</th>
										<th>Check Out</th>
										<th>Break</th>
										<th>Late</th>
										<th>Production Hours</th>
										<th></th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-49.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											06:45 PM
										</td>
										<td>30 Min</td>
										<td>
											32 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.55 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											06:12 PM
										</td>
										<td>20 Min</td>
										<td>
											20 Min
										</td>
										<td><span className="badge badge-danger d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>7.54 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
													<span className="fs-12 fw-normal ">HR</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											06:13 PM
										</td>
										<td>50 Min</td>
										<td>
											23 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.45 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											06:23 PM
										</td>
										<td>41 Min</td>
										<td>
											50 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.35 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
													<span className="fs-12 fw-normal ">Development</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											06:43 PM
										</td>
										<td>23 Min</td>
										<td>
											10 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.22 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Linda Ray</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											07:15 PM
										</td>
										<td>03 Min</td>
										<td>
											30 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.32 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-35.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Elliot Murray</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											07:13 PM
										</td>
										<td>32 Min</td>
										<td>
											41 Min
										</td>
										<td><span className="badge badge-info d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>9.15 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-30.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Rebecca Smtih</a></h6>
													<span className="fs-12 fw-normal ">UI/UX Team</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											09:17 PM
										</td>
										<td>14 Min</td>
										<td>
											12 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>9.25 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Connie Waters</a></h6>
													<span className="fs-12 fw-normal ">Management</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-success-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Present</span></td>
										<td>09:00 AM</td>
										<td>
											08:15 PM
										</td>
										<td>12 Min</td>
										<td>
											03 Min
										</td>
										<td><span className="badge badge-success d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>8.35 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Lori Broaddus</a></h6>
													<span className="fs-12 fw-normal ">Finance</span>
												</div>
											</div>
										</td>
										<td><span
												className="badge badge-danger-transparent d-inline-flex align-items-center"><i
													className="ti ti-point-filled me-1"></i>Absent</span></td>
										<td>-</td>
										<td>
											-
										</td>
										<td>-</td>
										<td>
											-
										</td>
										<td><span className="badge badge-danger d-inline-flex align-items-center"><i
													className="ti ti-clock-hour-11 me-1"></i>0.00 Hrs</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_attendance"><i className="ti ti-edit"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_attendanceadmin - 1) * rowsPerPage_attendanceadmin + 1, 11)}-{Math.min(currentPage_attendanceadmin * rowsPerPage_attendanceadmin, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_attendanceadmin === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendanceadmin(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_attendanceadmin === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_attendanceadmin(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_attendanceadmin === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendanceadmin(p => Math.min(p + 1, 2))}>
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
				<p className="mb-0">2014 - 2025 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default AttendanceAdmin;
