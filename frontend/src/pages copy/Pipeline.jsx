import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Pipeline = () => {
  // Pagination state for pipeline
  const [currentPage_pipeline, setCurrentPage_pipeline] = useState(1);
  const [rowsPerPage_pipeline, setRowsPerPage_pipeline] = useState(10);
  const [searchQuery_pipeline, setSearchQuery_pipeline] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Pipeline"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'CRM' },
						{ label: 'Pipeline List', active: true }
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
							<a href="#" data-bs-toggle="modal" data-bs-target="#add_pipeline"
								className="btn btn-primary d-flex align-items-center"><i
									className="ti ti-circle-plus me-2"></i>Add Pipeline</a>
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
						<h5>Pipeline List</h5>
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
									Stage
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Won</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">In Pipeline</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Conversation</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Follow Up</Link>
									</li>
								</ul>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									$0.00 - $0.00
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">$10 - $20</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$20 - $30</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">$40 - $50</Link>
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
										<Link to="#" className="dropdown-item rounded-1">InActive</Link>
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
											value={rowsPerPage_pipeline}
											onChange={(e) => { setRowsPerPage_pipeline(Number(e.target.value)); setCurrentPage_pipeline(1); }}
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
											value={searchQuery_pipeline}
											onChange={(e) => { setSearchQuery_pipeline(e.target.value); setCurrentPage_pipeline(1); }}
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
										<th>Pipeline Name</th>
										<th>Total Deal Value</th>
										<th>No of Deals</th>
										<th>Stages</th>
										<th>Created Date</th>
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
											<h6 className="fs-14 fw-medium">Sales</h6>
										</td>
										<td>
											$4,50,000
										</td>
										<td>315</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-success" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Won</span>
											</div>
										</td>
										<td>14 Jan 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Marketing</h6>
										</td>
										<td>
											$3,15,000
										</td>
										<td>447</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-purple" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">In Pipeline</span>
											</div>
										</td>
										<td>21 Jan 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Calls</h6>
										</td>
										<td>
											$8,40,000
										</td>
										<td>654</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-success" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Won</span>
											</div>
										</td>
										<td>20 Feb 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Email</h6>
										</td>
										<td>
											$6,10,000
										</td>
										<td>545</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-skyblue" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Conversation</span>
											</div>
										</td>
										<td>15 Mar 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Chats</h6>
										</td>
										<td>
											$4,70,000
										</td>
										<td>787</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-skyblue" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Won</span>
											</div>
										</td>
										<td>12 Apr 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Operational</h6>
										</td>
										<td>
											$5,50,000
										</td>
										<td>787</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-warning" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Follow Up</span>
											</div>
										</td>
										<td>20 Apr 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Collabrative</h6>
										</td>
										<td>
											$5,00,000
										</td>
										<td>315</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-success" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Won</span>
											</div>
										</td>
										<td>06 Jul 2024</td>
										<td><span className="badge badge-danger d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Inactive </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Differentiate</h6>
										</td>
										<td>
											$4,50,000
										</td>
										<td>478</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-pink" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Schedule servise</span>
											</div>
										</td>
										<td>02 Sep 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Interact</h6>
										</td>
										<td>
											$6,20,000
										</td>
										<td>664</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-success" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Won</span>
											</div>
										</td>
										<td>15 Nov 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
											<h6 className="fs-14 fw-medium">Identify</h6>
										</td>
										<td>
											$7,40,000
										</td>
										<td>128</td>
										<td>
											<div className=" d-flex align-items-center">
												<div className="progress me-2" role="progressbar" aria-label="Basic example"
													aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
													style={{height: '5px', minWidth: '80px'}}>
													<div className="progress-bar bg-danger" style={{width: '100%'}}></div>
												</div>
												<span className="fs-14 fw-normal">Lost</span>
											</div>
										</td>
										<td>10 Dec 2024</td>
										<td><span className="badge badge-success d-inline-flex align-items-center badge-xs">
												<i className="ti ti-point-filled me-1"></i>Active </span>
										</td>
										<td>
											<div className="action-icon d-inline-flex">
												<a href="#" className="me-2" data-bs-toggle="modal"
													data-bs-target="#edit_pipeline"><i className="ti ti-edit"></i></a>
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
										Showing {Math.min((currentPage_pipeline - 1) * rowsPerPage_pipeline + 1, 11)}-{Math.min(currentPage_pipeline * rowsPerPage_pipeline, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_pipeline === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_pipeline(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_pipeline === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_pipeline(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_pipeline === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_pipeline(p => Math.min(p + 1, 2))}>
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

export default Pipeline;
