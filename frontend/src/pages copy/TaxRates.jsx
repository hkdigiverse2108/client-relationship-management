import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const TaxRates = () => {
  // Pagination state for taxrates
  const [currentPage_taxrates, setCurrentPage_taxrates] = useState(1);
  const [rowsPerPage_taxrates, setRowsPerPage_taxrates] = useState(10);
  const [searchQuery_taxrates, setSearchQuery_taxrates] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Settings"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'System Settings' },
						{ label: 'Tax Rates', active: true }
					]}
				>
					
				</PageHeader>
				{/* /Breadcrumb */}

				<ul className="nav nav-tabs nav-tabs-solid bg-transparent border-bottom mb-3">
					<li className="nav-item">
						<a className="nav-link" href="/profile-settings"><i className="ti ti-settings me-2"></i>General
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/business-settings"><i className="ti ti-world-cog me-2"></i>Website
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/salary-settings"><i
								className="ti ti-device-ipad-horizontal-cog me-2"></i>App Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/email-settings"><i className="ti ti-server-cog me-2"></i>System
							Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link active" href="/payment-gateways"><i
								className="ti ti-settings-dollar me-2"></i>Financial Settings</a>
					</li>
					<li className="nav-item">
						<a className="nav-link" href="/custom-css"><i className="ti ti-settings-2 me-2"></i>Other
							Settings</a>
					</li>
				</ul>
				<div className="row">
					<div className="col-xl-3 theiaStickySidebar">
						<div className="card">
							<div className="card-body">
								<div className="d-flex flex-column list-group settings-list">
									<a href="/payment-gateways"
										className="d-inline-flex align-items-center rounded py-2 px-3">Payment Gateways</a>
									<a href="/tax-rates"
										className="d-inline-flex align-items-center active rounded py-2 px-3"><i
											className="ti ti-arrow-badge-right me-2"></i>Tax Rates</a>
									<a href="/currencies"
										className="d-inline-flex align-items-center rounded py-2 px-3">Currencies</a>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-9">
						<div className="card">
							
							<div className="card-body pb-0">
								<div className="card mb-3">
									
									<div className="card-body p-0">
										
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_taxrates}
											onChange={(e) => { setRowsPerPage_taxrates(Number(e.target.value)); setCurrentPage_taxrates(1); }}
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
											value={searchQuery_taxrates}
											onChange={(e) => { setSearchQuery_taxrates(e.target.value); setCurrentPage_taxrates(1); }}
										/>
									</div>
								</div>
<div className="table-responsive">
											<table className="table">
												<thead className="thead-light">
													<tr>
														<th className="no-sort">
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox"
																	id="select-all" />
															</div>
														</th>
														<th>Name</th>
														<th>Tax Rate</th>
														<th>Status</th>
														<th></th>
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
															<h6 className="d-flex align-items-center fw-medium">
																VAT
															</h6>
														</td>
														<td>16%</td>
														<td>
															<span
																className="badge badge-success d-inline-flex align-items-center badge-xs">
																<i className="ti ti-point-filled me-1"></i>Active
															</span>
														</td>
														<td>
															<div className="action-icon d-inline-flex">
																<a href="#" className="me-2" data-bs-toggle="modal"
																	data-bs-target="#edit_tax_rate"><i
																		className="ti ti-edit"></i></a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"><i
																		className="ti ti-trash"></i></a>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox" />
															</div>
														</td>
														<td>
															<h6 className="d-flex align-items-center fw-medium">
																GST
															</h6>
														</td>
														<td>14%</td>
														<td>
															<span
																className="badge badge-success d-inline-flex align-items-center badge-xs">
																<i className="ti ti-point-filled me-1"></i>Active
															</span>
														</td>
														<td>
															<div className="action-icon d-inline-flex">
																<a href="#" className="me-2" data-bs-toggle="modal"
																	data-bs-target="#edit_tax_rate"><i
																		className="ti ti-edit"></i></a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"><i
																		className="ti ti-trash"></i></a>
															</div>
														</td>
													</tr>
													<tr>
														<td>
															<div className="form-check form-check-md">
																<input className="form-check-input" type="checkbox" />
															</div>
														</td>
														<td>
															<h6 className="d-flex align-items-center fw-medium">
																HST
															</h6>
														</td>
														<td>12%</td>
														<td>
															<span
																className="badge badge-success d-inline-flex align-items-center badge-xs">
																<i className="ti ti-point-filled me-1"></i>Active
															</span>
														</td>
														<td>
															<div className="action-icon d-inline-flex">
																<a href="#" className="me-2" data-bs-toggle="modal"
																	data-bs-target="#edit_tax_rate"><i
																		className="ti ti-edit"></i></a>
																<a href="#" data-bs-toggle="modal"
																	data-bs-target="#delete_modal"><i
																		className="ti ti-trash"></i></a>
															</div>
														</td>
													</tr>
												</tbody>
											</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_taxrates - 1) * rowsPerPage_taxrates + 1, 11)}-{Math.min(currentPage_taxrates * rowsPerPage_taxrates, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_taxrates === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_taxrates(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_taxrates === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_taxrates(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_taxrates === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_taxrates(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
										</div>
									</div>
								</div>
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

export default TaxRates;
