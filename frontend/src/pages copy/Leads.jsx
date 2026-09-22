import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Leads = () => {
  // Pagination state for leads
  const [currentPage_leads, setCurrentPage_leads] = useState(1);
  const [rowsPerPage_leads, setRowsPerPage_leads] = useState(10);
  const [searchQuery_leads, setSearchQuery_leads] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Leads"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Leads List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/leads" className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/leads-grid" className="btn btn-icon btn-sm"><i
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_leads"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Lead</a>
						</div>
						<div className="head-icons ms-2">
							<a href="#" onClick={(e) => e.preventDefault()} className="" data-bs-toggle="tooltip" data-bs-placement="top"
								data-bs-original-title="Collapse" id="collapse-header">
								<i className="ti ti-chevrons-up"></i>
							</a>
						</div>
				</PageHeader>
				{/* /Breadcrumb */}

				{/* Leads List */}
				<div className="card">
					
					<div className="card-header d-flex align-items-center justify-content-between flex-wrap row-gap-3">
						<h5>Leads List</h5>
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
									Tags
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Closed</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Contacted</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Lost</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Not Contacted</Link>
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
											value={rowsPerPage_leads}
											onChange={(e) => { setRowsPerPage_leads(Number(e.target.value)); setCurrentPage_leads(1); }}
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
											value={searchQuery_leads}
											onChange={(e) => { setSearchQuery_leads(e.target.value); setCurrentPage_leads(1); }}
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
										<th>Lead Name</th>
										<th>Company Name</th>
										<th>Phone</th>
										<th>Email</th>
										<th>Tags</th>
										<th>Created Date</th>
										<th>Lead Owner</th>
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Collins</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-01.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">BrightWave Innovations</a></h6>
												</div>
											</div>
										</td>
										<td>(123) 4567 890</td>
										<td>anthony@example.com</td>
										<td>
											<span className="badge badge-success-transparent ">Closed</span>
										</td>
										<td>14 Jan 2024</td>
										<td>Hendry Milner</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Konopelski</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-02.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">Stellar Dynamics</a></h6>
												</div>
											</div>
										</td>
										<td>(179) 7382 829</td>
										<td>brian@example.com</td>
										<td>
											<span className="badge badge-purple-transparent ">Contacted</span>
										</td>
										<td>21 Jan 2024</td>
										<td>Guilory Berggren</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Adams</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-03.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">Quantum Nexus</a></h6>
												</div>
											</div>
										</td>
										<td>(184) 2719 738</td>
										<td>harvey@example.com</td>
										<td>
											<span className="badge badge-danger-transparent ">Lost</span>
										</td>
										<td>20 Feb 2024</td>
										<td>Jami Carlile</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Schumm</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-04.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">EcoVision Enterprises</a></h6>
												</div>
											</div>
										</td>
										<td>(193) 7839 748</td>
										<td>peral@example.com</td>
										<td>
											<span className="badge badge-warning-transparent ">Not Contacted</span>
										</td>
										<td>15 Mar 2024</td>
										<td>Theresa Nelson</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Wisozk</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-05.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">Aurora Technologies</a></h6>
												</div>
											</div>
										</td>
										<td>(183) 9302 890</td>
										<td>martniwr@example.com</td>
										<td>
											<span className="badge badge-success-transparent "> Closed</span>
										</td>
										<td>12 Apr 2024</td>
										<td>Smith Cooper</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Heller</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-06.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">BlueSky Ventures</a></h6>
												</div>
											</div>
										</td>
										<td>(120) 3728 039</td>
										<td>ray456@example.com</td>
										<td>
											<span className="badge badge-purple-transparent "> Contacted</span>
										</td>
										<td>20 Apr 2024</td>
										<td>Martin Lewis</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Gutkowski</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-07.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">TerraFusion Energy</a></h6>
												</div>
											</div>
										</td>
										<td>(102) 8480 832</td>
										<td>murray@example.com</td>
										<td>
											<span className="badge badge-warning-transparent "> Not Contacted</span>
										</td>
										<td>06 Jul 2024</td>
										<td>Newell Egan</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Walter</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-08.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">UrbanPulse Design</a></h6>
												</div>
											</div>
										</td>
										<td>(162) 8920 713</td>
										<td>smtih@example.com</td>
										<td>
											<span className="badge badge-success-transparent "> Closed</span>
										</td>
										<td>02 Sep 2024</td>
										<td>Janet Carlson</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Hansen</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-09.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">Nimbus Networks</a></h6>
												</div>
											</div>
										</td>
										<td>(189) 0920 723</td>
										<td>connie@example.com</td>
										<td>
											<span className="badge badge-success-transparent "> Closed</span>
										</td>
										<td>15 Nov 2024</td>
										<td>Craig Brown</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
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
											<h6 className="fs-14 fw-medium"><a href="/leads-details">Leuschke</a></h6>
										</td>
										<td>
											<div className="d-flex align-items-center file-name-icon">
												<a href="/company-details"
													className="avatar avatar-md border avatar-rounded">
													<img src="/assets/img/company/company-10.svg" className="img-fluid"
														alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-normal fs-14 text-gray-5"><a
															href="/company-details">Epicurean Delights</a></h6>
												</div>
											</div>
										</td>
										<td>(168) 8392 823</td>
										<td>broaddus@example.com</td>
										<td>
											<span className="badge badge-danger-transparent "> Lost</span>
										</td>
										<td>10 Dec 2024</td>
										<td>Daniel Byrne</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_leads"><i className="ti ti-edit"></i></a>
												<a href="#" data-bs-toggle="modal" data-bs-target="#delete_modal"><i
														className="ti ti-trash"></i></a>
											</div>
										</td>
									</tr>
								</tbody>
							</table>

								{/* Pagination Footer */}
								<div className="d-flex align-items-center justify-content-between flex-wrap row-gap-2 px-3 py-3 border-top">
									<p className="mb-0 text-gray-9 fs-14">
										Showing {Math.min((currentPage_leads - 1) * rowsPerPage_leads + 1, 11)}-{Math.min(currentPage_leads * rowsPerPage_leads, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_leads === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leads(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_leads === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_leads(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_leads === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_leads(p => Math.min(p + 1, 2))}>
												<i className="ti ti-chevron-right"></i>
											</button>
										</li>
									</ul>
								</div>
						</div>
					</div>
				</div>
				{/* /Leads List */}

			</div>

			<div className="footer d-sm-flex align-items-center justify-content-between border-top bg-white p-3">
				<p className="mb-0">2014 - 2026 &copy; SmartHR.</p>
				<p>Designed &amp; Developed By <a href="#" onClick={(e) => e.preventDefault()} className="text-primary">Dreams</a></p>
			</div>

		</div>
		
    </>
  );
};

export default Leads;
