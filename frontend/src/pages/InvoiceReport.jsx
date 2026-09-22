import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import PageHeader from '../components/common/PageHeader';

const InvoiceReport = () => {
  // Pagination state for invoicereport
  const [currentPage_invoicereport, setCurrentPage_invoicereport] = useState(1);
  const [rowsPerPage_invoicereport, setRowsPerPage_invoicereport] = useState(10);
  const [searchQuery_invoicereport, setSearchQuery_invoicereport] = useState('');

  const invoiceReportOptions = {
    series: [
      {
        name: 'Total Invoices',
        data: [40, 20, 40, 20, 40, 20],
      },
      {
        name: 'Paid Invoices',
        data: [20, 10, 20, 10, 20, 10],
      }
    ],
    chart: {
      height: 250,
      type: 'area',
      toolbar: { show: false },
    },
    colors: ['#E91E63', '#F2711C'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    dataLabels: { enabled: false },
    stroke: { curve: 'straight', width: 2 },
    xaxis: {
      categories: ['January', 'February', 'March', 'April', 'May', 'June']
    },
    yaxis: {
      labels: { formatter: (val) => val + 'k' }
    },
    legend: { position: 'bottom' }
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoice Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Invoice Report', active: true }
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
					<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Total
														Invoice</span>
													<h5>600</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>

										</div>

									</div>
								</div>
							</div>
							<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge-warning">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Partially
														Paid</span>
													<h5>80</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge-success">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Paid
														Invoices</span>
													<h5>450</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge-purple">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Overdue
														Invoices</span>
													<h5>40</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge-danger">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Unpaid
														Invoices</span>
													<h5>150</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>
										</div>
									</div>
								</div>
							</div>
							<div className="col-xl-4 col-md-6 d-flex">
								<div className="card invoice-report  flex-fill">
									<span className="invoice-report-badge-skyblue">
									</span>
									<div className="card-body d-flex flex-wrap align-items-center justify-content-between">
										<div className="d-flex align-items-center flex-column overflow-hidden">
											<div>
												<div>
													<span className="fs-14 fw-normal text-truncate mb-1">Revenue</span>
													<h5>$25,340</h5>
												</div>
											</div>
										</div>
										<div className="d-flex justify-content-between align-items-center flex-wrap">
											<span className="badge badge-sm badge-success me-3">+19.01%</span>
											<a href="#"
												className="avatar avatar-md br-10  bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-file-invoice"></i></span>
											</a>
										</div>
									</div>
								</div>
							</div>
				</div>
				<div className="row">
					<div className="col-xl-12 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5><i className="ti ti-brand-shopee me-2 text-primary"></i>Expense</h5>
								<div className="dropdown">
									<Link to="#"
										className="btn btn-white border btn-md d-inline-flex align-items-center"
										data-bs-toggle="dropdown">
										This Year
									</Link>
									<ul className="dropdown-menu  dropdown-menu-end p-3">
										<li>
											<Link to="#" className="dropdown-item rounded-1">This Year</Link>
										</li>
										<li>
											<Link to="#" className="dropdown-item rounded-1">Last Year</Link>
										</li>
									</ul>
								</div>
							</div>
							<div className="card-body py-0">
								<ReactApexChart options={invoiceReportOptions} series={invoiceReportOptions.series} type="area" height={250} />
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
											value={rowsPerPage_invoicereport}
											onChange={(e) => { setRowsPerPage_invoicereport(Number(e.target.value)); setCurrentPage_invoicereport(1); }}
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
											value={searchQuery_invoicereport}
											onChange={(e) => { setSearchQuery_invoicereport(e.target.value); setCurrentPage_invoicereport(1); }}
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
										<td>
											Inv-001
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
													<span className="fs-12 fw-normal">CEO</span>
												</div>
											</div>
										</td>
										<td>BrightWave Innovations</td>
										<td>
											14 Jan 2024
										</td>
										<td>
											15 Jan 2024
										</td>
										<td>
											$3000
										</td>
										<td>
											<span className="badge badge-success-transparent">Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-002
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-40.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick</a></h6>
													<span className="fs-12 fw-normal">Manager</span>
												</div>
											</div>
										</td>
										<td>Stellar Dynamics</td>
										<td>
											21 Jan 2024
										</td>
										<td>
											25 Jan 2024
										</td>
										<td>
											$2500
										</td>
										<td>
											<span className="badge badge-purple-transparent">Sent</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-003
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-41.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake</a></h6>
													<span className="fs-12 fw-normal">Director</span>
												</div>
											</div>
										</td>
										<td>Quantum Nexus</td>
										<td>
											20 Feb 2024
										</td>
										<td>
											22 Feb 2024
										</td>
										<td>
											$2800
										</td>
										<td>
											<span className="badge badge-warning-transparent">Partially Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-004
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doris Crowley</a></h6>
													<span className="fs-12 fw-normal">Consultant</span>
												</div>
											</div>
										</td>
										<td>EcoVision Enterprises</td>
										<td>
											15 Mar 2024
										</td>
										<td>
											17 Mar 2024
										</td>
										<td>
											$3300
										</td>
										<td>
											<span className="badge badge-purple-transparent">Sent</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-005
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-43.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
													<span className="fs-12 fw-normal">Manager</span>
												</div>
											</div>
										</td>
										<td>Aurora Technologies</td>
										<td>
											12 Apr 2024
										</td>
										<td>
											16 Apr 2024
										</td>
										<td>
											$3600
										</td>
										<td>
											<span className="badge badge-success-transparent">Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-006
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-44.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Kathleen Gutierrez</a></h6>
													<span className="fs-12 fw-normal">Director</span>
												</div>
											</div>
										</td>
										<td>BlueSky Ventures</td>
										<td>
											20 Apr 2024
										</td>
										<td>
											21 Apr 2024
										</td>
										<td>
											$2000
										</td>
										<td>
											<span className="badge badge-warning-transparent">Partially Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-007
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-45.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Bruce Wright</a></h6>
													<span className="fs-12 fw-normal">CEO</span>
												</div>
											</div>
										</td>
										<td>TerraFusion Energy</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											06 Jul 2024
										</td>
										<td>
											$3400
										</td>
										<td>
											<span className="badge badge-purple-transparent">Sent</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-008
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-46.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Estelle Morgan</a></h6>
													<span className="fs-12 fw-normal">Manager</span>
												</div>
											</div>
										</td>
										<td>UrbanPulse Design</td>
										<td>
											02 Sep 2024
										</td>
										<td>
											04 Sep 2024
										</td>
										<td>
											$4000
										</td>
										<td>
											<span className="badge badge-success-transparent">Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-009
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-47.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephen Dias</a></h6>
													<span className="fs-12 fw-normal">CEO</span>
												</div>
											</div>
										</td>
										<td>Nimbus Networks</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											$4500
										</td>
										<td>
											<span className="badge badge-warning-transparent">Partially Paid</span>
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											Inv-010
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/users/user-48.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Angela Thomas</a></h6>
													<span className="fs-12 fw-normal">Consultant</span>
												</div>
											</div>
										</td>
										<td>Epicurean Delights</td>
										<td>
											10 Dec 2024
										</td>
										<td>
											11 Dec 2024
										</td>
										<td>
											$3800
										</td>
										<td>
											<span className="badge badge-success-transparent">Paid</span>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_invoicereport - 1) * rowsPerPage_invoicereport + 1, 11)}-{Math.min(currentPage_invoicereport * rowsPerPage_invoicereport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_invoicereport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoicereport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_invoicereport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_invoicereport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_invoicereport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoicereport(p => Math.min(p + 1, 2))}>
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

export default InvoiceReport;
