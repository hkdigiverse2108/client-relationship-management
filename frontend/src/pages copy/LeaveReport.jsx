import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const LeaveReport = () => {
  // Pagination state for leavereport
  const [currentPage_leavereport, setCurrentPage_leavereport] = useState(1);
  const [rowsPerPage_leavereport, setRowsPerPage_leavereport] = useState(10);
  const [searchQuery_leavereport, setSearchQuery_leavereport] = useState('');

  const leaveChartOptions = {
    series: [{
      name: 'Annual',
      data: [30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30]
    }, {
      name: 'Casual',
      data: [20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    }, {
      name: 'Medical',
      data: [15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15, 15]
    }, {
      name: 'Others',
      data: [25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25, 25]
    }],
    chart: {
      type: 'bar',
      height: 250,
      stacked: true,
      toolbar: { show: false }
    },
    colors: ['#03C95A', '#FFC107', '#1A1D21', '#F26522'],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
      },
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: { show: false },
    fill: { opacity: 1 }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leave Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Leave Report', active: true }
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
										<div
											className="d-flex align-items-center justify-content-between mb-2 overflow-hidden">
											<div>
												<p className="fs-12 fw-normal mb-1 text-truncate">Total Leaves</p>
												<h4>15</h4>
											</div>
											<div className="leave-report-icon">
												<a href="#"><span
														className="p-2 border border-primary bg-transparent-primary rounded-circle d-flex align-items-center justify-content-center"><i
															className="ti ti-calendar-x text-primary"></i></span></a>
											</div>
										</div>
										<div className="p-2 bg-gray-100 br-5">
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-12 fw-normal mb-0">Last Month</p>
												<span className="fs-12 fw-normal text-success d-flex align-items-center"><i
														className="ti ti-arrow-wave-right-up text-success me-1"></i>+17.02%</span>
											</div>
										</div>
									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Total Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between mb-2 overflow-hidden">
											<div>
												<p className="fs-12 fw-normal mb-1 text-truncate">Approved Leaves</p>
												<h4>15</h4>
											</div>
											<div className="leave-report-icon">
												<a href="#"><span
														className="p-2 border border-success bg-transparent-success rounded-circle d-flex align-items-center justify-content-center"><i
															className="ti ti-calendar-x text-success"></i></span></a>
											</div>
										</div>
										<div className="p-2 bg-gray-100 br-5">
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-12 fw-normal mb-0">Last Month</p>
												<span className="fs-12 fw-normal text-success d-flex align-items-center"><i
														className="ti ti-arrow-wave-right-up text-success me-1"></i>+17.02%</span>
											</div>
										</div>

									</div>
								</div>
							</div>
							{/* /Total Companies */}

							{/* Inactive Companies */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between mb-2 overflow-hidden">
											<div>
												<p className="fs-12 fw-normal mb-1 text-truncate">Pending Requests</p>
												<h4>5</h4>
											</div>
											<div className="leave-report-icon">
												<a href="#"><span
														className="p-2 border border-skyblue bg-transparent-skyblue rounded-circle d-flex align-items-center justify-content-center"><i
															className="ti ti-calendar-x text-skyblue"></i></span></a>
											</div>
										</div>
										<div className="p-2 bg-gray-100 br-5">
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-12 fw-normal mb-0">Last Month</p>
												<span className="fs-12 fw-normal text-success d-flex align-items-center"><i
														className="ti ti-arrow-wave-right-up text-success me-1"></i>+17.02%</span>
											</div>
										</div>

									</div>
								</div>
							</div>
							{/* /Inactive Companies */}

							{/* Company Location */}
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between mb-2 overflow-hidden">
											<div>
												<p className="fs-12 fw-normal mb-1 text-truncate">Rejected Leaves</p>
												<h4>5</h4>
											</div>
											<div className="leave-report-icon">
												<a href="#"><span
														className="p-2 border border-danger bg-transparent-danger rounded-circle d-flex align-items-center justify-content-center"><i
															className="ti ti-calendar-x text-danger"></i></span></a>
											</div>
										</div>
										<div className="p-2 bg-gray-100 br-5">
											<div className="d-flex align-items-center justify-content-between">
												<p className="fs-12 fw-normal mb-0">Last Month</p>
												<span className="fs-12 fw-normal text-success d-flex align-items-center"><i
														className="ti ti-arrow-wave-right-up text-success me-1"></i>+17.02%</span>
											</div>
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
								<h5><i className="ti ti-chart-bar me-2 text-danger"></i>Leaves</h5>
								<div className="d-flex align-items-center">
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-success me-1"></i>Annual
									</span>
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-warning me-1"></i>Casual
									</span>
									<span className="me-3 d-flex align-items-center">
										<i className="ti ti-square-filled text-dark me-1"></i>Medical
									</span>
									<span className="d-flex align-items-center">
										<i className="ti ti-square-filled text-orange me-1" style={{color: '#F26522'}}></i>Others
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
								<ReactApexChart options={leaveChartOptions} series={leaveChartOptions.series} type="bar" height={250} />
							</div>
						</div>
					</div>
				</div>
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Invoice List</h5>
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
									$0.00 - $0.00
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">$3000</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$2500</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$2800</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Paid</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Sent</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Partially Paid</Link>
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
											value={rowsPerPage_leavereport}
											onChange={(e) => { setRowsPerPage_leavereport(Number(e.target.value)); setCurrentPage_leavereport(1); }}
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
											value={searchQuery_leavereport}
											onChange={(e) => { setSearchQuery_leavereport(e.target.value); setCurrentPage_leavereport(1); }}
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
										<th>Invoice ID</th>
										<th>Client Name</th>
										<th>Company Name</th>
										<th>Created Date</th>
										<th>Due Date</th>
										<th>Amount</th>
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
										<td><a href="/invoice-details" className="link-default">Inv-001</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-01.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Michael Walker</a></p>
													<span className="fs-12">CEO</span>
												</div>
											</div>
										</td>
										<td>BrightWave Innovations</td>
										<td>14 Jan 2024</td>
										<td>15 Jan 2024</td>
										<td>$3000</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-002</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-02.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Sophie Headrick</a></p>
													<span className="fs-12">Manager</span>
												</div>
											</div>
										</td>
										<td>Stellar Dynamics</td>
										<td>21 Jan 2024</td>
										<td>25 Jan 2024</td>
										<td>$2500</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Sent
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-003</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-03.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Cameron Drake</a></p>
													<span className="fs-12">Director</span>
												</div>
											</div>
										</td>
										<td>Quantum Nexus</td>
										<td>20 Feb 2024</td>
										<td>22 Feb 2024</td>
										<td>$2800</td>
										<td>
											<span
												className="badge badge-soft-warning d-inline-flex align-items-center badge-xs">
												Partially Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-004</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-04.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Doris Crowley</a></p>
													<span className="fs-12">Consultant</span>
												</div>
											</div>
										</td>
										<td>EcoVision Enterprises</td>
										<td>15 Mar 2024</td>
										<td>17 Mar 2024</td>
										<td>$3300</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Sent
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-005</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-05.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Thomas Bordelon</a></p>
													<span className="fs-12">Manager</span>
												</div>
											</div>
										</td>
										<td>Aurora Technologies</td>
										<td>12 Apr 2024</td>
										<td>16 Apr 2024</td>
										<td>$3600</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-006</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-06.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Kathleen Gutierrez</a></p>
													<span className="fs-12">Director</span>
												</div>
											</div>
										</td>
										<td>BlueSky Ventures</td>
										<td>20 Apr 2024</td>
										<td>21 Apr 2024</td>
										<td>$2000</td>
										<td>
											<span
												className="badge badge-soft-warning d-inline-flex align-items-center badge-xs">
												Partially Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-007</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-07.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Bruce Wright</a></p>
													<span className="fs-12">CEO</span>
												</div>
											</div>
										</td>
										<td>TerraFusion Energy</td>
										<td>06 Jul 2024</td>
										<td>06 Jul 2024</td>
										<td>$3400</td>
										<td>
											<span
												className="badge badge-soft-purple d-inline-flex align-items-center badge-xs">
												Sent
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-008</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-08.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Estelle Morgan</a></p>
													<span className="fs-12">Manager</span>
												</div>
											</div>
										</td>
										<td>UrbanPulse Design</td>
										<td>02 Sep 2024</td>
										<td>04 Sep 2024</td>
										<td>$4000</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-009</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Stephen Dias</a></p>
													<span className="fs-12">CEO</span>
												</div>
											</div>
										</td>
										<td>Nimbus Networks</td>
										<td>15 Nov 2024</td>
										<td>15 Nov 2024</td>
										<td>$4500</td>
										<td>
											<span
												className="badge badge-soft-warning d-inline-flex align-items-center badge-xs">
												Partially Paid
											</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td><a href="/invoice-details" className="link-default">Inv-010</a></td>
										<td>
											<div className="d-flex align-items-center">
												<a href="#" className="avatar avatar-md" data-bs-toggle="modal"
													data-bs-target="#view_details"><img
														src="/assets/img/reports/user-10.jpg"
														className="img-fluid rounded-circle" alt="img" /></a>
												<div className="ms-2">
													<p className="text-dark mb-0"><a href="#" data-bs-toggle="modal"
															data-bs-target="#view_details">Angela Thomas</a></p>
													<span className="fs-12">Consultant</span>
												</div>
											</div>
										</td>
										<td>Epicurean Delights</td>
										<td>10 Dec 2024</td>
										<td>11 Dec 2024</td>
										<td>$3800</td>
										<td>
											<span
												className="badge badge-soft-success d-inline-flex align-items-center badge-xs">
												Paid
											</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_leavereport - 1) * rowsPerPage_leavereport + 1, 11)}-{Math.min(currentPage_leavereport * rowsPerPage_leavereport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_leavereport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leavereport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_leavereport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_leavereport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_leavereport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leavereport(p => Math.min(p + 1, 2))}>
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

export default LeaveReport;
