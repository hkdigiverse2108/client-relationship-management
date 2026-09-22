import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import PageHeader from '../components/common/PageHeader';

const DailyReport = () => {
  // Pagination state for dailyreport
  const [currentPage_dailyreport, setCurrentPage_dailyreport] = useState(1);
  const [rowsPerPage_dailyreport, setRowsPerPage_dailyreport] = useState(10);
  const [searchQuery_dailyreport, setSearchQuery_dailyreport] = useState('');

  const dailyChartOptions = {
    series: [{
      name: 'Present',
      data: [60, 50, 40, 30, 40, 50, 70, 80]
    }, {
      name: 'Absent',
      data: [20, 50, 60, 50, 60, 60, 70, 80]
    }],
    chart: {
      type: 'line',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#03C95A', '#eb0d0dff'],
    stroke: {
      curve: 'smooth',
      width: 3
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug']
    },
    legend: { show: false },
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Daily Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Daily Report', active: true }
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
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Total Present</p>
										<h4>300</h4>
									</div>
									<div className="leave-report-icon">
										<a href="#"><span className="p-2 border border-primary bg-transparent-primary rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-user-check text-primary"></i></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Completed Tasks</p>
										<h4>100</h4>
									</div>
									<div className="leave-report-icon">
										<a href="#"><span className="p-2 border border-success bg-transparent-success rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-subtask text-success"></i></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Total Absent</p>
										<h4>15</h4>
									</div>
									<div className="leave-report-icon">
										<a href="#"><span className="p-2 border border-danger bg-transparent-danger rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-user-x text-danger"></i></span></a>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6 d-flex">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center justify-content-between">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Pending Tasks</p>
										<h4>125</h4>
									</div>
									<div className="leave-report-icon">
										<a href="#"><span className="p-2 border border-info bg-transparent-info rounded-circle d-flex align-items-center justify-content-center"><i className="ti ti-clock-pause text-info"></i></span></a>
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
								<h5><i className="ti ti-chart-area-line me-2 text-danger"></i>Daily Attendance</h5>
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
								<ReactApexChart options={dailyChartOptions} series={dailyChartOptions.series} type="line" height={250} />
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Daily Attendance List</h5>
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
											value={rowsPerPage_dailyreport}
											onChange={(e) => { setRowsPerPage_dailyreport(Number(e.target.value)); setCurrentPage_dailyreport(1); }}
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
											value={searchQuery_dailyreport}
											onChange={(e) => { setSearchQuery_dailyreport(e.target.value); setCurrentPage_dailyreport(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>
										<th>Name</th>
										<th>Date</th>
										<th>Department</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/users/user-32.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Anthony Lewis</a></p>
													<span className="fs-12">Finance</span>
												</div>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td>Finance</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Application Development</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>IT Management</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Web Development</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Sales</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>UI / UX</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Account Management</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Marketing</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Administration</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Present
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
										<td>Business Development</td>
										<td>
											<span
												className="badge badge-soft-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Absent
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_dailyreport - 1) * rowsPerPage_dailyreport + 1, 11)}-{Math.min(currentPage_dailyreport * rowsPerPage_dailyreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_dailyreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_dailyreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_dailyreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_dailyreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_dailyreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_dailyreport(p => Math.min(p + 1, 2))}>
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

export default DailyReport;
