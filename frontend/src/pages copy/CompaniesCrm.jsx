import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const CompaniesCrm = () => {
  // Pagination state for companiescrm
  const [currentPage_companiescrm, setCurrentPage_companiescrm] = useState(1);
  const [rowsPerPage_companiescrm, setRowsPerPage_companiescrm] = useState(10);
  const [searchQuery_companiescrm, setSearchQuery_companiescrm] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Companies"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Companies List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/companies-crm"
									className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/companies-grid" className="btn btn-icon btn-sm"><i
										className="ti ti-layout-grid"></i></a>
							</div>
						</div>
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_company"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Company</a>
						</div>
						<div className="ms-2 head-icons">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Companies List</h5>
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
									Company
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">BrightWave
											Innovations </Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Quantum Nexus</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">TerraFusion
											Energy</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Active</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Inactive</Link>
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
											value={rowsPerPage_companiescrm}
											onChange={(e) => { setRowsPerPage_companiescrm(Number(e.target.value)); setCurrentPage_companiescrm(1); }}
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
											value={searchQuery_companiescrm}
											onChange={(e) => { setSearchQuery_companiescrm(e.target.value); setCurrentPage_companiescrm(1); }}
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
										<th>Company Name</th>
										<th>Email</th>
										<th>Phone</th>
										<th>Location</th>
										<th>Rating</th>
										<th>Owner</th>
										<th>Contact</th>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-01.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">BrightWave
															Innovations</a></h6>
												</div>
											</div>
										</td>
										<td>michael@example.com</td>
										<td>(163) 2459 315</td>
										<td>Germany</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>4.2</span>
										</td>
										<td>Hendry Milner</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-02.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">Stellar
															Dynamics</a></h6>
												</div>
											</div>
										</td>
										<td>sophie@example.com</td>
										<td>(146) 1249 296</td>
										<td>USA</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>5.0</span>
										</td>
										<td>Guilory Berggren</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-03.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">Quantum
															Nexus</a></h6>
												</div>
											</div>
										</td>
										<td>cameron@example.com</td>
										<td>(135) 3489 516</td>
										<td>Canada</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>3.5</span>
										</td>
										<td>Jami Carlile</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-04.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">EcoVision
															Enterprises</a></h6>
												</div>
											</div>
										</td>
										<td>doris@example.com</td>
										<td>(158) 3459 596</td>
										<td>India</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>4.5</span>
										</td>
										<td>Theresa Nelson</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-05.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">Aurora
															Technologies</a></h6>
												</div>
											</div>
										</td>
										<td>thomas@example.com</td>
										<td>(196) 4862 196</td>
										<td>China</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>4.7</span>
										</td>
										<td>Smith Cooper</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-06.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">BlueSky
															Ventures</a></h6>
												</div>
											</div>
										</td>
										<td>kathleen@example.com</td>
										<td>(163) 6498 256</td>
										<td>Japan</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>5.0</span>
										</td>
										<td>Martin Lewis</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-07.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">TerraFusion
															Energy</a></h6>
												</div>
											</div>
										</td>
										<td>bruce@example.com</td>
										<td>(154) 6481 075</td>
										<td>Indonesia</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>3.1</span>
										</td>
										<td>Newell Egan</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-08.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">UrbanPulse
															Design</a></h6>
												</div>
											</div>
										</td>
										<td>estelle@example.com</td>
										<td>(184) 6348 195</td>
										<td>Cuba</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>5.0</span>
										</td>
										<td>Janet Carlson</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-09.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">Nimbus
															Networks</a></h6>
												</div>
											</div>
										</td>
										<td>stephen@example.com</td>
										<td>(175) 2496 125</td>
										<td>Israel</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>2.7</span>
										</td>
										<td>Craig Brown</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
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
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border rounded-circle">
													<img src="/assets/img/company/company-10.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="/company-details">Epicurean
															Delights</a></h6>
												</div>
											</div>
										</td>
										<td>angela@example.com</td>
										<td>(132) 3145 977</td>
										<td>Colombia</td>
										<td>
											<span><i className="ti ti-star-filled text-warning me-2"></i>3.0</span>
										</td>
										<td>Daniel Byrne</td>
										<td>
											<ul className="contact-icon d-flex align-items-center ">
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-mail d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-mail text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-call d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-phone-call text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-msg d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-message-2 text-gray-5"></i></span></a></li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-skype d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-skype text-gray-5"></i></span></a>
												</li>
												<li><a href="#"
														className="p-1 rounded-circle contact-icon-facebook d-flex align-items-center justify-content-center"><span
															className="d-flex align-items-center justify-content-center"><i
																className="ti ti-brand-facebook text-gray-5"></i></span></a>
												</li>
											</ul>
										</td>
										<td>
											<span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active
											</span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="/company-details" className="me-2"><i
														className="ti ti-eye"></i></a>
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_company"><i className="ti ti-edit"></i></a>
												<a href="#" onClick={(e) => e.preventDefault()} data-bs-target="#delete_modal"
													data-bs-toggle="modal"><i className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_companiescrm - 1) * rowsPerPage_companiescrm + 1, 11)}-{Math.min(currentPage_companiescrm * rowsPerPage_companiescrm, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_companiescrm === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_companiescrm(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_companiescrm === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_companiescrm(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_companiescrm === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_companiescrm(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default CompaniesCrm;
