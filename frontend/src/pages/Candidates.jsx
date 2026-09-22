import React, { useState } from 'react';
import { Link } from 'react-router-dom';import PageHeader from '../components/common/PageHeader';


const Candidates = () => {
  // Pagination state for candidates
  const [currentPage_candidates, setCurrentPage_candidates] = useState(1);
  const [rowsPerPage_candidates, setRowsPerPage_candidates] = useState(10);
  const [searchQuery_candidates, setSearchQuery_candidates] = useState('');
  return (
    <>
      <div className="page-wrapper">
			<div className="content">

				{/* Breadcrumb */}
				<PageHeader 
					title="Candidates List"
					breadcrumbs={[
						{ label: 'Dashboard' },
						{ label: 'Administration' },
						{ label: 'Candidates List', active: true }
					]}
				>
					<div className="me-2 mb-2">
							<div className="d-flex align-items-center border bg-white rounded p-1 me-2 icon-list">
								<a href="/candidates-kanban" className="btn btn-icon btn-sm me-1"><i
										className="ti ti-layout-kanban"></i></a>
								<a href="/candidates"
									className="btn btn-icon btn-sm active bg-primary text-white me-1"><i
										className="ti ti-list-tree"></i></a>
								<a href="/candidates-grid" className="btn btn-icon btn-sm"><i
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
						<h5>Candidates List</h5>
						<div className="d-flex my-xl-auto right-content align-items-center flex-wrap row-gap-3">
							<div className="me-3">
								<div className="input-icon-end position-relative">
									<input type="text" className="form-control date-range bookingrange"
										placeholder="dd/mm/yyyy - dd/mm/yyyy" />
									<span className="input-icon-addon">
										<i className="ti ti-chevron-down"></i>
									</span>
								</div>
							</div>
							<div className="dropdown me-3">
								<Link to="#"
									className="dropdown-toggle btn btn-white d-inline-flex align-items-center"
									data-bs-toggle="dropdown">
									Role
								</Link>
								<ul className="dropdown-menu  dropdown-menu-end p-3">
									<li>
										<Link to="#" className="dropdown-item rounded-1">Accountant</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Accountant</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Technician</Link>
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
										<Link to="#" className="dropdown-item rounded-1">Scheduled</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Interviewed</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Offered</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Rejected</Link>
									</li>
									<li>
										<Link to="#" className="dropdown-item rounded-1">Hired</Link>
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
											value={rowsPerPage_candidates}
											onChange={(e) => { setRowsPerPage_candidates(Number(e.target.value)); setCurrentPage_candidates(1); }}
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
											value={searchQuery_candidates}
											onChange={(e) => { setSearchQuery_candidates(e.target.value); setCurrentPage_candidates(1); }}
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
										<th>Cand ID</th>
										<th>Candidate</th>
										<th>Applied Role</th>
										<th>Phone</th>
										<th>Applied Date</th>
										<th>Resume</th>
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
										<td>Cand-001</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-01.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Harold Gaynor</a></h6>
													<span className="d-block mt-1">harold@example.com</span>
												</div>
											</div>
										</td>
										<td>Accountant</td>
										<td>(146) 8964 278</td>
										<td>12 Sep 2024 </td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-purple text-purple"><i
													className="ti ti-point-filled"></i>Sent</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-002</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-34.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Sandra Ornellas</a></h6>
													<span className="d-block mt-1">sandra@example.com</span>
												</div>
											</div>
										</td>
										<td>App Developer</td>
										<td>(148) 9648 218</td>
										<td>24 Oct 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-pink text-pink"><i
													className="ti ti-point-filled"></i>Scheduled</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-003</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-09.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">John Harris</a></h6>
													<span className="d-block mt-1">john@example.com</span>
												</div>
											</div>
										</td>
										<td>Technician</td>
										<td>(196) 2348 947</td>
										<td>18 Feb 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-info text-info"><i
													className="ti ti-point-filled"></i>Interviewed</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-004</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-26.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Carole Langan</a></h6>
													<span className="d-block mt-1">carole@example.com</span>
												</div>
											</div>
										</td>
										<td>Web Developer</td>
										<td>(138) 6487 295</td>
										<td>17 Oct 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-warning text-warning"><i
													className="ti ti-point-filled"></i>Offered</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-005</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-39.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Charles Marks</a></h6>
													<span className="d-block mt-1">charles@example.com</span>
												</div>
											</div>
										</td>
										<td>Sales Executive Officer</td>
										<td>(154) 6485 218</td>
										<td>20 Jul 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-success text-success"><i
													className="ti ti-point-filled"></i>Hired</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-006</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-24.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Kerry Drake</a></h6>
													<span className="d-block mt-1">kerry@example.com</span>
												</div>
											</div>
										</td>
										<td>Designer</td>
										<td>(185) 5947 097</td>
										<td>20 Jul 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-danger text-danger"><i
													className="ti ti-point-filled"></i>Rejected</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-007</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-33.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">David Carmona</a></h6>
													<span className="d-block mt-1">david@example.com</span>
												</div>
											</div>
										</td>
										<td>Account Manager</td>
										<td>(106) 3485 978</td>
										<td>29 Aug 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-success text-success"><i
													className="ti ti-point-filled"></i>Hired</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-008</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-10.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Margaret Soto</a></h6>
													<span className="d-block mt-1">margaret@example.com</span>
												</div>
											</div>
										</td>
										<td>SEO Analyst</td>
										<td>(174) 3795 107</td>
										<td>22 Feb 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-pink text-pink"><i
													className="ti ti-point-filled"></i>Scheduled</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-009</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-11.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Jeffrey Thaler</a></h6>
													<span className="d-block mt-1">jeffrey@example.com</span>
												</div>
											</div>
										</td>
										<td>Admin</td>
										<td>(128) 0975 348</td>
										<td>03 Nov 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-purple text-purple"><i
													className="ti ti-point-filled"></i>App Received</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										<td>Cand-010</td>
										<td>

											<div className="d-flex align-items-center file-name-icon">
												<a href="#" className="avatar avatar-md ">
													<img src="/assets/img/users/user-57.jpg"
														className="img-fluid rounded-circle" alt="img" />
												</a>
												<div className="ms-2">
													<h6 className="fw-medium"><a href="#">Joyce Golston</a></h6>
													<span className="d-block mt-1">joyce@example.com</span>
												</div>
											</div>
										</td>
										<td>Business Analyst</td>
										<td>(132) 1876 304</td>
										<td>17 Dec 2024</td>
										<td>
											<div className="d-inline-flex">
												<a href="#" className="text-gray me-2 fs-16"><i
														className="ti ti-file-text"></i></a>
												<a href="#" className="text-gray fs-16"><i className="ti ti-download"></i></a>
											</div>
										</td>

										<td><span className="badge border border-success text-success"><i
													className="ti ti-point-filled"></i>Hired</span></td>
										<td>
											<div className="action-icon d-inline-flex">

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
										Showing {Math.min((currentPage_candidates - 1) * rowsPerPage_candidates + 1, 11)}-{Math.min(currentPage_candidates * rowsPerPage_candidates, 11)} of 11 entries
									</p>
									<ul className="pagination mb-0">
										<li className={`page-item ${currentPage_candidates === 1 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_candidates(p => Math.max(p - 1, 1))}>
												<i className="ti ti-chevron-left"></i>
											</button>
										</li>
										{[1, 2].map(page => (
											<li key={page} className={`page-item ${currentPage_candidates === page ? 'active' : ''}`}>
												<button className="page-link" onClick={() => setCurrentPage_candidates(page)}>{page}</button>
											</li>
										))}
										<li className={`page-item ${currentPage_candidates === 2 ? 'disabled' : ''}`}>
											<button className="page-link" onClick={() => setCurrentPage_candidates(p => Math.min(p + 1, 2))}>
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

export default Candidates;
