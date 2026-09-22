import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Invoice = () => {
  // Pagination state for invoice
  const [currentPage_invoice, setCurrentPage_invoice] = useState(1);
  const [rowsPerPage_invoice, setRowsPerPage_invoice] = useState(10);
  const [searchQuery_invoice, setSearchQuery_invoice] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoices"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Sales' },
						{ label: 'Invoices', active: true }
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
							<a href="/add-invoices" className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Invoices</a>
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
						<h5>Estimates List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">

							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Select Status
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Accepted</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Sent</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Expired</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Declined</Link>
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
											value={rowsPerPage_invoice}
											onChange={(e) => { setRowsPerPage_invoice(Number(e.target.value)); setCurrentPage_invoice(1); }}
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
											value={searchQuery_invoice}
											onChange={(e) => { setSearchQuery_invoice(e.target.value); setCurrentPage_invoice(1); }}
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
										<th>Estimate Date</th>
										<th>Expiry Date</th>
										<th>Amount</th>
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
											<a href="/invoice-details" className="text-info">Inv-001</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Michael Walker</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>BrightWave Innovations</td>
										<td>14 Jan 2024</td>
										<td>15 Jan 2024</td>
										<td>$3000</td>
										<td><span className="badge badge-soft-purple"><i
													className="ti ti-point-filled"></i>Sent</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-002</a>
										</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-40.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sophie Headrick</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>Stellar Dynamics</td>
										<td>21 Jan 2024</td>
										<td>25 Jan 2024</td>
										<td>$2500</td>
										<td><span className="badge badge-soft-purple"><i
													className="ti ti-point-filled"></i>Sent</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-003</a>
										</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-41.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Cameron Drake</a></h6>
													<span className="d-block mt-1">Director</span>
												</div>
											</div>
										</td>
										<td>Quantum Nexus</td>
										<td>20 Feb 2024</td>
										<td>22 Feb 2024</td>
										<td>$2800</td>
										<td><span className="badge badge-soft-warning"><i
													className="ti ti-point-filled"></i>Expired</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-004</a>
										</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-42.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Doris Crowley</a></h6>
													<span className="d-block mt-1">Consultant</span>
												</div>
											</div>
										</td>
										<td>EcoVision Enterprises</td>
										<td>15 Mar 2024</td>
										<td>17 Mar 2024</td>
										<td>$3300</td>
										<td><span className="badge badge-soft-success"><i
													className="ti ti-point-filled"></i>Accepted</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-005</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-44.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Thomas Bordelon</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>Aurora Technologies</td>
										<td>12 Apr 2024</td>
										<td>16 Apr 2024</td>
										<td>$3600</td>
										<td><span className="badge badge-soft-danger"><i
													className="ti ti-point-filled"></i>Declined</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-006</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-45.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Kathleen Gutierrez</a></h6>
													<span className="d-block mt-1">Director</span>
												</div>
											</div>
										</td>
										<td>BlueSky Ventures</td>
										<td>20 Apr 2024</td>
										<td>21 Apr 2024</td>
										<td>$2000</td>
										<td><span className="badge badge-soft-purple"><i
													className="ti ti-point-filled"></i>Sent</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-007</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md">
													<img src="/assets/img/users/user-46.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Bruce Wright</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>TerraFusion Energy</td>
										<td>06 Jul 2024</td>
										<td>06 Jul 2024</td>
										<td>$3400</td>
										<td><span className="badge badge-soft-warning"><i
													className="ti ti-point-filled"></i>Expired</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-008</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-47.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Estelle Morgan</a></h6>
													<span className="d-block mt-1">Manager</span>
												</div>
											</div>
										</td>
										<td>UrbanPulse Design</td>
										<td>02 Sep 2024</td>
										<td>04 Sep 2024</td>
										<td>$4000</td>
										<td><span className="badge badge-soft-danger"><i
													className="ti ti-point-filled"></i>Declined</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-009</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-48.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Stephen Dias</a></h6>
													<span className="d-block mt-1">CEO</span>
												</div>
											</div>
										</td>
										<td>Nimbus Networks</td>
										<td>15 Nov 2024</td>
										<td>15 Nov 2024</td>
										<td>$4500</td>
										<td>
											<div>
												<span className="badge badge-soft-success"><i
														className="ti ti-point-filled"></i>Accepted</span>
											</div>

										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
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
											<a href="/invoice-details" className="text-info">Inv-010</a>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-43.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Angela Thomas</a></h6>
													<span className="d-block mt-1">Consultant</span>
												</div>
											</div>
										</td>
										<td>Epicurean Delights</td>
										<td>10 Dec 2024</td>
										<td>11 Dec 2024</td>
										<td>$3800</td>
										<td><span className="badge badge-soft-purple"><i
													className="ti ti-point-filled"></i>Sent</span></td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/edit-invoices" className="me-2"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-toggle="modal"
													data-bs-target="#delete_modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_invoice - 1) * rowsPerPage_invoice + 1, 11)}-{Math.min(currentPage_invoice * rowsPerPage_invoice, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_invoice === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoice(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_invoice === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_invoice(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_invoice === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoice(p => Math.min(p + 1, 2))}>
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

export default Invoice;
