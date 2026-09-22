import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';import PageHeader from '../components/common/PageHeader';


const PayslipReport = () => {
  // Pagination state for payslipreport
  const [currentPage_payslipreport, setCurrentPage_payslipreport] = useState(1);
  const [rowsPerPage_payslipreport, setRowsPerPage_payslipreport] = useState(10);
  const [searchQuery_payslipreport, setSearchQuery_payslipreport] = useState('');

  const payrollChartOptions = {
    series: [{
      name: 'Payroll',
      data: [20, 20, 30, 45, 55, 45, 20, 70, 25, 30, 10, 30]
    }],
    chart: {
      type: 'line',
      height: 250,
      toolbar: { show: false }
    },
    colors: ['#F26522'],
    stroke: {
      curve: 'stepline',
      width: 3
    },
    dataLabels: { enabled: false },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    legend: { show: false },
  };
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Payslip Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Payslip Report', active: true }
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
					<div className="col-xl-6 d-flex">
						<div className="row flex-fill">
							<div className="col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between bg-light border rounded p-2 mb-2">
											<div className="">
												<span className="fs-14 fw-normal text-truncate mb-1">Total Payroll</span>
												<h5>$250,000</h5>
											</div>
											<a href="#"
												className="avatar avatar-md avatar-rounded bg-transparent-primary border border-primary">
												<span className="text-primary"><i className="ti ti-brand-shopee"></i></span>
											</a>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+20.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between bg-light border rounded p-2 mb-2">
											<div className="">
												<span className="fs-14 fw-normal text-truncate mb-1">Deductions</span>
												<h5>$50,000</h5>
											</div>
											<a href="#"
												className="avatar avatar-md avatar-rounded bg-transparent-danger border border-danger">
												<span className="text-danger"><i className="ti ti-brand-shopee"></i></span>
											</a>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+17.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between bg-light border rounded p-2 mb-2">
											<div className="">
												<span className="fs-14 fw-normal text-truncate mb-1">Net Pay</span>
												<h5>$200,000</h5>
											</div>
											<a href="#"
												className="avatar avatar-md avatar-rounded bg-transparent-success border border-success">
												<span className="text-success"><i className="ti ti-brand-shopee"></i></span>
											</a>
										</div>
										<p className="fs-12 fw-normal d-flex align-items-center text-truncate">
											<span className="text-success fs-12 d-flex align-items-center me-1">
												<i className="ti ti-arrow-wave-right-up me-1"></i>+10.01%
											</span> from last week
										</p>
									</div>
								</div>
							</div>
							<div className="col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body">
										<div
											className="d-flex align-items-center justify-content-between bg-light border rounded p-2 mb-2">
											<div className="">
												<span className="fs-14 fw-normal text-truncate mb-1">Allowances</span>
												<h5>$30,000</h5>
											</div>
											<a href="#"
												className="avatar avatar-md avatar-rounded bg-transparent-skyblue border border-skyblue">
												<span className="text-skyblue"><i className="ti ti-brand-shopee"></i></span>
											</a>
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
					{/* /Total Exponses */}

			


				</div>

				<div className="row">
					<div className="col-xl-12 d-flex">
						<div className="card flex-fill">
							<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
								<h5><i className="ti ti-chart-bar me-2 text-danger"></i>Payroll</h5>
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
								<ReactApexChart options={payrollChartOptions} series={payrollChartOptions.series} type="line" height={250} />
							</div>
						</div>
					</div>
				</div>

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Payslip List</h5>
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
									$0.00 - $00
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">$3800</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$4500</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$3400</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Payment Type
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Cash</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Cheque</Link>
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
											value={rowsPerPage_payslipreport}
											onChange={(e) => { setRowsPerPage_payslipreport(Number(e.target.value)); setCurrentPage_payslipreport(1); }}
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
											value={searchQuery_payslipreport}
											onChange={(e) => { setSearchQuery_payslipreport(e.target.value); setCurrentPage_payslipreport(1); }}
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
										<th>Paid Amount</th>
										<th>Paid Month</th>
										<th>Paid Year</th>
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
										<td>$3000</td>
										<td>$3000</td>
										<td>
											$3000
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$2500</td>
										<td>$2500</td>
										<td>
											$2500
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$2800</td>
										<td>$2800</td>
										<td>
											$2800
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$3300</td>
										<td>$3300</td>
										<td>
											$3300
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$3600</td>
										<td>$3600</td>
										<td>
											$3600
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$2000</td>
										<td>$2000</td>
										<td>
											$2000
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$3400</td>
										<td>$3400</td>
										<td>
											$3400
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$4000</td>
										<td>$4000</td>
										<td>
											$4000
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
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
										<td>$4500</td>
										<td>$4500</td>
										<td>
											$4500
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_payslipreport - 1) * rowsPerPage_payslipreport + 1, 11)}-{Math.min(currentPage_payslipreport * rowsPerPage_payslipreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_payslipreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_payslipreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_payslipreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_payslipreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_payslipreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_payslipreport(p => Math.min(p + 1, 2))}>
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

export default PayslipReport;
