import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const EmployeeReport = () => {
  // Pagination state for employeereport
  const [currentPage_employeereport, setCurrentPage_employeereport] = useState(1);
  const [rowsPerPage_employeereport, setRowsPerPage_employeereport] = useState(10);
  const [searchQuery_employeereport, setSearchQuery_employeereport] = useState('');

  const employeeChartOptions = {
    series: [{
      name: 'Active Employees',
      data: [35, 45, 55, 20, 15, 45, 35, 25, 50, 65, 60, 30]
    }, {
      name: 'Inactive Employees',
      data: [15, 10, 5, 25, 30, 10, 15, 20, 10, 5, 10, 15]
    }],
    chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      toolbar: {
        show: false
      }
    },
    colors: ['#03C95A', '#E2E8F0'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    legend: {
      show: false
    },
    fill: {
      opacity: 1
    }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Employee Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Employee Report', active: true }
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
										<div className="overflow-hidden d-flex mb-2 align-items-center">
											<span className="me-2"><img
													src="/assets/img/reports-img/employee-report-icon.svg" alt="Img"
													className="img-fluid" /></span>
											<div>
												<p className="fs-14 fw-normal mb-1 text-truncate">Total Employee</p>
												<h5>600</h5>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate "><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Total Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="overflow-hidden d-flex mb-2 align-items-center">
											<span className="me-2"><img
													src="/assets/img/reports-img/employee-report-success.svg" alt="Img"
													className="img-fluid" /></span>
											<div>
												<p className="fs-14 fw-normal mb-1 text-truncate">Active Employee</p>
												<h5>600</h5>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate "><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Inactive Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="overflow-hidden d-flex mb-2 align-items-center">
											<span className="me-2"><img
													src="/assets/img/reports-img/employee-report-info.svg" alt="Img"
													className="img-fluid" /></span>
											<div>
												<p className="fs-14 fw-normal mb-1 text-truncate">New Employee</p>
												<h5>600</h5>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate "><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Inactive Companies */}

							{/* Company Location */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
								
							<div className="card-body">
										<div className="overflow-hidden d-flex mb-2 align-items-center">
											<span className="me-2"><img
													src="/assets/img/reports-img/employee-report-danger.svg" alt="Img"
													className="img-fluid" /></span>
											<div>
												<p className="fs-14 fw-normal mb-1 text-truncate">Inactive Employee</p>
												<h5>600</h5>
											</div>
										</div>
										<div>
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate "><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							{/* /Company Location */}
						</div>
					</div>
					
				</div>

				<div className="row">
					<div className="col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5><i className="ti ti-chart-bar me-2 text-danger"></i>Employee</h5>
								<div className="d-flex align-items-center">
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-success me-1"></i>Active Employees
									</span>
									<span className="d-flex align-items-center">
										<i className="ti ti-square-filled text-light me-1"></i>Inactive Employees
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
								<ReactApexChart options={employeeChartOptions} series={employeeChartOptions.series} type="bar" height={250} />
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Employees List</h5>
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
									Designation
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
											value={rowsPerPage_employeereport}
											onChange={(e) => { setRowsPerPage_employeereport(Number(e.target.value)); setCurrentPage_employeereport(1); }}
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
											value={searchQuery_employeereport}
											onChange={(e) => { setSearchQuery_employeereport(e.target.value); setCurrentPage_employeereport(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Emp ID</th>
										<th>Name</th>
										<th>Email</th>
										<th>Department</th>
										<th>Phone</th>
										<th>Joining Date</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-001</a></td>
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
										<td>anthony@example.com</td>
										<td>Finance</td>
										<td>(123) 4567 890</td>
										<td>12 Sep 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-002</a></td>
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
										<td>brian@example.com</td>
										<td>Application Development</td>
										<td>(179) 7382 829</td>
										<td>24 Oct 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-003</a></td>
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
										<td>harvey@example.com</td>
										<td>IT Management</td>
										<td>(184) 2719 738</td>
										<td>18 Feb 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-004</a></td>
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
										<td>peral@example.com</td>
										<td>Web Development</td>
										<td>(193) 7839 748</td>
										<td>17 Oct 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-005</a></td>
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
										<td>martniwr@example.com</td>
										<td>Sales</td>
										<td>(183) 9302 890</td>
										<td>20 Jul 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-006</a></td>
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
										<td>ray456@example.com</td>
										<td>UI / UX</td>
										<td>(120) 3728 039</td>
										<td>10 Apr 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-007</a></td>
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
										<td>murray@example.com</td>
										<td>Account Management</td>
										<td>(102) 8480 832</td>
										<td>29 Aug 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-008</a></td>
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
										<td>smtih@example.com</td>
										<td>Marketing</td>
										<td>(162) 8920 713</td>
										<td>22 Feb 2024</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-sm">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-009</a></td>
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
										<td>connie@example.com</td>
										<td>Administration</td>
										<td>(189) 0920 723</td>
										<td>03 Nov 2024</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
									</tr>
									<tr>
										<td><a href="/employee-details" className="link-default">Emp-010</a></td>
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
										<td>broaddus@example.com</td>
										<td>Business Development</td>
										<td>(168) 8392 823</td>
										<td>17 Dec 2024</td>
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
										Showing {Math.min((currentPage_employeereport - 1) * rowsPerPage_employeereport + 1, 11)}-{Math.min(currentPage_employeereport * rowsPerPage_employeereport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_employeereport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employeereport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_employeereport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_employeereport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_employeereport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_employeereport(p => Math.min(p + 1, 2))}>
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

export default EmployeeReport;
