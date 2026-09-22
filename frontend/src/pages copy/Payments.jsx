import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Payments = () => {
  // Pagination state for payments
  const [currentPage_payments, setCurrentPage_payments] = useState(1);
  const [rowsPerPage_payments, setRowsPerPage_payments] = useState(10);
  const [searchQuery_payments, setSearchQuery_payments] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Payments"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Sales' },
						{ label: 'Payments', active: true }
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
											value={rowsPerPage_payments}
											onChange={(e) => { setRowsPerPage_payments(Number(e.target.value)); setCurrentPage_payments(1); }}
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
											value={searchQuery_payments}
											onChange={(e) => { setSearchQuery_payments(e.target.value); setCurrentPage_payments(1); }}
										/>
									</div>
								</div>
<div className="custom-datatable-filter table-responsive">
							<table className="table datatable">
								<thead className="thead-light">
									<tr>

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
										<td><a href="/invoice-details" className="link-info"> Inv-001</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-39.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>BrightWave Innovations</td>
										<td>Paypal</td>
										<td>15 Jan 2024</td>
										<td>$3000</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-002</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-40.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick Manager</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>Stellar Dynamics</td>
										<td>Paypal</td>
										<td>25 Jan 2024</td>
										<td>$2500</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-003</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-41.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake Director</a></h6>
													<span className="d-block mt-1">Director</span>
												</div>
											</div>
										</td>
										<td>Quantum Nexus</td>
										<td>Paypal</td>
										<td>22 Feb 2024</td>
										<td>$2800</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-004</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-42.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doris Crowley Consultant</a></h6>
													<span className="d-block mt-1">Consultant</span>
												</div>
											</div>
										</td>
										<td>EcoVision Enterprises</td>
										<td>Paypal</td>
										<td>17 Mar 2024</td>
										<td>$3300</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-005</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-43.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>Aurora Technologies</td>
										<td>Paypal</td>
										<td>16 Apr 2024</td>
										<td>$3600</td>
									</tr>

									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-006</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-44.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Kathleen Gutierrez</a></h6>
													<span className="d-block mt-1">Director</span>
												</div>
											</div>
										</td>
										<td>BlueSky Ventures</td>
										<td>Paypal</td>
										<td>21 Apr 2024</td>
										<td>$2000</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-007</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-45.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Bruce Wright</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>TerraFusion Energy</td>
										<td>Paypal</td>
										<td>06 Jul 2024</td>
										<td>$3400</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-008</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-46.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Estelle Morgan</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>UrbanPulse Design</td>
										<td>Paypal</td>
										<td>04 Sep 2024</td>
										<td>$4000</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-009</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-47.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephen Dias</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>Nimbus Networks</td>
										<td>Paypal</td>
										<td>15 Nov 2024</td>
										<td>$4500</td>
									</tr>
									<tr>
										<td><a href="/invoice-details" className="link-info">Inv-010</a></td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md avatar-rounded">
													<img src="/assets/img/users/user-48.jpg" className="img-fluid" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Angela Thomas</a></h6>
													<span className="d-block mt-1">Consultant</span>
												</div>
											</div>
										</td>
										<td>Epicurean Delights</td>
										<td>Paypal</td>
										<td>11 Dec 2024</td>
										<td>$3800</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_payments - 1) * rowsPerPage_payments + 1, 11)}-{Math.min(currentPage_payments * rowsPerPage_payments, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_payments === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_payments(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_payments === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_payments(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_payments === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_payments(p => Math.min(p + 1, 2))}>
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

export default Payments;
