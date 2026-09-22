import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Pricing = () => {
  // Pagination state for pricing
  const [currentPage_pricing, setCurrentPage_pricing] = useState(1);
  const [rowsPerPage_pricing, setRowsPerPage_pricing] = useState(10);
  const [searchQuery_pricing, setSearchQuery_pricing] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Pricing"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Pages' },
						{ label: 'Pricing', active: true }
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
							<a href="#" className="btn btn-primary d-flex align-items-center" data-bs-toggle="modal"
								data-bs-target="#add_plans">
								<i className="ti ti-circle-plus me-2"></i>Add Plan
							</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Pricing */}
				<div className="card">
					<div className="card-body pb-1">
						<div className="d-flex justify-content-center align-items-center mb-4">
							<p className="mb-0 me-2">Monthly</p>
							<div className="form-check form-switch">
								<input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
							</div>
							<p>Yearly</p>
						</div>
						<div className="row justify-content-center">
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="card mb-3">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Basic</h4>
												<h1>$50<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>10
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50 GB
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>Voice & Video
													Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="card mb-3">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Professional</h4>
												<h1>$100<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>50 GB
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Voice
													& Video Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-circle-x-filled text-danger me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
							<div className="col-lg-4 col-md-6 col-sm-12">
								<div className="card mb-3">
									<div className="card-body">
										<div className="card">
											<div className="card-body">
												<h4>Enterprise</h4>
												<h1>$200<span className="fs-14 fw-normal text-gray">/monthly</span></h1>
											</div>
										</div>
										<div className="pricing-content rounded bg-light mb-3">
											<div className="price-hdr">
												<h6 className="fs-14 fw-medium text-gray w-100">Features Includes</h6>
											</div>
											<div>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>100
													Employees</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>200
													Projects</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>200
													Clients</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Unlimited
													Storage</span>
												<span className="text-dark d-flex align-items-center mb-3"><i
														className="ti ti-discount-check-filled text-success me-2"></i>Voice
													& Video Chat</span>
												<span className="text-dark d-flex align-items-center"><i
														className="ti ti-discount-check-filled text-success me-2"></i>CRM</span>
											</div>
										</div>
										<a href="#" className="btn btn-dark w-100">Choose Plan</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Pricing */}

				{/* Pricing Table */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Plan Details</h5>
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
											value={rowsPerPage_pricing}
											onChange={(e) => { setRowsPerPage_pricing(Number(e.target.value)); setCurrentPage_pricing(1); }}
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
											value={searchQuery_pricing}
											onChange={(e) => { setSearchQuery_pricing(e.target.value); setCurrentPage_pricing(1); }}
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
										<th>Plan</th>
										<th>Plan Type</th>
										<th>Created Date</th>
										<th>Modified Date</th>
										<th>Amount</th>
										<th>Subscribed Users</th>
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
											<h6 className="fw-medium"><a href="#">Basic</a></h6>
										</td>
										<td>Monthly</td>
										<td>14 Jan 2024</td>
										<td>20 Feb 2024</td>
										<td>$50</td>
										<td>30 Users</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">Professional</a></h6>
										</td>
										<td>Monthly</td>
										<td>21 Feb 2024</td>
										<td>11 Mar 2024</td>
										<td>$100</td>
										<td>40 Users</td>
									</tr>
									<tr>
										<td>
											<div className="form-check form-check-md">
												<input className="form-check-input" type="checkbox" />
											</div>
										</td>
										<td>
											<h6 className="fw-medium"><a href="#">Enterprise</a></h6>
										</td>
										<td>Monthly</td>
										<td>18 Mar 2024</td>
										<td>05 Apr 2024</td>
										<td>$200</td>
										<td>50 Users</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_pricing - 1) * rowsPerPage_pricing + 1, 11)}-{Math.min(currentPage_pricing * rowsPerPage_pricing, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_pricing === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_pricing(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_pricing === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_pricing(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_pricing === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_pricing(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Pricing Table */}
			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Pricing;
