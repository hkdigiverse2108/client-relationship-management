import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const AttendanceReport = () => {
  // Pagination state for attendancereport
  const [currentPage_attendancereport, setCurrentPage_attendancereport] = useState(1);
  const [rowsPerPage_attendancereport, setRowsPerPage_attendancereport] = useState(10);
  const [searchQuery_attendancereport, setSearchQuery_attendancereport] = useState('');

  const attendanceChartOptions = {
    series: [{
      name: 'Present',
      data: [30, 65, 75, 70, 50, 75, 80, 95, 60, 70, 75, 80]
    }, {
      name: 'Absent',
      data: [30, 55, 65, 60, 40, 65, 70, 85, 50, 60, 65, 70]
    }],
    chart: {
      type: 'area',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#03C95A', '#FD3995'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: { show: false },
    fill: { type: 'solid', opacity: 0.05 }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Attendance Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Attendance Report', active: true }
					]}
				>
					<div className="mb-2">
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
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}
				<div className="row">
					<div className="col-xl-6 d-flex">
						<div className="row flex-fill">
							{/* Total Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center overflow-hidden mb-2">
											<div className="attendence-icon">
												<span><i className="ti ti-calendar text-primary"></i></span>
											</div>
											<div className="ms-2 overflow-hidden">
												<p className="fs-12 fw-normal mb-1 text-truncate">Total Working Days</p>
												<h4>25</h4>
											</div>
										</div>
										<div className="attendance-report-bar mb-2">
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{height: '5px'}}>
												<div className="progress-bar bg-success" style={{width: '85%'}}></div>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Total Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center overflow-hidden mb-2">
											<div className="attendence-icon">
												<span><i className="ti ti-calendar text-info"></i></span>
											</div>
											<div className="ms-2 overflow-hidden">
												<p className="fs-12 fw-normal mb-1 text-truncate">Total Leave Taken</p>
												<h4>12</h4>
											</div>
										</div>
										<div className="attendance-report-bar mb-2">
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{height: '5px'}}>
												<div className="progress-bar bg-success" style={{width: '85%'}}></div>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Inactive Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center overflow-hidden mb-2">
											<div className="attendence-icon">
												<span><i className="ti ti-calendar text-pink"></i></span>
											</div>
											<div className="ms-2 overflow-hidden">
												<p className="fs-12 fw-normal mb-1 text-truncate">Total Holidays</p>
												<h4>6</h4>
											</div>
										</div>
										<div className="attendance-report-bar mb-2">
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{height: '5px'}}>
												<div className="progress-bar bg-success" style={{width: '85%'}}></div>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Inactive Companies */}

							{/* Company Location */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									
							<div className="card-body">
										<div className="d-flex align-items-center overflow-hidden mb-2">
											<div className="attendence-icon">
												<span><i className="ti ti-calendar text-warning"></i></span>
											</div>
											<div className="ms-2 overflow-hidden">
												<p className="fs-12 fw-normal mb-1 text-truncate">Total Halfdays</p>
												<h4>5</h4>
											</div>
										</div>
										<div className="attendance-report-bar mb-2">
											<div className="progress" role="progressbar" aria-label="Success example"
												aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"
												style={{height: '5px'}}>
												<div className="progress-bar bg-success" style={{width: '85%'}}></div>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Company Location */}
						</div>
					</div>
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5><i className="ti ti-chart-area-line me-2 text-danger"></i>Attendance</h5>
								<div className="d-flex align-items-center">
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-success me-1"></i>Present
									</span>
									<span className="d-flex align-items-center">
										<i className="ti ti-square-filled text-danger me-1"></i>Absent
									</span>
								</div>
								<div className="dropdown">
									<Link to="#" className="btn btn-white border btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
										This Year
									</Link>
									<ul className="dropdown-menu dropdown-menu-end p-3">
										<li><Link to="#" className="dropdown-item rounded-1">This Year</Link></li>
										<li><Link to="#" className="dropdown-item rounded-1">Last Year</Link></li>
									</ul>
								</div>
							</div>
							<div className="card-body py-0">
								<ReactApexChart options={attendanceChartOptions} series={attendanceChartOptions.series} type="area" height={250} />
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
											value={rowsPerPage_attendancereport}
											onChange={(e) => { setRowsPerPage_attendancereport(Number(e.target.value)); setCurrentPage_attendancereport(1); }}
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
											value={searchQuery_attendancereport}
											onChange={(e) => { setSearchQuery_attendancereport(e.target.value); setCurrentPage_attendancereport(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Name</th>
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
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Anthony Lewis</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:32 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>06:45 PM</td>
										<td>30 Min</td>
										<td>32 Min</td>
										<td>20 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.55 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Brian Villalobos</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>06:12 PM</td>
										<td>20 Min</td>
										<td>-</td>
										<td>45 Min</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>7.54 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-01.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Harvey Smith</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>06:13 PM</td>
										<td>50 Min</td>
										<td>-</td>
										<td>33 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.45 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Stephan Peralt</a></p>
													<span className="fs-12">Executive Officer</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>06:23 PM</td>
										<td>41 Min</td>
										<td>-</td>
										<td>50 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.55 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Doglas Martini</a></p>
													<span className="fs-12">Manager</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>06:43 PM</td>
										<td>23 Min</td>
										<td>-</td>
										<td>10 Min</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.22 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-02.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Linda Ray</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>07:15 PM</td>
										<td>03 Min</td>
										<td>-</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.32 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-35.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Elliot Murray</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>07:13 PM</td>
										<td>32 Min</td>
										<td>-</td>
										<td>-</td>
										<td>
											<span className="badge badge-info d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>9.15 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-36.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Rebecca Smtih</a></p>
													<span className="fs-12">Executive</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>09:17 PM</td>
										<td>14 Min</td>
										<td>12 Min</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>9.25 Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-37.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Connie Waters</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>09:00 AM</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
											</span>
										</td>
										<td>08:15 PM</td>
										<td>12 Min</td>
										<td>-</td>
										<td>-</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>8.35Hrs
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-38.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Lori Broaddus</a></p>
													<span className="fs-12">Developer</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>-</td>
										<td>
											<span
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Absent
											</span>
										</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>-</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-sm">
												<i className="ti ti-clock-hour-11 me-1"></i>0.00 Hrs
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_attendancereport - 1) * rowsPerPage_attendancereport + 1, 11)}-{Math.min(currentPage_attendancereport * rowsPerPage_attendancereport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_attendancereport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendancereport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_attendancereport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_attendancereport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_attendancereport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_attendancereport(p => Math.min(p + 1, 2))}>
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

export default AttendanceReport;
