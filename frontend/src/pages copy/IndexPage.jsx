import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EmpDepartmentChart from '../components/charts/EmpDepartmentChart';
import AttendanceChart from '../components/charts/AttendanceChart';
import SalesIncomeChart from '../components/charts/SalesIncomeChart';
import SemiDonutChart from '../components/charts/SemiDonutChart';
import PageHeader from '../components/common/PageHeader';

const IndexPage = () => {
  // Pagination state for indexpage
  const [currentPage_indexpage, setCurrentPage_indexpage] = useState(1);
  const [rowsPerPage_indexpage, setRowsPerPage_indexpage] = useState(10);
  const [searchQuery_indexpage, setSearchQuery_indexpage] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Admin Dashboard"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Dashboard' },
						{ label: 'Admin Dashboard', active: true }
					]}
					
				>
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
						<div className="input-icon w-100 position-relative">
							<span className="input-icon-addon">
								<i className="ti ti-calendar text-gray-9"></i>
							</span>
							<input type="text" className="form-control yearpicker" defaultValue="2025" />
						</div>
					</div>
					<div className="ms-2 mb-2 head-icons">
						<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
							data-bs-original-title="Collapse" id="collapse-header">
							<i className="ti ti-chevrons-up"></i>
						</a>
					</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Welcome Wrap */}
				<div className="card border-0">
					<div className="card-body d-flex align-items-center justify-content-between flex-wrap pb-1">
						<div className="d-flex align-items-center mb-3">
							<span className="avatar avatar-xl flex-shrink-0">
								<img src="/assets/img/profiles/avatar-31.jpg" className="rounded-circle" alt="img" />
							</span>
							<div className="ms-3">
								<h3 className="mb-2">Welcome Back, Adrian <a href="#" onClick={(e) => e.preventDefault()} className="edit-icon"><i
											className="ti ti-edit fs-14"></i></a></h3>
								<p>You have <span className="text-primary text-decoration-underline">21</span> Pending
									Approvals & <span className="text-primary text-decoration-underline">14</span> Leave
									Requests</p>
							</div>
						</div>
						<div className="d-flex align-items-center flex-wrap mb-1">
							<a href="#" className="btn btn-white me-2 mb-2" data-bs-toggle="modal"
								data-bs-target="#add_project"><i className="ti ti-calendar-cog me-1"></i>Add Schedule</a>
							<a href="#" className="btn btn-primary mb-2" data-bs-toggle="modal"
								data-bs-target="#add_leaves"><i className="ti ti-square-rounded-plus me-1"></i>Add
								Requests</a>
						</div>
					</div>
				</div>
				{/* /Welcome Wrap */}

				<div className="row">

					{/* Widget Info */}
					<div className="col-xxl-8 d-flex">
						<div className="row flex-fill">
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-primary mb-2">
											<i className="ti ti-calendar-share fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Attendance Overview</h6>
										<h3 className="mb-3">120/154</h3>
										<a href="/attendance-employee" className="link-default">View Details</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-secondary mb-2">
											<i className="ti ti-browser fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Project's</h6>
										<h3 className="mb-3">90/125</h3>
										<a href="/projects" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-info mb-2">
											<i className="ti ti-users-group fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Clients</h6>
										<h3 className="mb-3">69/86</h3>
										<a href="/clients" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-pink mb-2">
											<i className="ti ti-checklist fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Total No of Tasks</h6>
										<h3 className="mb-3">96/100</h3>
										<a href="/tasks" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-purple mb-2">
											<i className="ti ti-moneybag fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Earnings</h6>
										<h3 className="mb-3">$21,445</h3>
										<a href="/expenses" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-danger mb-2">
											<i className="ti ti-browser fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Profit This Week</h6>
										<h3 className="mb-3">$5,544</h3>
										<a href="/purchase-transaction" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-success mb-2">
											<i className="ti ti-users-group fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">Job Applicants</h6>
										<h3 className="mb-3">98</h3>
										<a href="/job-list" className="link-default">View All</a>
									</div>
								</div>
							</div>
							<div className="col-md-3 col-sm-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<span className="avatar rounded-circle bg-dark mb-2">
											<i className="ti ti-user-star fs-16"></i>
										</span>
										<h6 className="fs-13 fw-medium text-default mb-1">New Hire</h6>
										<h3 className="mb-3">45/48</h3>
										<a href="/candidates" className="link-default">View All</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Widget Info */}

					{/* Employees By Department */}
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employees By Department</h5>
								<div className="dropdown mb-2">
									<Link to="#" className="btn btn-white border btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1"></i>This Week
									</Link>
									<ul className="dropdown-menu dropdown-menu-end p-3">
										<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
										<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
										<li><Link to="#" className="dropdown-item rounded-1">Last Week</Link></li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<EmpDepartmentChart />
								<p className="fs-13"><i className="ti ti-circle-filled me-2 fs-8 text-primary"></i>No of
									Employees increased by <span className="text-success fw-bold">+20%</span> from last Week
								</p>
							</div>
						</div>
					</div>
					{/* /Employees By Department */}

				</div>

				<div className="row">

					{/* Total Employee */}
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employee Status</h5>
								<div className="dropdown mb-2">
									<Link to="#" className="btn btn-white border btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar me-1 fs-14"></i>This Week
									</Link>
									<ul className="dropdown-menu dropdown-menu-end p-3">
										<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
										<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
										<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between mb-1">
									<p className="fs-13 mb-3">Total Employee</p>
									<h3 className="mb-3">154</h3>
								</div>
								<div className="progress-stacked emp-stack mb-3">
									<div className="progress" role="progressbar" aria-label="Segment one" aria-valuenow="15"
										aria-valuemin="0" aria-valuemax="100" style={{width: '40%'}}>
										<div className="progress-bar bg-warning"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment two" aria-valuenow="30"
										aria-valuemin="0" aria-valuemax="100" style={{width: '20%'}}>
										<div className="progress-bar bg-secondary"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment three"
										aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: '10%'}}>
										<div className="progress-bar bg-danger"></div>
									</div>
									<div className="progress" role="progressbar" aria-label="Segment four"
										aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style={{width: '30%'}}>
										<div className="progress-bar bg-pink"></div>
									</div>
								</div>
								<div className="border mb-3">
									<div className="row gx-0">
										<div className="col-6">
											<div className="p-2 flex-fill border-end border-bottom">
												<p className="fs-13 mb-2"><i
														className="ti ti-square-rounded-filled text-primary fs-12 me-2"></i>Fulltime
													<span className="text-gray-9">(48%)</span>
												</p>
												<h2 className="fs-40 fw-bold">112</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill border-bottom text-end">
												<p className="fs-13 mb-2"><i
														className="ti ti-square-rounded0filled me-2 text-secondary fs-12"></i>Contract
													<span className="text-gray-9">(20%)</span>
												</p>
												<h2 className="fs-40 fw-bold">112</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill border-end">
												<p className="fs-13 mb-2"><i
														className="ti ti-square-rounded-filled me-2 text-danger fs-12"></i>Probation
													<span className="text-gray-9">(22%)</span>
												</p>
												<h2 className="fs-40 fw-bold">12</h2>
											</div>
										</div>
										<div className="col-6">
											<div className="p-2 flex-fill text-end">
												<p className="fs-13 mb-2"><i
														className="ti ti-square-rounded-filled text-pink me-2 fs-12"></i>WFH
													<span className="text-gray-9">(20%)</span>
												</p>
												<h2 className="fs-40 fw-bold">04</h2>
											</div>
										</div>
									</div>
								</div>
								<h6 className="mb-2">Top Performer</h6>
								<div
									className="p-2 d-flex align-items-center justify-content-between border border-primary bg-primary-100 br-5 mb-4 perfomer-card">
									<div className="d-flex align-items-center overflow-hidden">
										<span className="me-2">
											<i className="ti ti-award-filled text-primary fs-24"></i>
										</span>
										<a href="/employee-details" className="avatar avatar-md me-2">
											<img src="/assets/img/profiles/avatar-24.jpg"
												className="rounded-circle border border-white" alt="img" />
										</a>
										<div>
											<h6 className="text-truncate mb-1 fs-14 fw-medium"><a
													href="/employee-details">Daniel Esbella</a></h6>
											<p className="fs-13">IOS Developer</p>
										</div>
									</div>
									<div className="text-end">
										<p className="fs-13 mb-1">Performance</p>
										<h5 className="text-primary">99%</h5>
									</div>
								</div>
								<a href="/employees" className="btn btn-light btn-md w-100">View All Employees</a>
							</div>
						</div>
					</div>
					{/* /Total Employee */}

					{/* Attendance Overview */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Attendance Overview</h5>
								<div className="dropdown mb-2">
									<Link to="#" className="btn btn-white btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar-check me-2"></i>Today
									</Link>
									<ul className="dropdown-menu dropdown-menu-end p-3">
										<li>
											<Link to="#" className="dropdown-item rounded-1">Today</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">This Week</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">This Month</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="chartjs-wrapper-demo position-relative mb-4">
									<AttendanceChart />
									<div className="position-absolute text-center attendance-canvas">
										<p className="fs-13 mb-1">Total Attendance</p>
										<h3>120</h3>
									</div>
								</div>
								<h6 className="mb-3">Status</h6>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-success me-1"></i>Present
									</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">59%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-secondary me-1"></i>Late</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">21%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-warning me-1"></i>Permission
									</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">2%</p>
								</div>
								<div className="d-flex align-items-center justify-content-between mb-2">
									<p className="f-13 mb-2"><i className="ti ti-circle-filled text-danger me-1"></i>Absent</p>
									<p className="f-13 fw-medium text-gray-9 mb-2">15%</p>
								</div>
								<div
									className="bg-light br-5 box-shadow-xs p-2 pb-0 d-flex align-items-center justify-content-between flex-wrap">
									<div className="d-flex align-items-center">
										<p className="mb-2 me-2">Total Absenties</p>
										<div className="avatar-list-stacked avatar-group-sm mb-2">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/profiles/avatar-27.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/profiles/avatar-30.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/profiles/avatar-14.jpg" alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img src="/assets/img/profiles/avatar-29.jpg" alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10"
												href="#" onClick={(e) => e.preventDefault()}>
												+1
											</a>
										</div>
									</div>
									<a href="/leaves" className="fs-13 link-primary text-decoration-underline mb-2">View
										Details</a>
								</div>
							</div>
						</div>
					</div>
					{/* /Attendance Overview */}

					{/* Clock-In/Out */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap gap-2">
								<h5 className="mb-0">Clock-In/Out</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown">
										<Link to="#" className="dropdown-toggle btn btn-white btn-md d-inline-flex align-items-center border-0 fs-13 me-2" data-bs-toggle="dropdown">
											All Departments
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">Finance</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Development</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Marketing</Link></li>
										</ul>
									</div>
									<div className="dropdown">
										<Link to="#" className="btn btn-white border btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>Today
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body">
								<div>
									<div
										className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5">
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar flex-shrink-0">
												<img src="/assets/img/profiles/avatar-24.jpg"
													className="rounded-circle border border-2" alt="img" />
											</a>
											<div className="ms-2">
												<h6 className="fs-14 fw-medium text-truncate">Daniel Esbella</h6>
												<p className="fs-13">UI/UX Designer</p>
											</div>
										</div>
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="link-default me-2"><i
													className="ti ti-clock-share"></i></a>
											<span
												className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i
													className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
										</div>
									</div>
									<div className="d-flex align-items-center justify-content-between mb-3 p-2 border br-5">
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar flex-shrink-0">
												<img src="/assets/img/profiles/avatar-23.jpg"
													className="rounded-circle border border-2" alt="img" />
											</a>
											<div className="ms-2">
												<h6 className="fs-14 fw-medium">Doglas Martini</h6>
												<p className="fs-13">Project Manager</p>
											</div>
										</div>
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="link-default me-2"><i
													className="ti ti-clock-share"></i></a>
											<span
												className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i
													className="ti ti-circle-filled fs-5 me-1"></i>09:36</span>
										</div>
									</div>
									<div className="mb-3 p-2 border br-5">
										<div className="d-flex align-items-center justify-content-between">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()} className="avatar flex-shrink-0">
													<img src="/assets/img/profiles/avatar-27.jpg"
														className="rounded-circle border border-2" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fs-14 fw-medium text-truncate">Brian Villalobos</h6>
													<p className="fs-13">PHP Developer</p>
												</div>
											</div>
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()} className="link-default me-2"><i
														className="ti ti-clock-share"></i></a>
												<span
													className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i
														className="ti ti-circle-filled fs-5 me-1"></i>09:15</span>
											</div>
										</div>
										<div
											className="d-flex align-items-center justify-content-between flex-wrap mt-2 border br-5 p-2 pb-0">
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i
														className="ti ti-circle-filled text-success fs-5 me-1"></i>Clock In
												</p>
												<h6 className="fs-13 fw-normal mb-2">10:30 AM</h6>
											</div>
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i
														className="ti ti-circle-filled text-danger fs-5 me-1"></i>Clock Out
												</p>
												<h6 className="fs-13 fw-normal mb-2">09:45 AM</h6>
											</div>
											<div>
												<p className="mb-1 d-inline-flex align-items-center"><i
														className="ti ti-circle-filled text-warning fs-5 me-1"></i>Production
												</p>
												<h6 className="fs-13 fw-normal mb-2">09:21 Hrs</h6>
											</div>
										</div>
									</div>
								</div>
								<h6 className="mb-2">Late</h6>
								<div
									className="d-flex align-items-center justify-content-between mb-3 p-2 border border-dashed br-5">
									<div className="d-flex align-items-center">
										<span className="avatar flex-shrink-0">
											<img src="/assets/img/profiles/avatar-29.jpg"
												className="rounded-circle border border-2" alt="img" />
										</span>
										<div className="ms-2">
											<h6 className="fs-14 fw-medium text-truncate">Anthony Lewis <span
													className="fs-10 fw-medium d-inline-flex align-items-center badge badge-danger"><i
														className="ti ti-clock-hour-11 me-1"></i>30 Min</span></h6>
											<p className="fs-13">Marketing Head</p>
										</div>
									</div>
									<div className="d-flex align-items-center">
										<a href="#" onClick={(e) => e.preventDefault()} className="link-default me-2"><i
												className="ti ti-clock-share"></i></a>
										<span
											className="fs-10 fw-medium d-inline-flex align-items-center badge badge-success"><i
												className="ti ti-circle-filled fs-5 me-1"></i>08:35</span>
									</div>
								</div>
								<a href="/attendance-report" className="btn btn-light btn-md w-100">View All
									Attendance</a>
							</div>
						</div>
					</div>
					{/* /Clock-In/Out */}

				</div>

				<div className="row">

					{/* Jobs Applicants */}
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Jobs Applicants</h5>
								<Link to="/job-list" className="btn btn-light btn-md mb-2">View All</Link>
							</div>
							<div className="card-body">
								<ul className="nav nav-tabs tab-style-1 nav-justified d-sm-flex d-block p-0 mb-4"
									role="tablist">
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium" data-bs-toggle="tab" data-bs-target="#openings"
											aria-current="page" href="#openings" aria-selected="true"
											role="tab">Openings</a>
									</li>
									<li className="nav-item" role="presentation">
										<a className="nav-link fw-medium active" data-bs-toggle="tab"
											data-bs-target="#applicants" href="#applicants" aria-selected="false"
											tabIndex="-1" role="tab">Applicants</a>
									</li>
								</ul>
								<div className="tab-content">
									<div className="tab-pane fade" id="openings">
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="/assets/img/icons/apple.svg"
														className="img-fluid rounded-circle w-auto h-auto" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#" onClick={(e) => e.preventDefault()}>Senior IOS Developer</a></p>
													<span className="fs-12">No of Openings : 25 </span>
												</div>
											</div>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i
													className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="/assets/img/icons/php.svg" className="img-fluid w-auto h-auto"
														alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#" onClick={(e) => e.preventDefault()}>Junior PHP Developer</a></p>
													<span className="fs-12">No of Openings : 20 </span>
												</div>
											</div>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i
													className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="/assets/img/icons/react.svg"
														className="img-fluid w-auto h-auto" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#" onClick={(e) => e.preventDefault()}>Junior React Developer </a></p>
													<span className="fs-12">No of Openings : 30 </span>
												</div>
											</div>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i
													className="ti ti-edit"></i></a>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-0">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0 bg-gray-100">
													<img src="/assets/img/icons/laravel-icon.svg"
														className="img-fluid w-auto h-auto" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#" onClick={(e) => e.preventDefault()}>Senior Laravel Developer</a></p>
													<span className="fs-12">No of Openings : 40 </span>
												</div>
											</div>
											<a href="#" onClick={(e) => e.preventDefault()}
												className="btn btn-light btn-sm p-0 btn-icon d-flex align-items-center justify-content-center"><i
													className="ti ti-edit"></i></a>
										</div>
									</div>
									<div className="tab-pane fade show active" id="applicants">
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a href="#">Brian
															Villalobos</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 5+
														Years<i
															className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-secondary badge-xs">UI/UX Designer</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#">Anthony Lewis</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 4+
														Years<i
															className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-info badge-xs">Python Developer</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-4">
											<div className="d-flex align-items-center">
												<a href="#" className="avatar overflow-hidden flex-shrink-0">
													<img src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#">Stephan Peralt</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 6+
														Years<i
															className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-pink badge-xs">Android Developer</span>
										</div>
										<div className="d-flex align-items-center justify-content-between mb-0">
											<div className="d-flex align-items-center">
												<a href="#" onClick={(e) => e.preventDefault()}
													className="avatar overflow-hidden flex-shrink-0">
													<img src="/assets/img/users/user-34.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2 overflow-hidden">
													<p className="text-dark fw-medium text-truncate mb-0"><a
															href="#" onClick={(e) => e.preventDefault()}>Doglas Martini</a></p>
													<span className="fs-13 d-inline-flex align-items-center">Exp : 2+
														Years<i
															className="ti ti-circle-filled fs-4 mx-2 text-primary"></i>USA</span>
												</div>
											</div>
											<span className="badge badge-purple badge-xs">React Developer</span>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Jobs Applicants */}

					{/* Employees */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Employees</h5>
								<Link to="/employees" className="btn btn-light btn-md mb-2">View All</Link>
							</div>
							<div className="card-body p-0 employee-table">
								
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_indexpage}
											onChange={(e) => { setRowsPerPage_indexpage(Number(e.target.value)); setCurrentPage_indexpage(1); }}
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
											value={searchQuery_indexpage}
											onChange={(e) => { setSearchQuery_indexpage(e.target.value); setCurrentPage_indexpage(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<tbody>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
															<img src="/assets/img/users/user-32.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Anthony
																	Lewis</a></h6>
															<span className="fs-12">Finance</span>
														</div>
													</div>
												</td>
												<td className="text-end">
													<span className="badge badge-secondary-transparent badge-xs">
														Finance
													</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="/assets/img/users/user-09.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
															<span className="fs-12">PHP Developer</span>
														</div>
													</div>
												</td>
												<td className="text-end">
													<span
														className="badge badge-danger-transparent badge-xs">Development</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" className="avatar">
															<img src="/assets/img/users/user-01.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
															<span className="fs-12">Executive</span>
														</div>
													</div>
												</td>
												<td className="text-end">
													<span className="badge badge-info-transparent badge-xs">Marketing</span>
												</td>
											</tr>
											<tr>
												<td>
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
															<img src="/assets/img/users/user-34.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Doglas
																	Martini</a></h6>
															<span className="fs-12">Project Manager</span>
														</div>
													</div>
												</td>
												<td className="text-end">
													<span className="badge badge-purple-transparent badge-xs">Manager</span>
												</td>
											</tr>
											<tr>
												<td className="border-0">
													<div className="d-flex align-items-center">
														<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
															<img src="/assets/img/users/user-37.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="#" onClick={(e) => e.preventDefault()}>Anthony
																	Lewis</a></h6>
															<span className="fs-12">UI/UX Designer</span>
														</div>
													</div>
												</td>
												<td className="border-0 text-end">
													<span className="badge badge-pink-transparent badge-xs">UI/UX
														Design</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
					{/* /Employees */}

					{/* Todo */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Todo</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2 me-2">
										<Link to="#" className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>Today
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
										</ul>
									</div>
									<Link to="#" className="btn btn-primary btn-icon btn-xs rounded-circle d-flex align-items-center justify-content-center p-0 mb-2" data-bs-toggle="modal" data-bs-target="#add_todo">
										<i className="ti ti-plus fs-16"></i>
									</Link>
								</div>
							</div>
							<div className="card-body d-flex flex-column justify-content-between">
								<div className="d-flex align-items-center todo-item border bg-white p-2 br-5">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo1" />
										<label className="form-check-label fw-medium" htmlFor="todo1">Add Holidays</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 bg-primary-transparent">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo2" />
										<label className="form-check-label fw-medium" htmlFor="todo2">Add Meeting to
											Client</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 bg-danger-transparent">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo3" />
										<label className="form-check-label fw-medium" htmlFor="todo3">Chat with Adrian</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 bg-purple-transparent">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo4" />
										<label className="form-check-label fw-medium" htmlFor="todo4">Management Call</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 bg-info-transparent">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo5" />
										<label className="form-check-label fw-medium" htmlFor="todo5">Add Payroll</label>
									</div>
								</div>
								<div className="d-flex align-items-center todo-item border p-2 br-5 bg-warning-transparent">
									<i className="ti ti-grid-dots me-2"></i>
									<div className="form-check">
										<input className="form-check-input" type="checkbox" id="todo6" />
										<label className="form-check-label fw-medium" htmlFor="todo6">Add Policy for Increment
										</label>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Todo */}

				</div>

				<div className="row">

					{/* Sales Overview */}
					<div className="col-xl-7 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Sales Overview</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<Link to="#" className="dropdown-toggle dropdown-sm btn btn-white border-0 btn-sm d-inline-flex align-items-center fs-13 me-2" data-bs-toggle="dropdown">
											All Departments
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">UI/UX Designer</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">HR Manager</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Junior Tester</Link></li>
										</ul>
									</div>
									<div className="dropdown mb-2">
										<Link to="#" className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>Today
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pb-0">
								<div className="d-flex align-items-center justify-content-between flex-wrap">
									<div className="d-flex align-items-center mb-1">
										<p className="fs-13 text-gray-9 me-3 mb-0"><i
												className="ti ti-square-rounded-filled me-2 text-primary"></i>Income</p>
										<p className="fs-13 text-gray-9 mb-0"><i
												className="ti ti-square-rounded-filled me-2 text-gray-2"></i>Expenses</p>
									</div>
									<p className="fs-13 mb-1">Last Updated at 11:30PM</p>
								</div>
								<SalesIncomeChart />
							</div>
						</div>
					</div>
					{/* /Sales Overview */}

					{/* Invoices */}
					<div className="col-xl-5 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Invoices</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<Link to="#" className="dropdown-toggle dropdown-sm btn btn-white btn-sm d-inline-flex align-items-center fs-13 me-2 border-0" data-bs-toggle="dropdown">
											Invoices
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">Invoices</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Paid</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Unpaid</Link></li>
										</ul>
									</div>
									<div className="dropdown mb-2">
										<Link to="#" className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>This Week
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-2">
								<div className="table-responsive pt-1">
									<table className="table table-nowrap table-borderless mb-0">
										<tbody>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar">
															<img src="/assets/img/users/user-39.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a
																	href="/invoice-details">Redesign Website</a>
															</h6>
															<span
																className="fs-13 d-inline-flex align-items-center">#INVOO2<i
																	className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Logistics</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$3560</h6>
												</td>
												<td className="px-0 text-end">
													<span
														className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i
															className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar">
															<img src="/assets/img/users/user-40.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/invoice-details">Module
																	Completion</a></h6>
															<span
																className="fs-13 d-inline-flex align-items-center">#INVOO5<i
																	className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Yip
																Corp</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$4175</h6>
												</td>
												<td className="px-0 text-end">
													<span
														className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i
															className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar">
															<img src="/assets/img/users/user-55.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/invoice-details">Change
																	on Emp Module</a></h6>
															<span
																className="fs-13 d-inline-flex align-items-center">#INVOO3<i
																	className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis
																LLP</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$6985</h6>
												</td>
												<td className="px-0 text-end">
													<span
														className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i
															className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar">
															<img src="/assets/img/users/user-42.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a href="/invoice-details">Changes
																	on the Board</a></h6>
															<span
																className="fs-13 d-inline-flex align-items-center">#INVOO2<i
																	className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>Ignis
																LLP</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$1457</h6>
												</td>
												<td className="px-0 text-end">
													<span
														className="badge badge-danger-transparent badge-xs d-inline-flex align-items-center"><i
															className="ti ti-circle-filled fs-5 me-1"></i>Unpaid</span>
												</td>
											</tr>
											<tr>
												<td className="px-0">
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar">
															<img src="/assets/img/users/user-44.jpg"
																className="img-fluid rounded-circle" alt="img" />
														</a>
														<div className="ms-2">
															<h6 className="fw-medium"><a
																	href="/invoice-details">Hospital Management</a>
															</h6>
															<span
																className="fs-13 d-inline-flex align-items-center">#INVOO6<i
																	className="ti ti-circle-filled fs-4 mx-1 text-primary"></i>HCL
																Corp</span>
														</div>
													</div>
												</td>
												<td>
													<p className="fs-13 mb-1">Payment</p>
													<h6 className="fw-medium">$6458</h6>
												</td>
												<td className="px-0 text-end">
													<span
														className="badge badge-success-transparent badge-xs d-inline-flex align-items-center"><i
															className="ti ti-circle-filled fs-5 me-1"></i>Paid</span>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
								<a href="/invoice" className="btn btn-light btn-md w-100 mt-2">View All</a>
							</div>
						</div>
					</div>
					{/* /Invoices */}

				</div>

				<div className="row">

					{/* Projects */}
					<div className="col-xxl-8 col-xl-7 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Projects</h5>
								<div className="d-flex align-items-center">
									<div className="dropdown mb-2">
										<Link to="#" className="border btn btn-white btn-md d-inline-flex align-items-center" data-bs-toggle="dropdown">
											<i className="ti ti-calendar me-1 fs-14"></i>September
										</Link>
										<ul className="dropdown-menu dropdown-menu-end p-3">
											<li><Link to="#" className="dropdown-item rounded-1">This Month</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">This Week</Link></li>
											<li><Link to="#" className="dropdown-item rounded-1">Today</Link></li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body p-0">
								<div className="table-responsive">
									<table className="table table-nowrap mb-0">
										<thead>
											<tr>
												<th>ID</th>
												<th>Name</th>
												<th>Team</th>
												<th>Hours</th>
												<th>Priority</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-001</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Office
															Management App</a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-02.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-03.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-05.jpg" alt="img" />
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '40%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-002</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Clinic
															Management </a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-06.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-07.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-08.jpg" alt="img" />
														</span>
														<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium"
															href="#" onClick={(e) => e.preventDefault()}>
															+1
														</a>
													</div>
												</td>
												<td>
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '40%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-success d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Low
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-003</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Educational
															Platform</a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-06.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-08.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-09.jpg" alt="img" />
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">40/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '50%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-004</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Chat & Call
															Mobile App</a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-11.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-12.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-13.jpg" alt="img" />
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">35/155 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '50%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-danger d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>High
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-005</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Travel Planning
															Website</a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-17.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-18.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-19.jpg" alt="img" />
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">50/235 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '50%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
											<tr>
												<td><a href="/project-details" className="link-default">PRO-006</a></td>
												<td>
													<h6 className="fw-medium"><a href="/project-details">Service Booking
															Software</a></h6>
												</td>
												<td>
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-06.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-08.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-09.jpg" alt="img" />
														</span>
													</div>
												</td>
												<td>
													<p className="mb-1">40/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '50%'}}></div>
													</div>
												</td>
												<td>
													<span
														className="badge badge-success d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Low
													</span>
												</td>
											</tr>
											<tr>
												<td className="border-0"><a href="/project-details"
														className="link-default">PRO-008</a></td>
												<td className="border-0">
													<h6 className="fw-medium"><a href="/project-details">Travel Planning
															Website</a></h6>
												</td>
												<td className="border-0">
													<div className="avatar-list-stacked avatar-group-sm">
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-15.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-16.jpg" alt="img" />
														</span>
														<span className="avatar avatar-rounded">
															<img className="border border-white"
																src="/assets/img/profiles/avatar-17.jpg" alt="img" />
														</span>
														<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium"
															href="#" onClick={(e) => e.preventDefault()}>
															+2
														</a>
													</div>
												</td>
												<td className="border-0">
													<p className="mb-1">15/255 Hrs</p>
													<div className="progress progress-xs w-100" role="progressbar"
														aria-valuenow="45" aria-valuemin="0" aria-valuemax="100">
														<div className="progress-bar bg-primary" style={{width: '45%'}}></div>
													</div>
												</td>
												<td className="border-0">
													<span
														className="badge badge-pink d-inline-flex align-items-center badge-xs">
														<i className="ti ti-point-filled me-1"></i>Medium
													</span>
												</td>
											</tr>
										</tbody>
									</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_indexpage - 1) * rowsPerPage_indexpage + 1, 11)}-{Math.min(currentPage_indexpage * rowsPerPage_indexpage, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_indexpage === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_indexpage(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_indexpage === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_indexpage(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_indexpage === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_indexpage(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Projects */}

					{/* Tasks Statistics */}
					<div className="col-xxl-4 col-xl-5 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Tasks Statistics</h5>
								<div className="dropdown mb-2">
									<Link to="#" className="btn btn-white btn-sm d-inline-flex align-items-center" data-bs-toggle="dropdown">
										<i className="ti ti-calendar-check me-2"></i>This Week
									</Link>
									<ul className="dropdown-menu dropdown-menu-end p-3">
										<li>
											<Link to="#" className="dropdown-item rounded-1">Today</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">This Week</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">This Month</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body">
								<div className="chartjs-wrapper-demo position-relative mb-4">
									<SemiDonutChart />
									<div className="position-absolute text-center attendance-canvas">
										<p className="fs-13 mb-1">Total Tasks</p>
										<h3>124/165</h3>
									</div>
								</div>
								<div className="d-flex align-items-center flex-wrap">
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-10 me-1 text-warning"></i>Ongoing</p>
										<h5>24%</h5>
									</div>
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-10 me-1 text-info"></i>On Hold </p>
										<h5>10%</h5>
									</div>
									<div className="border-end text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-10 me-1 text-danger"></i>Overdue</p>
										<h5>16%</h5>
									</div>
									<div className="text-center me-2 pe-2 mb-3">
										<p className="fs-13 d-inline-flex align-items-center mb-1"><i
												className="ti ti-circle-filled fs-10 me-1 text-success"></i>Ongoing</p>
										<h5>40%</h5>
									</div>
								</div>
								<div
									className="bg-dark br-5 p-3 pb-0 d-flex align-items-center justify-content-between hrs-card">
									<div className="mb-2">
										<h4 className="text-success">389/689 hrs</h4>
										<p className="fs-13 mb-0">Spent on Overall Tasks This Week</p>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Tasks Statistics */}

				</div>

				<div className="row">

					{/* Schedules */}
					<div className="col-xxl-4 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Schedules</h5>
								<Link to="/candidates" className="btn btn-light btn-md mb-2">View All</Link>
							</div>
							<div className="card-body">
								<div className="bg-light p-3 br-5 mb-4">
									<span className="badge badge-secondary badge-xs mb-1">UI/ UX Designer</span>
									<h6 className="mb-2 text-truncate">Interview Candidates - UI/UX Designer</h6>
									<div className="d-flex align-items-center flex-wrap">
										<p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb
											2025</p>
										<p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>01:00 PM - 02:20
											PM</p>
									</div>
									<div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-49.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-13.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-11.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-22.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-58.jpg"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium"
												href="#" onClick={(e) => e.preventDefault()}>
												+3
											</a>
										</div>
										<a href="#" className="btn btn-white">Join Meeting</a>
									</div>
								</div>
								<div className="bg-light p-3 br-5 mb-0">
									<span className="badge badge-dark badge-xs mb-1">IOS Developer</span>
									<h6 className="mb-2 text-truncate">Interview Candidates - IOS Developer</h6>
									<div className="d-flex align-items-center flex-wrap">
										<p className="fs-13 mb-1 me-2"><i className="ti ti-calendar-event me-2"></i>Thu, 15 Feb
											2025</p>
										<p className="fs-13 mb-1"><i className="ti ti-clock-hour-11 me-2"></i>02:00 PM - 04:20
											PM</p>
									</div>
									<div className="d-flex align-items-center justify-content-between border-top mt-2 pt-3">
										<div className="avatar-list-stacked avatar-group-sm">
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-49.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-13.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-11.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-22.jpg"
													alt="img" />
											</span>
											<span className="avatar avatar-rounded">
												<img className="border border-white" src="/assets/img/users/user-58.jpg"
													alt="img" />
											</span>
											<a className="avatar bg-primary avatar-rounded text-fixed-white fs-10 fw-medium"
												href="#" onClick={(e) => e.preventDefault()}>
												+3
											</a>
										</div>
										<a href="#" className="btn btn-white">Join Meeting</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Schedules */}

					{/* Recent Activities */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Recent Activities</h5>
								<Link to="/activity" className="btn btn-light btn-md mb-2">View All</Link>
							</div>
							<div className="card-body">
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-38.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a
															href="#" onClick={(e) => e.preventDefault()}>Matt Morgan</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Added New Project <span className="text-primary">HRMS
														Dashboard</span></p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-01.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a href="#" onClick={(e) => e.preventDefault()}>Jay
															Ze</a></h6>
													<p className="fs-13">05:00 PM</p>
												</div>
												<p className="fs-13">Commented on Uploaded Document</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-19.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a
															href="#" onClick={(e) => e.preventDefault()}>Mary Donald</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Approved Task Projects</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-11.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a
															href="#" onClick={(e) => e.preventDefault()}>George David</a></h6>
													<p className="fs-13">06:00 PM</p>
												</div>
												<p className="fs-13">Requesting Access to Module Tickets</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-20.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a
															href="#" onClick={(e) => e.preventDefault()}>Aaron Zeen</a></h6>
													<p className="fs-13">06:30 PM</p>
												</div>
												<p className="fs-13">Downloaded App Reportss</p>
											</div>
										</div>
									</div>
								</div>
								<div className="recent-item">
									<div className="d-flex justify-content-between">
										<div className="d-flex align-items-center w-100">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar  flex-shrink-0">
												<img src="/assets/img/users/user-08.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 flex-fill">
												<div className="d-flex align-items-center justify-content-between">
													<h6 className="fs-medium text-truncate"><a
															href="#" onClick={(e) => e.preventDefault()}>Hendry Daniel</a></h6>
													<p className="fs-13">05:30 PM</p>
												</div>
												<p className="fs-13">Completed New Project <span>HMS</span></p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Recent Activities */}

					{/* Birthdays */}
					<div className="col-xxl-4 col-xl-6 d-flex">
						<div className="card flex-fill">
							<div className="card-header pb-2 d-flex align-items-center justify-content-between flex-wrap">
								<h5 className="mb-2">Birthdays</h5>
								<Link to="#" className="btn btn-light btn-md mb-2">View All</Link>
							</div>
							<div className="card-body pb-1">
								<h6 className="mb-2">Today</h6>
								<div className="p-2 border border-dashed rounded mb-3 birthday-card active">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
												<img src="/assets/img/users/user-38.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium "><a href="#">Andrew Jermia </a></h6>
												<p className="fs-13">IOS Developer</p>
											</div>
										</div>
										<a href="#" onClick={(e) => e.preventDefault()}
											className="btn btn-sm btn-white flex-shrink-0 border-0"><i
												className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<h6 className="mb-2">Tomorrow</h6>
								<div className="p-2 border border-dashed rounded mb-3 birthday-card">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
												<img src="/assets/img/users/user-10.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium"><a href="#" onClick={(e) => e.preventDefault()}>Mary Zeen</a></h6>
												<p className="fs-13">UI/UX Designer</p>
											</div>
										</div>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-sm btn-white flex-shrink-0"><i
												className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<div className="p-2 border border-dashed rounded mb-3 birthday-card">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<a href="#" onClick={(e) => e.preventDefault()} className="avatar">
												<img src="/assets/img/users/user-09.jpg" className="rounded-circle"
													alt="img" />
											</a>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium "><a href="#" onClick={(e) => e.preventDefault()}>Antony Lewis</a>
												</h6>
												<p className="fs-13">Android Developer</p>
											</div>
										</div>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-sm btn-white"><i
												className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
								<h6 className="mb-2">25 Jan 2025</h6>
								<div className="p-2 border border-dashed rounded mb-3 birthday-card">
									<div className="d-flex align-items-center justify-content-between">
										<div className="d-flex align-items-center">
											<span className="avatar">
												<img src="/assets/img/users/user-12.jpg" className="rounded-circle"
													alt="img" />
											</span>
											<div className="ms-2 overflow-hidden">
												<h6 className="fs-medium "><a href="#"> Doglas Martini </a></h6>
												<p className="fs-13">.Net Developer</p>
											</div>
										</div>
										<a href="#" onClick={(e) => e.preventDefault()} className="btn btn-sm flex-shrink-0 btn-white"><i
												className="ti ti-cake me-1"></i>Send</a>
									</div>
								</div>
							</div>
						</div>
					</div>
					{/* /Birthdays */}

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

export default IndexPage;
