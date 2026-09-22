import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Invoices = () => {
  // Pagination state for invoices
  const [currentPage_invoices, setCurrentPage_invoices] = useState(1);
  const [rowsPerPage_invoices, setRowsPerPage_invoices] = useState(10);
  const [searchQuery_invoices, setSearchQuery_invoices] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Invoices"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Applications' },
						{ label: 'Invoices', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="dropdown">
								<a href="#" onClick={(e) => e.preventDefault()}
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									<i className="ti ti-file-export me-2"></i>Export
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
									className="ti ti-circle-plus me-2"></i>Add Invoice</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Invoice Data */}
				<div className="row">
					<div className="col-xl-3 col-sm-6">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center overflow-hidden mb-2">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Total Invoice</p>
										<h5>$3,237.94</h5>
									</div>
								</div>
								<div className="attendance-report-bar mb-2">
									<div className="progress" role="progressbar" aria-label="Success example"
										aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
										<div className="progress-bar bg-pink" style={{width: '85%'}}></div>
									</div>
								</div>
								<div>
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
											className="text-success fs-12 d-flex align-items-center me-1"><i
												className="ti ti-arrow-wave-right-up me-1"></i>+32.40%</span>from last month
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center overflow-hidden mb-2">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Outstanding</p>
										<h5>$3,237.94</h5>
									</div>
								</div>
								<div className="attendance-report-bar mb-2">
									<div className="progress" role="progressbar" aria-label="Success example"
										aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
										<div className="progress-bar bg-purple" style={{width: '50%'}}></div>
									</div>
								</div>
								<div>
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
											className="text-danger fs-12 d-flex align-items-center me-1"><i
												className="ti ti-arrow-wave-right-up me-1"></i>-4.40%</span>from last month
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center overflow-hidden mb-2">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Draft</p>
										<h5>$3,237.94</h5>
									</div>
								</div>
								<div className="attendance-report-bar mb-2">
									<div className="progress" role="progressbar" aria-label="Success example"
										aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
										<div className="progress-bar bg-warning" style={{width: '30%'}}></div>
									</div>
								</div>
								<div>
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
											className="text-success fs-12 d-flex align-items-center me-1"><i
												className="ti ti-arrow-wave-right-up me-1"></i>12%</span>from last month</p>
								</div>
							</div>
						</div>
					</div>
					<div className="col-xl-3 col-sm-6">
						<div className="card flex-fill">
							<div className="card-body">
								<div className="d-flex align-items-center overflow-hidden mb-2">
									<div>
										<p className="fs-12 fw-normal mb-1 text-truncate">Total Overdue</p>
										<h5>$3,237.94</h5>
									</div>
								</div>
								<div className="attendance-report-bar mb-2">
									<div className="progress" role="progressbar" aria-label="Success example"
										aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{height: '5px'}}>
										<div className="progress-bar bg-danger" style={{width: '20%'}}></div>
									</div>
								</div>
								<div>
									<p className="fs-12 fw-normal d-flex align-items-center text-truncate"><span
											className="text-danger fs-12 d-flex align-items-center me-1"><i
												className="ti ti-arrow-wave-right-up me-1"></i>-15.40%</span>from last month
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* /Invoice Data */}

				{/* Invoice DataTable */}
				<div className="row">
					<div className="col-sm-12">
						<div className="card">
							
							<div className="card-body p-0">

								
								{/* Pagination Toolbar */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 mb-3 px-3 pt-3">
									<div className="d-flex align-items-center">
										<span className="me-2 text-gray-9 fs-14">Row Per Page</span>
										<select
											className="form-select form-select-sm w-auto"
											value={rowsPerPage_invoices}
											onChange={(e) => { setRowsPerPage_invoices(Number(e.target.value)); setCurrentPage_invoices(1); }}
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
											value={searchQuery_invoices}
											onChange={(e) => { setSearchQuery_invoices(e.target.value); setCurrentPage_invoices(1); }}
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
												<th>Invoice</th>
												<th>Name</th>
												<th>Created On</th>
												<th>Total</th>
												<th>Amount Due</th>
												<th>Due Date</th>
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
													<a href="/invoice-details" className="tb-data">INV-1454</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-32.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Anthony
																	Lewis</a>
															</h6>
															<span className="fs-12">anthony@example.com</span>
														</div>
													</div>
												</td>
												<td>14 Jan 2024, 04:27 AM </td>
												<td>$300</td>
												<td>$0</td>
												<td>14 Jan 2024, 04:27 AM</td>
												<td>
													<span
														className="badge badge-soft-success d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Paid
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-6571</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-09.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Brian
																	Villalobos</a>
															</h6>
															<span className="fs-12">brian@example.com</span>
														</div>
													</div>
												</td>
												<td>21 Jan 2024, 03:19 AM</td>
												<td>$547</td>
												<td>$200</td>
												<td>21 Jan 2024, 03:19 AM</td>
												<td>
													<span
														className="badge badge-soft-danger d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Overdue
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-2245</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-01.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Harvey
																	Smith</a>
															</h6>
															<span className="fs-12">harvey@example.com</span>
														</div>
													</div>
												</td>
												<td>20 Feb 2024, 12:15 PM</td>
												<td>$325</td>
												<td>$65</td>
												<td>20 Feb 2024, 12:15 PM</td>
												<td>
													<span
														className="badge badge-soft-purple d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Pending
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-1456</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-33.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Stephan
																	Peralt</a>
															</h6>
															<span className="fs-12">peral@example.com</span>
														</div>
													</div>
												</td>
												<td>15 Mar 2024, 12:11 AM</td>
												<td>$471</td>
												<td>$145</td>
												<td>15 Mar 2024, 12:11 AM</td>
												<td>
													<span
														className="badge badge-soft-purple d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Pending
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="#" className="me-2"><i className="ti ti-edit"></i></a>
														<a href="#" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-0045</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-34.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Doglas
																	Martini</a>
															</h6>
															<span className="fs-12">martniwr@example.com</span>
														</div>
													</div>
												</td>
												<td>12 Apr 2024, 05:48 PM</td>
												<td>$147</td>
												<td>$32</td>
												<td>12 Apr 2024, 05:48 PM</td>
												<td>
													<span
														className="badge badge-soft-danger d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Overdue
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-6244</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-02.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Linda
																	Ray</a>
															</h6>
															<span className="fs-12">ray456@example.com</span>
														</div>
													</div>
												</td>
												<td>20 Apr 2024, 06:11 PM</td>
												<td>$654</td>
												<td>$140</td>
												<td>20 Apr 2024, 06:11 PM</td>
												<td>
													<span
														className="badge badge-soft-warning d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Draft
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-9565</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-35.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Elliot
																	Murray</a>
															</h6>
															<span className="fs-12">murray@example.com</span>
														</div>
													</div>
												</td>
												<td>14 Jan 2024, 04:27 AM </td>
												<td>$300</td>
												<td>$0</td>
												<td>14 Jan 2024, 04:27 AM</td>
												<td>
													<span
														className="badge badge-soft-success d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Paid
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-6874</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-36.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Rebecca
																	Smtih</a>
															</h6>
															<span className="fs-12">smtih@example.com</span>
														</div>
													</div>
												</td>
												<td>02 Sep 2024, 09:21 PM</td>
												<td>$654</td>
												<td>$65</td>
												<td>02 Sep 2024, 09:21 PM</td>
												<td>
													<span
														className="badge badge-soft-success d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Paid
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-1454</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-32.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Anthony
																	Lewis</a>
															</h6>
															<span className="fs-12">anthony@example.com</span>
														</div>
													</div>
												</td>
												<td>14 Jan 2024, 04:27 AM </td>
												<td>$300</td>
												<td>$0</td>
												<td>14 Jan 2024, 04:27 AM</td>
												<td>
													<span
														className="badge badge-soft-warning d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Draft
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-6587</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-37.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Connie
																	Waters</a>
															</h6>
															<span className="fs-12">connie@example.com</span>
														</div>
													</div>
												</td>
												<td>15 Nov 2024, 12:44 PM</td>
												<td>$987</td>
												<td>$47</td>
												<td>15 Nov 2024, 12:44 PM</td>
												<td>
													<span
														className="badge badge-soft-purple d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Pending
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
													<a href="/invoice-details" className="tb-data">INV-5879</a>
												</td>
												<td>
													<div className="d-flex align-items-center">
														<a href="/invoice-details" className="avatar avatar-lg me-2">
															<img src="/assets/img/users/user-38.jpg"
																className="rounded-circle" alt="user" />
														</a>
														<div>
															<h6 className="fw-medium"><a href="/invoice-details">Lori
																	Broaddus</a>
															</h6>
															<span className="fs-12">broaddus@example.com</span>
														</div>
													</div>
												</td>
												<td>10 Dec 2024, 11:23 PM</td>
												<td>$365</td>
												<td>$21</td>
												<td>10 Dec 2024, 11:23 PM</td>
												<td>
													<span
														className="badge badge-soft-danger d-inline-flex align-items-center">
														<i className="ti ti-point-filled me-1"></i>Overdue
													</span>
												</td>
												<td>
													<div className="action-icon d-inline-flex">
														<a href="/invoice-details" className="me-2"><i
																className="ti ti-eye"></i></a>
														<a href="/edit-invoices" className="me-2"><i
																className="ti ti-edit"></i></a>
														<a href="#delete_modal" className="" data-bs-toggle="modal"
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
										Showing {Math.min((currentPage_invoices - 1) * rowsPerPage_invoices + 1, 11)}-{Math.min(currentPage_invoices * rowsPerPage_invoices, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_invoices === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoices(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_invoices === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_invoices(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_invoices === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_invoices(p => Math.min(p + 1, 2))}>
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
				{/* /Invoice DataTable */}
			</div>

			{/* Footer */}
			<div className="footer d-sm-flex align-items-center justify-content-between bg-white border-top p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" className="text-primary">Dreams</a></p>
			</div>
			{/* /Footer */}

			</div>
    </>
  );
};

export default Invoices;
