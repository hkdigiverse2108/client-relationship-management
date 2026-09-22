import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactApexChart from 'react-apexcharts';
import PageHeader from '../components/common/PageHeader';

const PaymentReport = () => {
  // Pagination state for paymentreport
  const [currentPage_paymentreport, setCurrentPage_paymentreport] = useState(1);
  const [rowsPerPage_paymentreport, setRowsPerPage_paymentreport] = useState(10);
  const [searchQuery_paymentreport, setSearchQuery_paymentreport] = useState('');

  const paymentReportOptions = {
    series: [44, 55, 41, 17],
    chart: {
      type: 'donut',
      height: 250,
    },
    colors: ['#03C9D7', '#E91E63', '#8E24AA', '#FFC107'],
    plotOptions: {
      pie: {
        donut: {
          size: '70%',
          labels: {
            show: false
          }
        }
      }
    },
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
					title="Payment Report"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Reports' },
						{ label: 'Payment Report', active: true }
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
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div
											className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2">
											<div className="d-flex align-items-center flex-column overflow-hidden">
												<div>
													<div>
														<span className="fs-14 fw-normal text-truncate mb-1">Total
															Payments</span>
														<h5>$45,221,45</h5>
													</div>
												</div>
											</div>
											<div className="d-flex justify-content-between align-items-center flex-wrap">
												<a href="#"
													className="avatar avatar-md br-5 payment-report-icon  bg-transparent-primary border border-primary">
													<span className="text-primary"><i
															className="ti ti-currency-dollar"></i></span>
												</a>

											</div>
										</div>
										<div className="d-flex justify-content-center mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span>from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div
											className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2">
											<div className="d-flex align-items-center flex-column overflow-hidden">
												<div>
													<div>
														<span className="fs-14 fw-normal text-truncate mb-1">Pending
															Payments</span>
														<h5>$45,221,45</h5>
													</div>
												</div>
											</div>
											<div className="d-flex justify-content-between align-items-center flex-wrap">
												<a href="#"
													className="avatar avatar-md br-5 payment-report-icon  bg-transparent-skyblue border border-skyblue">
													<span className="text-skyblue"><i
															className="ti ti-currency-dollar"></i></span>
												</a>

											</div>
										</div>
										<div className="d-flex justify-content-center mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span> from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div
											className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2">
											<div className="d-flex align-items-center flex-column overflow-hidden">
												<div>
													<div>
														<span className="fs-14 fw-normal text-truncate mb-1">Failed
															Payments</span>
														<h5>$10,470</h5>
													</div>
												</div>
											</div>
											<div className="d-flex justify-content-between align-items-center flex-wrap">
												<a href="#"
													className="avatar avatar-md br-5 payment-report-icon  bg-transparent-danger border border-danger">
													<span className="text-danger"><i
															className="ti ti-currency-dollar"></i></span>
												</a>

											</div>
										</div>
										<div className="d-flex justify-content-center mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-danger fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span> from
												last week</p>
										</div>
									</div>
								</div>
							</div>
							<div className="col-lg-6 col-md-6 d-flex">
								<div className="card flex-fill">
									<div className="card-body ">
										<div
											className="d-flex flex-wrap align-items-center justify-content-between border-bottom pb-2">
											<div className="d-flex align-items-center flex-column overflow-hidden">
												<div>
													<div>
														<span className="fs-14 fw-normal text-truncate mb-1">Payment Success
															Rate</span>
														<h5>90%</h5>
													</div>
												</div>
											</div>
											<div className="d-flex justify-content-between align-items-center flex-wrap">
												<a href="#"
													className="avatar avatar-md br-5 payment-report-icon  bg-pink-transparent border border-pink">
													<span className="text-pink"><i className="ti ti-currency-dollar"></i></span>
												</a>

											</div>
										</div>
										<div className="d-flex justify-content-center mt-2">
											<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
													className="text-success fs-12 d-flex align-items-center me-1"><i
														className="ti ti-arrow-wave-right-up me-1"></i>+20.01%</span> from
												last week</p>
										</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					{/* /Total Exponses */}

					{/* Total Exponses */}
					<div className="col-xl-6 d-flex">
						<div className="card flex-fill">
							
							<div className="card-header border-0">
								<div className="d-flex flex-wrap row-gap-2 justify-content-between align-items-center">
									<div className="d-flex align-items-center ">
										<span className="me-2"><i className="ti ti-chart-donut text-danger"></i></span>
										<h5>Payments By Payment Methods </h5>
									</div>
									<div className="dropdown">
										<Link to="#"
											className="dropdown-toggle btn btn-sm fs-12 btn-white d-inline-flex align-items-center"
											data-bs-toggle="dropdown">
											This Year
										</Link>
										<ul className="dropdown-menu  dropdown-menu-end p-2">
											<li>
												<Link to="#" className="dropdown-item rounded-1">2024</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">2023</Link>
											</li>
											<li>
												<Link to="#" className="dropdown-item rounded-1">2022</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="card-body d-flex align-items-center justify-content-between pt-0">
								<div className="row align-items-center w-100">
									<div className="col-md-6">
										<div className="position-relative payment-total">
											<ReactApexChart options={paymentReportOptions} series={paymentReportOptions.series} type="donut" height={250} />
											<div className="payment-total-content ">
												<span className="display-3 fs-24 fw-bold text-skyblue">+14%</span>
												<p className="fs-16 fw-normal">vs last year</p>
											</div>
										</div>
									</div>
									<div className="col-md-6">
										<div className="row gy-4">
											<div className="col-md-6">
												<h6 className="fs-16 text-gray-5 fw-normal side-badge mb-1">Paypal</h6>
												<h5 className="fs-20 fw-bold">$54,071 </h5>
											</div>
											<div className="col-md-6">
												<h6 className="fs-16 text-gray-5 fw-normal side-badge-pink mb-1"> Debit Card
												</h6>
												<h5 className="fs-20 fw-bold">$54,071 </h5>
											</div>
											<div className="col-md-6">
												<h6 className="fs-16 text-gray-5 fw-normal side-badge-purple mb-1"> Bank
													Transfer</h6>
												<h5 className="fs-20 fw-bold">$32,210 </h5>
											</div>
											<div className="col-md-6">
												<h6 className="fs-16 text-gray-5 fw-normal side-badge-warning mb-1"> Credit
													Card</h6>
												<h5 className="fs-20 fw-bold">$32,210 </h5>
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
											value={rowsPerPage_paymentreport}
											onChange={(e) => { setRowsPerPage_paymentreport(Number(e.target.value)); setCurrentPage_paymentreport(1); }}
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
											value={searchQuery_paymentreport}
											onChange={(e) => { setSearchQuery_paymentreport(e.target.value); setCurrentPage_paymentreport(1); }}
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
										<th>Payment Type</th>
										<th>Paid Date</th>
										<th>Paid Amount</th>
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
											<a href="/invoice-details" className="link-default">Inv-001</a>
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
											Paypal
										</td>
										<td>
											15 Jan 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-002</a>
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
											Paypal
										</td>
										<td>
											25 Jan 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-003</a>
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
											Paypal
										</td>
										<td>
											22 Feb 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-004</a>
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
											Paypal
										</td>
										<td>
											15 Mar 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-005</a>
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
											Paypal
										</td>
										<td>
											16 Apr 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-006</a>
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
											Paypal
										</td>
										<td>
											21 Apr 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-007</a>
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
											Paypal
										</td>
										<td>
											06 Jul 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-008</a>
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
											Paypal
										</td>
										<td>
											04 Sep 2024
										</td>
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
											<a href="/invoice-details" className="link-default">Inv-009</a>
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
											Paypal
										</td>
										<td>
											15 Nov 2024
										</td>
										<td>
											$4500
										</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<a href="/invoice-details" className="link-default">Inv-010</a>
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
											Paypal
										</td>
										<td>
											11 Dec 2024
										</td>
										<td>
											$3800
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_paymentreport - 1) * rowsPerPage_paymentreport + 1, 11)}-{Math.min(currentPage_paymentreport * rowsPerPage_paymentreport, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_paymentreport === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_paymentreport(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_paymentreport === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_paymentreport(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_paymentreport === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_paymentreport(p => Math.min(p + 1, 2))}>
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

export default PaymentReport;
