import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const UserReport = () => {
  // Pagination state for userreport
  const [currentPage_userreport, setCurrentPage_userreport] = useState(1);
  const [rowsPerPage_userreport, setRowsPerPage_userreport] = useState(10);
  const [searchQuery_userreport, setSearchQuery_userreport] = useState('');

  const userChartOptions = {
    series: [{
      name: 'Active Users',
      data: [35, 45, 55, 20, 15, 45, 35, 25, 50, 65, 60, 30]
    }, {
      name: 'Inactive Users',
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
					title="User Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'User Report', active: true }
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
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<div className="d-flex align-items-center">
												<div>
													<p className="fs-12 fw-medium mb-1 text-truncate">Total Users</p>
													<h4>800</h4>
												</div>
											</div>
											<div className="leave-report-icon">
												<a href="#">
													<span
														className="p-2 border border-primary bg-transparent-primary rounded-3 d-flex align-items-center justify-content-center">
														<i className="ti ti-user text-primary"></i>
													</span>
												</a>
											</div>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+20.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<div className="d-flex align-items-center">
												<div>
													<p className="fs-12 fw-medium mb-1 text-truncate">Active Users</p>
													<h4>750</h4>
												</div>
											</div>
											<div className="leave-report-icon">
												<a href="#">
													<span
														className="p-2 border border-success bg-transparent-success rounded-3 d-flex align-items-center justify-content-center">
														<i className="ti ti-user-check text-success"></i>
													</span>
												</a>
											</div>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+17.02%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<div className="d-flex align-items-center">
												<div>
													<p className="fs-12 fw-medium mb-1 text-truncate">New Users</p>
													<h4>100</h4>
												</div>
											</div>
											<div className="leave-report-icon">
												<a href="#">
													<span
														className="p-2 border border-skyblue bg-transparent-skyblue rounded-3 d-flex align-items-center justify-content-center">
														<i className="ti ti-user-up text-skyblue"></i>
													</span>
												</a>
											</div>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+10.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div className="d-flex align-items-center justify-content-between mb-2">
											<div className="d-flex align-items-center">
												<div>
													<p className="fs-12 fw-medium mb-1 text-truncate">Inactive Users</p>
													<h4>50</h4>
												</div>
											</div>
											<div className="leave-report-icon">
												<a href="#">
													<span
														className="p-2 border border-danger bg-transparent-danger rounded-3 d-flex align-items-center justify-content-center">
														<i className="ti ti-user-pause text-danger"></i>
													</span>
												</a>
											</div>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-danger fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>-10.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				
				</div>

				<div className="row">
					<div className="col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5><i className="ti ti-chart-bar me-2 text-danger"></i>Users</h5>
								<div className="d-flex align-items-center">
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-success me-1"></i>Active Users
									</span>
									<span className="d-flex align-items-center">
										<i className="ti ti-square-filled text-light me-1"></i>Inactive Users
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
								<ReactApexChart options={userChartOptions} series={userChartOptions.series} type="bar" height={250} />
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Users List</h5>
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
									Role
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Employee</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Client</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Status
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
											value={rowsPerPage_userreport}
											onChange={(e) => { setRowsPerPage_userreport(Number(e.target.value)); setCurrentPage_userreport(1); }}
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
											value={searchQuery_userreport}
											onChange={(e) => { setSearchQuery_userreport(e.target.value); setCurrentPage_userreport(1); }}
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
										<th>Name</th>
										<th>Email</th>
										<th>Created Date</th>
										<th>Role</th>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-32.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Anthony Lewis</a></h6>
												</div>
											</div>
										</td>
										<td>anthony@example.com</td>
										<td>12 Sep 2024</td>
										<td>
											<span
												className="badge badge-pink-transparent d-inline-flex align-items-center badge-xs">
												Employee
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-09.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Brian Villalobos</a></h6>
												</div>
											</div>
										</td>
										<td>brian@example.com</td>
										<td>24 Oct 2024</td>
										<td>
											<span
												className="badge badge-pink-transparent d-inline-flex align-items-center badge-xs">
												Employee
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-40.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick</a></h6>
												</div>
											</div>
										</td>
										<td>sophie@example.com</td>
										<td>18 Feb 2024</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Client
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-33.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephan Peralt</a></h6>
												</div>
											</div>
										</td>
										<td>peral@example.com</td>
										<td>17 Oct 2024</td>
										<td>
											<span
												className="badge badge-pink-transparent d-inline-flex align-items-center badge-xs">
												Employee
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-44.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
												</div>
											</div>
										</td>
										<td>thomas@example.com</td>
										<td>20 Jul 2024</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Client
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-34.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doglas Martini</a></h6>
												</div>
											</div>
										</td>
										<td>martniwr@example.com</td>
										<td>10 Apr 2024</td>
										<td>
											<span
												className="badge badge-pink-transparent d-inline-flex align-items-center badge-xs">
												Employee
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-41.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake</a></h6>
												</div>
											</div>
										</td>
										<td>cameron@example.com</td>
										<td>29 Aug 2024</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Client
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-01.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harvey Smith</a></h6>
												</div>
											</div>
										</td>
										<td>harvey@example.com</td>
										<td>22 Feb 2024</td>
										<td>
											<span
												className="badge badge-pink-transparent d-inline-flex align-items-center badge-xs">
												Employee
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
												</div>
											</div>
										</td>
										<td>michael@example.com</td>
										<td>03 Nov 2024</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Client
											</span>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doris Crowley</a></h6>
												</div>
											</div>
										</td>
										<td>doris@example.com</td>
										<td>17 Dec 2024</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Client
											</span>
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
										Showing {Math.min((currentPage_userreport - 1) * rowsPerPage_userreport + 1, 11)}-{Math.min(currentPage_userreport * rowsPerPage_userreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_userreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_userreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_userreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_userreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_userreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_userreport(p => Math.min(p + 1, 2))}>
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

export default UserReport;
