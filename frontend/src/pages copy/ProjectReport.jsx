import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const ProjectReport = () => {
  // Pagination state for projectreport
  const [currentPage_projectreport, setCurrentPage_projectreport] = useState(1);
  const [rowsPerPage_projectreport, setRowsPerPage_projectreport] = useState(10);
  const [searchQuery_projectreport, setSearchQuery_projectreport] = useState('');

  const projectReportOptions = {
    series: [30, 10, 20, 40],
    chart: {
      type: 'pie',
      height: 200,
    },
    colors: ['#03C9D7', '#8E24AA', '#FFC107', '#28C76F'],
    dataLabels: {
      enabled: false
    },
    legend: {
      show: false
    },
    stroke: {
      show: true,
      colors: 'transparent'
    }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Project Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Project Report', active: true }
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

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="row flex-fill">
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate mb-1">Total Projects</span>
												<h5>300</h5>
											</div>
											<div className="progress" role="progressbar" aria-label="Basic example"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style={{width: '100%', height: '5px'}}>
												<div className="progress-bar bg-pink" style={{width: '70%'}}></div>
											</div>
										</div>
										<div className="d-flex mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+10.54%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate mb-1">Completed
													Projects</span>
												<h5>250</h5>
											</div>
											<div className="progress" role="progressbar" aria-label="Basic example"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style={{width: '100%', height: '5px'}}>
												<div className="progress-bar bg-success" style={{width: '80%'}}></div>
											</div>
										</div>
										<div className="d-flex mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+12.84%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate mb-1">Pending Projects</span>
												<h5>50</h5>
											</div>
											<div className="progress" role="progressbar" aria-label="Basic example"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style={{width: '100%', height: '5px'}}>
												<div className="progress-bar bg-danger" style={{width: '20%'}}></div>
											</div>
										</div>
										<div className="d-flex mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-danger fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>-10.75%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div>
											<div className="mb-2">
												<span className="fs-14 fw-normal text-truncate mb-1">New Projects</span>
												<h5>30</h5>
											</div>
											<div className="progress" role="progressbar" aria-label="Basic example"
												aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
												style={{width: '100%', height: '5px'}}>
												<div className="progress-bar bg-purple" style={{width: '60%'}}></div>
											</div>
										</div>
										<div className="d-flex mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+15.74%</span>from
												last month</p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-lg-6 col-md-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header border-0">
								<div className="d-flex flex-wrap justify-content-between align-items-center">
									<div className="d-flex align-items-center ">
										<span className="me-2"><i className="ti ti-chart-pie text-danger"></i></span>
										<h5>Projects By Tasks</h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											Office Management App
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-2">
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-001</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-002</Link>
											</li>
											<li>
												<Link to="#"
													className="dropdown-item rounded-1">PRO-004</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body pt-0">
								<div className="row align-items-center">
									<div className="col-md-6 d-flex justify-content-center">
										<ReactApexChart options={projectReportOptions} series={projectReportOptions.series} type="pie" height={250} />
									</div>
									<div className="col-md-6">
										<div className="row gy-4">
											<div className="col-md-6">
												<p className="fs-16 project-report-badge-blue fw-normal mb-0 text-gray-5">
													Pending </p>
												<p className="fs-20 fw-bold text-dark ">30%</p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-purple mb-0  fw-normal text-gray-5">
													On Hold</p>
												<p className="fs-20 fw-bold text-dark ">10%</p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-warning  mb-0 fw-normal text-gray-5">
													Inprogress </p>
												<p className="fs-20 fw-bold text-dark ">20%</p>
											</div>
											<div className="col-md-6">
												<p
													className="fs-16 project-report-badge-success  mb-0 fw-normal text-gray-5">
													Completed</p>
												<p className="fs-20 fw-bold text-dark ">40%</p>
											</div>
										</div>
									</div>
								</div>


							</div>
						</div>
					</div>
					{/* /Total Exponses */}


				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Project List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon-end position-relative">
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
									<span className="input-icon-addon">
										<i className="ti ti-chevron-down"></i>
									</span>
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Priority
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Low</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Medium</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">High</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Active</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
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
											value={rowsPerPage_projectreport}
											onChange={(e) => { setRowsPerPage_projectreport(Number(e.target.value)); setCurrentPage_projectreport(1); }}
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
											value={searchQuery_projectreport}
											onChange={(e) => { setSearchQuery_projectreport(e.target.value); setCurrentPage_projectreport(1); }}
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
										<th>Project ID</th>
										<th>Project Name</th>
										<th>Leader</th>
										<th>Team</th>
										<th>Deadline</th>
										<th>Priority</th>
										<th>Status</th>
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
											PRO-001
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Office Management App</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Anthony Lewis</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-09.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-47.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-44.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+2
												</span>
											</div>
										</td>
										<td>
											12 Sep 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-002
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Clinic Management </a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Brian Villalobos</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-17.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-08.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-18.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+3
												</span>
											</div>
										</td>
										<td>
											24 Oct 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-003
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#">Educational Platform</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Harvey Smith</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-21.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-22.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-33.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+1
												</span>
											</div>
										</td>
										<td>
											18 Feb 2024
										</td>
										<td>
											<span className="badge badge-danger-transparent"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-004
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Chat & Call Mobile App</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Stephan Peralt</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-16.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-26.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-35.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+3
												</span>
											</div>
										</td>
										<td>
											17 Oct 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-005
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Travel Planning Website</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Doglas Martini</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-16.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-36.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-10.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+4
												</span>
											</div>
										</td>
										<td>
											20 Jul 2024
										</td>
										<td>
											<span className="badge badge-danger-transparent"><i
													className="ti ti-point-filled me-1"></i>High</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-006
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Service Booking Software</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-02.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Linda Ray</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-11.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-19.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-20.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+5
												</span>
											</div>
										</td>
										<td>
											10 Apr 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-007
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Hotel Booking App</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-22.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Elliot Murray</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-14.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-29.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-22.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+4
												</span>
											</div>
										</td>
										<td>
											29 Aug 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-008
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Car & Bike Rental Software</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-36.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Rebecca Smtih</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-08.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-38.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-42.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+2
												</span>
											</div>
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-009
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> Food Order App</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-37.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Connie Waters</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-26.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-02.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-40.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+1
												</span>
											</div>
										</td>
										<td>
											03 Nov 2024
										</td>
										<td>
											<span className="badge badge-warning-transparent"><i
													className="ti ti-point-filled me-1"></i>Medium</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											PRO-010
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<h6 className="fw-medium"><a href="#"> POS Admin Software</a></h6>
											</div>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-38.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5">Lori Broaddus</h6>
												</div>
											</div>
										</td>
										<td>
											<div className="avatar-list-stacked avatar-group-sm">
												<span className="avatar border-0">
													<img src="/assets/img/users/user-13.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-11.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span className="avatar border-0">
													<img src="/assets/img/users/user-18.jpg" className="rounded-circle"
														alt="img" />
												</span>
												<span
													className="avatar group-counts bg-primary rounded-circle border-0 fs-10">
													+3
												</span>
											</div>
										</td>
										<td>
											17 Dec 2024
										</td>
										<td>
											<span className="badge badge-success-transparent"><i
													className="ti ti-point-filled me-1"></i>Low</span>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_projectreport - 1) * rowsPerPage_projectreport + 1, 11)}-{Math.min(currentPage_projectreport * rowsPerPage_projectreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_projectreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_projectreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_projectreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_projectreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_projectreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_projectreport(p => Math.min(p + 1, 2))}>
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

export default ProjectReport;
